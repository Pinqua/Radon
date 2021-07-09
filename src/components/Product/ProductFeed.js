import Product from "./Product";
import { useState } from "react";
import { AdjustmentsIcon } from "@heroicons/react/outline";

function ProductFeed({ products, categories }) {
  const [categoryActive, setCategoryActive] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const activeCategoryHandler = (category) => {
    if (category === "all" || categoryActive === category) {
      setCategoryActive("all");
      return;
    }
    setCategoryActive(category);
    filterProducts(category);
  };

  const filterProducts = (category) => {
    setFilteredProducts(
      products.filter((product) => product?.category === category)
    );
  };

  return (
    <div className="w-full py-20 px-6 bg-gray-100 mt-10" id="products-feed">
      <div className="flex items-center w-full max-w-screen-xl sm:mb-20 mb-16 gap-4  mx-auto overflow-x-auto hideScrollBar capitalize text-sm font-medium">
        <div>
          <AdjustmentsIcon className="w-6" />
        </div>
        <div
          className={` py-2 px-6 bg-white text-center rounded hover:bg-blue-light hover:text-white transition-all cursor-pointer ease-in-out duration-200 shadow ${categoryActive === "all" ? "bg-blue-light text-white" : ""
            }`}
          onClick={() => activeCategoryHandler("all")}
        >
          All
        </div>
        {categories?.map((category, i) => (
          <div
            key={`category-${i}`}
            className={`py-2 px-6 bg-white text-center whitespace-nowrap rounded hover:bg-blue-light hover:text-white transition-all cursor-pointer ease-in-out duration-200 shadow ${categoryActive === category?.name
                ? "bg-blue-light text-white"
                : ""
              }`}
            onClick={() => activeCategoryHandler(category?.name)}
          >
            {category?.name}
          </div>
        ))}
      </div>
      <div className="grid grid-flow-row-dense sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 mx-auto max-w-screen-xl gap-x-6 gap-y-8">
        {(categoryActive === "all" ? products : filteredProducts)?.map(
          ({ _id, title, price, description, category, image }) => (
            <Product
              key={`product-${_id}`}
              _id={_id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          )
        )}
      </div>
    </div>
  );
}

export default ProductFeed;
