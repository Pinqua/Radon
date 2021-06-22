import React from "react";
import Image from "next/image";
import ReactImageZoom from "react-image-zoom";
import { useMediaQuery } from "react-responsive";
import { addToCart } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import Currency from "react-currency-formatter";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import { ShoppingCartIcon } from "@heroicons/react/solid";

function ProductDetails({ _id, title, price, description, category, image }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const addItemToCart = () =>
    dispatch(
      addToCart({ _id, title, price, description, category, image, qty: 1 })
    );
  const props = {
    width: 400,
    height: 400,
    img: image,
  };
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="max-w-screen-xl heightFix mx-auto flex items-center">
      <div className="flex space-x-10 justify-between w-full">
        {router.isFallback ? (
          <Skeleton width={400} height={400} />
        ) : (
          <div className="product_image">
            {!isMobile ? (
              <ReactImageZoom {...props} />
            ) : (
              <Image
                src={image}
                alt="Product Image"
                width={400}
                height={400}
                objectFit="contain"
              />
            )}
          </div>
        )}
        <div className="flex-grow">
          {router.isFallback ? (
            <Skeleton count={12} />
          ) : (
            <>
              <h3 className="font-bold sm:text-3xl mb-1">{title}</h3>
              <p className="text-blue-light capitalize mb-4 font-medium">
                {category}
              </p>
              <p className="text-justify text-sm sm:text-base my-6">
                {description}
              </p>
              <p className="text-2xl font-semibold text-gray-700">
                <Currency quantity={price} currency="INR" />
              </p>
              <div className="mt-10 flex space-x-6">
                <button
                  className="button px-10 py-2 flex items-center justify-center"
                  onClick={addItemToCart}
                >
                  <ShoppingCartIcon className="w-4" />
                  <span className="ml-2">Add to Cart</span>
                </button>
                <button className=" button px-10 py-2 " onClick={addItemToCart}>
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
