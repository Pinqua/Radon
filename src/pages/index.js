import Banner from "../components/Banner/Banner";
import ProductFeed from "../components/Product/ProductFeed";
import getCategories from "../util/getCategories";
import getProducts from "../util/getProducts";
import { connectToDatabase } from "../util/mongodb";

export default function Home(props) {
  const { products, error } = getProducts(props?.products);
  const { categories, error: err } = getCategories(props?.categories);

  if (err) {
    console.error(err);
  }

  if (error) {
    console.error(error);
  }
  return (
    <>
      <Banner />
      <ProductFeed products={products} categories={categories} />
    </>
  );
}

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();
  let products = await db.collection("products").find({}).toArray();
  products = JSON.parse(JSON.stringify(products));
  let categories = await db.collection("categories").find({}).toArray();
  categories = JSON.parse(JSON.stringify(categories));

  return {
    props: {
      products,
      categories,
    },
    revalidate: 1,
  };
};
