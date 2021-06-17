import Header from "../components/Header/Header";
import axios from "axios";
import Banner from "../components/Banner/Banner";
import ProductFeed from "../components/Product/ProductFeed";

export default function Home({ products }) {
  return (
    <>
      <Header products={products} />
      <Banner />
      <ProductFeed products={products} />
    </>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return {
      props: {
        products: res.data,
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
