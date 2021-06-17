import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { signIn, useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { selectItems, selectTotal } from "../slices/cartSlice";
import Header from "../components/Header/Header";
import CartProduct from "../components/CartProduct/CartProduct";
import { CreditCardIcon } from "@heroicons/react/outline";
import { useState } from "react";

const stripePromise = loadStripe(process.env.stripe_public_key);

function Cart({ products }) {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();
  const [disabled,setDiabled]=useState(false)

  const createCheckoutSession = async () => {
    setDiabled(true)
    const stripe = await stripePromise;
    //call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    //Redirect user/customer to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    setDiabled(false)

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <Header products={products} />
      <div className="bg-gray-100 py-10 heightFix">
        <main className="max-w-screen-xl mx-auto">
          {items?.length ? (
            <div className="flex-grow my-6 shadow rounded-md">
              <div className="flex flex-col p-8 bg-white">
                <h1 className="text-2xl font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
                  Shopping Cart
                </h1>
                {items?.map((item, i) => (
                  <CartProduct
                    key={i}
                    id={item.id}
                    title={item.title}
                    price={item.price}
                    description={item.description}
                    category={item.category}
                    image={item.image}
                    qty={item.qty}
                    border={i !== items.length - 1}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full mt-10">
              <div className="text-center">
                <img
                  className="object-contain max-w-sm mx-auto"
                  src="/img/empty_cart.svg"
                  alt=""
                  loading="lazy"
                />
                <h3 className="text-3xl mt-8">Your Cart is Empty</h3>
              </div>
            </div>
          )}
          {items?.length > 0 && (
            <div className="flex flex-col bg-white p-10 shadow-md rounded-md text-xl my-10">
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items) :{" "}
                <span className="font-bold text-gray-700">
                  <Currency quantity={total} currency="INR" />
                </span>
              </h2>
              {session ? (
                <button
                  role="link"
                  className={`button mt-6 flex items-center justify-center text-lg py-2 ${disabled ? "opacity-50":""}`}
                  onClick={!disabled?createCheckoutSession:()=>{}}
                  disabled={disabled}
                >
                 <CreditCardIcon className="w-8" />
                  <span className="ml-2">Proceed to checkout </span>
                </button>
              ) : (
                <button
                  role="link"
                  className="button mt-6 text-lg py-2"
                  onClick={signIn}
                >
                  Sign in to checkout
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Cart;

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
