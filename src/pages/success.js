import { CheckCircleIcon } from "@heroicons/react/solid";
import Header from "../components/Header/Header";
import axios from "axios";
import { useRouter } from "next/router";


function success({ products }) {
  const router=useRouter()
  return (
    <>
      <Header products={products} />
      <div className="bg-gray-100 heightFix flex items-center">
        <main className="max-w-screen-lg mx-auto">
          <div className="flex flex-col p-10 bg-white shadow-md rounded-md">
            <div className="flex items-center space-x-2 mb-5">
              <CheckCircleIcon className="text-green-500 h-10" />
              <h1 className="text-3xl font-medium">
                Thank you, your order has been confirmed!
              </h1>
            </div>
            <p>
              Thank you for shopping with us. We'll send a confirmation once
              your item has been shipped, if you would like to check the status
              of your orders(s).
            </p>
            <button
              className="button mt-8 text-lg"
              onClick={() => router.replace("/orders")}
            >
              Go to my orders
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

export default success;

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
