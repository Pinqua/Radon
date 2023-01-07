import { ObjectId } from "bson";
import Head from "next/head";
import ProductDetails from "../../components/Product/ProductDetails";
import { connectToDatabase } from "../../util/mongodb";

function productDetails({ product }) {
  return (
    <>
      {product?.title && (
        <Head>
          <title>Radon | {product.title}</title>
        </Head>
      )}
      <ProductDetails
        _id={product?._id}
        title={product?.title}
        price={product?.price}
        description={product?.description}
        category={product?.category}
        image={product?.image}
      />
    </>
  );
}

export default productDetails;

export const getStaticPaths = async () => {
  const { db } = await connectToDatabase();
  const products = await db.collection("products").find({}).toArray();
  const paths = products.map((product) => ({
    params: { id: product._id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  let product;
  try {
    const { db } = await connectToDatabase();
    product = await db
      .collection("products")
      .findOne({ _id: ObjectId(context.params.id) });
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
  if (!product) {
    return {
      notFound: true,
    };
  }
  product = JSON.parse(JSON.stringify(product));
  return {
    props: {
      product,
    },
    revalidate: 1,
  };
};
