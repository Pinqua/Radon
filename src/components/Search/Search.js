import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Fade from "react-reveal/Fade";
import Link from "next/link";
import Image from "next/image";
import getProducts from "../../util/getProducts";
import onClickOutside from "react-onclickoutside";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { products, isLoading, isError } = getProducts();
    const [loading, setLoading] = useState(true);
    const options = {
        keys: ["title", "description", "category"],
    };

    if (isError) {
        alert(error);
        console.error(error);
    }

    const searchHandler = () => {
        setSearchResults([]);
        setSearchTerm("");
    };

    Search.handleClickOutside = searchHandler;

    const searchProduct = async (e) => {
        setLoading(true);
        let term = e.target.value;
        term = term.toLowerCase();
        setSearchTerm(term);
        // Dynamically load fuse.js
        const Fuse = (await import("fuse.js")).default;
        const fuse = new Fuse(products ? products : [], options);
        setSearchResults(fuse.search(term));
        /*setSearchResults(
                                                     products?.filter((product) => product.title.toLowerCase().includes(term))
                                                        );*/
        setLoading(false);
    };

    return (
        <div className="relative flex rounded-md  items-center">
            <div className="absolute inset-y-0 left-2.5 flex items-center">
                <SearchIcon className="w-4 text-gray-600" />
            </div>
            <input
                className="p-2 pl-10 h-full flex-grow flex-shrink outline-none cursor-pointer sm:text-base text-sm rounded-lg bg-gray-200 hover:shadow-md focus:shadow-md"
                type="text"
                placeholder="Search a product"
                onChange={searchProduct}
            />

            {searchTerm ? (
                <div
                    className="absolute w-full h-auto max-h-96 top-11 rounded-md bg-gray-100 overflow-y-auto shadow-md hideScrollBar"
                    onMouseLeave={() => {
                        setSearchResults([]);
                        setSearchTerm("");
                    }}
                >
                    {!isLoading || !loading ? (
                        searchResults?.length ? (
                            searchResults.map(({ item: { _id, title, image } }, i) => (
                                <Fade bottom key={`search-result${i}${_id}`}>
                                    <Link href={`/product-details/${_id}`}>
                                        <div
                                            className={`flex cursor-pointer items-center justify-between lg:px-5 py-2  px-4  ${i !== searchResults.length
                                                    ? "border-b  border-gray-200"
                                                    : ""
                                                } bg-gray-50 hover:bg-gray-100`}
                                        >
                                            <h5 className="text-sm text-gray-700 pr-4">{title}</h5>
                                            <div className="min-w-max">
                                                <Image
                                                    src={image}
                                                    height={40}
                                                    width={40}
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </Fade>
                            ))
                        ) : (
                            <p className="text-xs text-gray-500 text-center py-4">
                                No product found
                            </p>
                        )
                    ) : (
                        <p className="text-xs text-gray-500 text-center py-4">Loading...</p>
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => Search.handleClickOutside,
};

export default onClickOutside(Search, clickOutsideConfig);
