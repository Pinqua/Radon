import React from 'react'
import { SearchIcon } from "@heroicons/react/outline";



function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const {products,isLoading,isError}


    return (
         <div className="relative flex rounded-md  items-center">
            <div className="absolute inset-y-0 left-2.5 flex items-center">
              <SearchIcon className="w-4 text-gray-600" />
            </div>
            <input
              className="p-2 pl-10 h-full flex-grow flex-shrink outline-none cursor-pointer rounded-lg bg-gray-200 hover:shadow-lg focus:shadow-lg"
              type="text"
              placeholder="Search a product"
              onChange={searchProduct}
            />

            {searchTerm ? (
              <div
                onMouseLeave={() => {
                  setSearchResults([]);
                  setSearchTerm("");
                }}
                className="absolute w-full h-auto max-h-96 top-10 rounded-b-lg bg-gray-100 overflow-y-auto shadow-lg hideScrollBar glassmorphism"
              >
                {searchResults?.length ? (
                  searchResults.map(({ item: { _id, title, image } }, i) => (
                    <Fade bottom key={`search-result${i}${_id}`}>
                      <Link href={`/product-details/${_id}`}>
                        <div
                          className={`flex cursor-pointer items-center justify-between px-4 py-2 ${i !== searchResults.length
                              ? "border-b-2  border-gray-200"
                              : ""
                            } bg-gray-100 hover:bg-gray-200`}
                        >
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
                    </Fade>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 text-center py-2">
                    No product found
                  </p>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
    )
}

export default Search
