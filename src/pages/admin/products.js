import React, { useState } from "react";
import { connectToDatabase } from "../../util/mongodb";
import Currency from "react-currency-formatter";
import Image from "next/image";
import axios from "axios";
import NormalToast from "../../util/Toast/NormalToast";
import getProducts from "../../util/getProducts";
import { useRouter } from "next/router";
import Head from "next/head";

function Products(props) {
  const router = useRouter();
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

  const deleteProduct = (_id) => {
    axios
      .post("/api/admin/delete-product", { _id })
      .then(() => {
        NormalToast("Product deleted");
        setSearchResult((products) =>
          products.filter((product) => product._id !== _id)
        );
      })
      .catch((err) => {
        NormalToast("Something went wrong", true);
        console.err(err);
      });
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
                <div
                  className={`flex sm:flex-row flex-col-reverse w-full my-4 text-sm text-gray-700 py-6 ${i !== products?.length ? "border-b border-gray-200" : ""
                    } sm:justify-between gap-6`}
                  key={`product-${_id}`}
                >
                  <div className="space-y-2">
                    <div className="font-semibold text-base capitalize">
                      {title}
                    </div>
                    <div className="text-blue-light capitalize">{category}</div>
                    <p className="text-gray-500 lg:text-sm text-xs">
                      {description}
                    </p>
                    <div>
                      <p className="font-semibold">
                        <span className="font-normal">Price - </span>
                        <Currency quantity={price} currency="INR" />
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-4">
                      <button
                        className="button py-2 xxs:px-10 px-8"
                        onClick={() =>
                          router.push(`/admin/update-product/${_id}`)
                        }
                      >
                        Update
                      </button>
                      <button
                        className="button-red py-2 xxs:px-10 px-8"
                        onClick={() => deleteProduct(_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="sm:mx-0 sm:ml-6 min-w-max  mx-auto my-auto">
                    <Image
                      src={image}
                      width={120}
                      height={120}
                      alt="Item Image"
                      objectFit="contain"
                    />
                  </div>
                </div>
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
