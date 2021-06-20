import Banner from "../components/Banner/Banner";
import ProductFeed from "../components/Product/ProductFeed";
import { connectToDatabase } from "../util/mongodb";

export default function Home({ products }) {
  return (
    <>
      <Banner />
      <ProductFeed products={products} />
    </>
  );
}

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();
  let products = await db.collection("products").find({}).toArray();
  products = JSON.parse(JSON.stringify(products));
  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
