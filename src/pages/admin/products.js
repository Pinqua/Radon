import { useState } from "react";
import { connectToDatabase } from "../../util/mongodb";
import getProducts from "../../util/getProducts";
import Head from "next/head";
import ProductInfo from "../../components/Product/ProductInfo";

function Products(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, error } = getProducts(props?.products);
  const [searchResult, setSearchResult] = useState(products);
  const options = {
    keys: ["title", "description", "category"],
  };

  if (error) {
    console.error(error);
  }

  const searchProduct = async (e) => {
    let term = e.target.value;
    setSearchTerm(term);
    term = term.toLowerCase();
    // Dynamically load fuse.js
    const Fuse = (await import("fuse.js")).default;
    const fuse = new Fuse(products ? products : [], options);
    const result = fuse
      .search(term)
      .map(({ item: { _id, title, price, description, category, image } }) => ({
        _id,
        title,
        price,
        description,
        category,
        image,
      }));
    setSearchResult(result);
  };

  const removeFromSearchResults = (_id) => {
    setSearchResult((products) =>
      products.filter((product) => product._id !== _id)
    );
  };

  return (
    <>
      <Head>
        <title>Radon | Products</title>
      </Head>
      <div className="heightFixAdmin px-6 lg:py-20 sm:py-16 py-12">
        <div className="mx-auto max-w-screen-xl">
          <h2 className="lg:text-4xl sm:text-3xl text-2xl  font-bold mb-6 ">
            Products
          </h2>
          <div className="py-2">
            <input
              className="p-2 pl-6 h-full w-full outline-none cursor-pointer sm:text-base text-sm rounded-lg bg-gray-200"
              type="text"
              value={searchTerm}
              placeholder="Search a product"
              onChange={searchProduct}
            />
          </div>
          <div className="overflow-y-auto hideScrollBar h-96 p-1">
            {(searchTerm ? searchResult : products)?.map(
              ({ _id, title, price, description, category, image }, i) => (
                <ProductInfo
                  _id={_id}
                  title={title}
                  price={price}
                  description={description}
                  category={category}
                  image={image}
                  border={i + 1 !== products?.length}
                  key={`product-${_id}`}
                  removeFromSearchResults={removeFromSearchResults}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Products.admin = true;
export default Products;

export const getStaticProps = async () => {
  const { db } = await connectToDatabase();
  let products = await db.collection("products").find({}).toArray();
  products = JSON.parse(JSON.stringify(products));
  return {
    props: {
      products,
    },
    revalidate: 1,
  };
};
