import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

function success() {
  const router = useRouter();

  return (
    <>
      <div className="bg-gray-100 heightFix flex items-center">
        <main className="max-w-screen-lg mx-auto">
          <div className="flex flex-col p-10 bg-white shadow-md rounded-md">
            <div className="flex items-center space-x-2 mb-5">
              <CheckCircleIcon className="text-green-500 h-10" />
              <h1 className="text-3xl font-medium ml-2">
                Order Placed Successfully
              </h1>
            </div>
            <p>
              Thank you for shopping with us. Your order will be delivered soon.
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
