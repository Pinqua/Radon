import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDownIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";
import { useSelector } from "react-redux";
import { selectItems } from "../../slices/cartSlice";

function Header({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const [session] = useSession();
  const items = useSelector(selectItems);
  const [dropDown, setDropDown] = useState(false);
  const options = {
    keys: ["title", "description", "category"],
  };

  const searchProduct = async (e) => {
    let term = e.target.value;
    term = term.toLowerCase();
    setSearchTerm(term);
    // Dynamically load fuse.js
    const Fuse = (await import("fuse.js")).default;
    const fuse = new Fuse(products ? products : [], options);
    // console.log(fuse.search(term))
    setSearchResults(fuse.search(term));
    /*setSearchResults(
      products?.filter((product) => product.title.toLowerCase().includes(term))
    );*/
  };

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white text-gray-900">
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
        <div className="relative flex flex-grow rounded-md  items-center">
          <div className="absolute inset-y-0 left-2.5 flex items-center">
            <SearchIcon className="w-4 text-gray-600" />
          </div>
          <input
            className="p-2 pl-10 h-full flex-grow flex-shrink outline-none cursor-pointer rounded-lg bg-gray-200 hover:shadow-lg focus:shadow-lg"
            type="text"
            placeholder="Search a product"
            onChange={searchProduct}
          />

          {searchTerm && (
            <div
              onMouseLeave={() => {
                setSearchResults([]);
                setSearchTerm("");
              }}
              className="absolute w-full h-auto max-h-96 top-10 rounded-b bg-gray-100 overflow-y-auto shadow-lg"
            >
              {searchResults?.length ? (
                searchResults.map(({ item: { _id, title, image } }, i) => (
                  <Link
                    href={`/product-details/${_id}`}
                    key={`search-result${i}${_id}`}
                  >
                    <div className="flex cursor-pointer items-center justify-between px-4 py-2 border-b-2  border-gray-200 bg-gray-100 hover:bg-gray-200">
                      <h5 className="font-medium text-sm text-gray-700 pr-4">
                        {title}
                      </h5>
                      <Image
                        src={image}
                        height={40}
                        width={40}
                        objectFit="contain"
                      />
                    </div>
                  </Link>
                ))
              ) : (
                <>
                  {searchTerm && (
                    <p className="text-xs text-gray-500 text-center py-2">
                      No product found
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-12 font-medium">
          {!session ? (
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
                  width="30"
                  height="30"
                  className="object-contain w-10 h-10 rounded-full mr-1 hover:shadow-md"
                />
                <ChevronDownIcon className="w-6" />
              </span>
              {dropDown && (
                <div className="absolute top-14 right-1 w-32 bg-white text-sm rounded shadow-md">
                  <div
                    className="w-full cursor-pointer hover:bg-gray-100 p-2 border-b border-gray-200"
                    onClick={() => router.push("/profile")}
                  >
                    Profile
                  </div>
                  <div
                    className="w-full cursor-pointer hover:bg-gray-100 p-2 border-b border-gray-200"
                    onClick={() => router.push("/orders")}
                  >
                    Orders
                  </div>
                  <div
                    className="w-full cursor-pointer hover:bg-gray-100 p-2 border-b border-gray-200"
                    onClick={() => router.push("/about")}
                  >
                    Contact
                  </div>
                  <div
                    className="w-full cursor-pointer hover:bg-gray-100 p-2"
                    onClick={signOut}
                  >
                    Logout
                  </div>
                </div>
              )}
            </span>
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
  );
}

export default Header;
