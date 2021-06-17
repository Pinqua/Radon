import axios from "axios";
import Head from "next/head";
import Header from "../../components/Header/Header";
import ProductDetails from "../../components/Product/ProductDetails";

function productDetails({ product, products }) {
  return (
    <>
      <Head>
        <title>Radon | {product?.title}</title>
      </Head>
      <Header products={products} />
      <ProductDetails
        id={product?.id}
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
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    const products = res.data;
    const paths = products.map((product) => ({
      params: { id: product.id.toString() },
    }));
    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    console.log(err);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps = async (context) => {
  try {
    const res = await axios.get(
      `https://fakestoreapi.com/products/${context.params.id}`
    );
    const response = await axios.get("https://fakestoreapi.com/products");
    return {
      props: {
        product: res.data,
        products: response.data,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};
