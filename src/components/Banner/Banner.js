import React from "react";
import Image from "next/image";
import Fade from "react-reveal/Fade";
import { ShoppingBagIcon } from "@heroicons/react/outline";

function Banner() {
  const scrollHandler = () => {
    window.scrollTo(0, document.getElementById("products-feed").offsetTop - 90);
    //window.location.href='#products-feed'
  };

  return (
    <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto h-full py-10 bg-white">
      <div className="max-w-lg flex-col">
        <Fade left>
          <div className="text-blue-light font-extrabold text-7xl leading-snug">
            <h2 className="text-6xl">Stay Home</h2>
            <h1>Shop Online.</h1>
          </div>
          <p className="mt-6 mb-12 max-w-md font-medium">
            Shop online from a wide range of genuine products whenever you want
            24x7.
          </p>
          <button
            className="button px-10 py-2 text-xl flex items-center justify-center"
            onClick={scrollHandler}
          >
            <ShoppingBagIcon className="mr-2 w-6" />
            Shop Now
          </button>
        </Fade>
      </div>
      <div>
        <Fade right>
          <Image
            src="/img/hero.svg"
            alt="Web Shopping"
            width={600}
            height={600}
            objectFit="contain"
          />
        </Fade>
      </div>
    </div>
  );
}

export default Banner;
