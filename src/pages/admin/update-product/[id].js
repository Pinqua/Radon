import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { connectToDatabase } from "../../../util/mongodb";
import getCategories from "../../../util/getCategories";
import { ObjectId } from "bson";
import NormalToast from "../../../util/Toast/NormalToast";
import Head from "next/head";

function UpdateProduct(props) {
  const [title, setTitle] = useState(props?.product?.title);
  const [description, setDescription] = useState(props?.product?.description);
  const [price, setPrice] = useState(props?.product?.price);
  const [image, setImage] = useState(props?.product?.image);
  const [category, setCategory] = useState(props?.product?.category);
  const router = useRouter();
  const { categories, error } = getCategories(props?.categories);
  const [disabled, setDisabled] = useState(false);

  if (error) {
    console.error(error);
  }

  const formHandler = (e) => {
    e.preventDefault();
    setDisabled(true);
    axios
      .post("/api/admin/update-product", {
        _id: router.query.id,
        title,
        category,
        description,
        price,
        image,
      })
      .then((res) => {
        NormalToast("Updated successfully");
        setDisabled(false);
      })
      .catch((err) => {
        NormalToast("Something went wrong", err);
        console.error(err);
        setDisabled(false);
      });
  };

  return (
    <>
      <Head>
        <title>Radon | Update Product</title>
      </Head>
      <div className="heightFixAdmin px-6 lg:py-20 sm:py-16 py-12">
        <div className="mx-auto max-w-screen-sm sm:text-base  text-sm">
          <h2 className="lg:text-4xl sm:text-3xl text-2xl  font-bold mb-6">
            Update Product
          </h2>
          <form onSubmit={formHandler} className="flex flex-col gap-4">
            <input
              type="text"
              required
              value={title}
              placeholder="Title"
              className="bg-gray-100 border border-gray-200 py-2 px-4 rounded-md outline-none"
              onChange={(e) => setTitle(e.target.value)}
              disabled={disabled}
            />
            <select
              required
              className="bg-gray-100 border border-gray-200 py-2 px-4 rounded-md outline-none capitalize"
              onChange={(e) => setCategory(e.target.value)}
              disabled={disabled}
            >
              {categories?.map((category) => (
                <option value={category?.name} key={`option-${category?._id}`}>
                  {category?.name}
                </option>
              ))}
            </select>
            <textarea
              required
              placeholder="Description"
              className="bg-gray-100 py-2 px-4  border border-gray-200 rounded-md h-24 resize-none outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="25"
              rows="10"
              disabled={disabled}
            ></textarea>
            <input
              type="number"
              required
              placeholder="Price"
              className="bg-gray-100 py-2 border border-gray-200 px-4 rounded-md outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={disabled}
            />
            <input
              type="text"
              required
              placeholder="Image Url"
              className="bg-gray-100 py-2 px-4 border border-gray-200 rounded-md outline-none"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={disabled}
            />
            <button
              type="submit"
              className={`button py-2 px-10 sm:text-base text-sm mt-4 ${disabled ? "opacity-50" : ""
                }`}
              disabled={disabled}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

UpdateProduct.admin = true;
export default UpdateProduct;

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
  let categories;
  try {
    const { db } = await connectToDatabase();
    product = await db
      .collection("products")
      .findOne({ _id: ObjectId(context.params.id) });
    categories = await db.collection("categories").find({}).toArray();
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
  categories = JSON.parse(JSON.stringify(categories));
  return {
    props: {
      product,
      categories,
    },
    revalidate: 1,
  };
};
