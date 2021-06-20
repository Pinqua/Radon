import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <div className="w-full py-20 bg-gray-100 mt-10" id="products-feed">
      <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-screen-xl">
        {products
          ?.slice(0, 4)
          .map(({ _id, title, price, description, category, image }) => (
            <Product
              key={`product${_id}`}
              _id={_id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              products={products}
            />
          ))}

        <div className="md:col-span-2">
          {products
            ?.slice(4, 5)
            .map(({ _id, title, price, description, category, image }) => (
              <Product
                key={`product${_id}`}
                _id={_id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                products={products}
              />
            ))}
        </div>
        {products
          ?.slice(5, products?.length)
          .map(({ _id, title, price, description, category, image }) => (
            <Product
              key={`product${_id}`}
              _id={_id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
              products={products}
            />
          ))}
      </div>
    </div>
  );
}

export default ProductFeed;
