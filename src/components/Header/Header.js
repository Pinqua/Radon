import React, { useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/cartSlice";
import Skeleton from "react-loading-skeleton";
import Fade from "react-reveal/Fade";
import Search from "../Search/Search";
import Dropdown from "../Dropdown/Dropdown";

function Header() {
  const router = useRouter();
  const [session, loading] = useSession();
  const items = useSelector(selectItems);
  const [dropDown, setDropDown] = useState(false);

  return (
    <Fade top>
      <header className="sticky top-0 inset-x-0 z-40 bg-white text-gray-900 glassmorphism">
        <div className="flex items-center w-full max-w-screen-xl py-2 space-x-16 mx-auto">
          <div className="flex items-center">
            <Image
              src="/img/Radon.svg"
              alt="RADON"
              className="cursor-pointer"
              width={100}
              objectFit="contain"
              height={50}
              onClick={() => router.push("/")}
            />
          </div>
          <div className="flex-grow">
            <Search />
          </div>
          <div className="flex items-center space-x-12 font-medium">
            {!loading ? (
              !session ? (
                <span className="link" onClick={signIn}>
                  Login
                </span>
              ) : (
                <span
                  className="relative"
                  onClick={() => setDropDown((value) => !value)}
                >
                  <span className="flex items-center cursor-pointer">
                    <img
                      src={session?.user?.image || "/img/profile_pic.svg"}
                      loading="lazy"
                      alt="pic"
                      width="24"
                      height="24"
                      className="object-contain w-10 h-10 rounded-full mr-1 hover:shadow-md"
                    />
                    <ChevronDownIcon className="w-6" />
                  </span>
                  {dropDown && (
                    <div className="absolute top-14 right-1">
                      <Dropdown handleClickOutside={() => setDropDown(false)} />
                    </div>
                  )}
                </span>
              )
            ) : (
              <Skeleton circle={true} width={40} height={40} />
            )}
            <span className="link" onClick={() => router.push("/orders")}>
              Orders
            </span>
            <span className="link" onClick={() => router.push("/about")}>
              About
            </span>
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            <ShoppingCartIcon className="w-10 link" />
            <div className="absolute -top-2 -right-1 rounded-full text-white bg-blue-light p-1 flex items-center justify-center text-xs font-extrabold">
              {items.length}
            </div>
          </div>
        </div>
      </header>
    </Fade>
  );
}

export default Header;
