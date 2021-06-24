import moment from "moment";
import Link from "next/link";
import Currency from "react-currency-formatter";

function Order({ _id, id, amount_total, timestamp, items }) {
  return (
    <Link href={`/order-details/${_id}`}>
      <div
        className="relative border rounded-md cursor-pointer hover:shadow-sm bg-white"
        title="Click to view order details"
      >
        <div className="sm:p-6 p-4 bg-gray-100 sm:text-sm text-xs text-gray-600">
          <p className="sm:absolute sm:top-2 sm:right-2 sm:w-56 lg:w-72 truncate text-xs whitespace-nowrap sm:mb-0 mb-2">
            ORDER # <span className="text-green-500">{id}</span>
          </p>
          <div className="flex sm:items-center sm:gap-6 gap-1 sm:flex-row flex-col">
            <div className="flex items-center sm:gap-6 gap-4">
              <div>
                <p className="font-bold text-xs">ORDER PLACED</p>
                <p>{moment(timestamp).format("DD MMM YYYY")}</p>
              </div>
              <div>
                <p className="text-xs font-bold">TOTAL</p>
                <p className="text-xs font-bold text-red-500">
                  <Currency quantity={amount_total} currency="INR" />
                </p>
              </div>
            </div>
            <p className="lg:text-xl md:text-lg sm:text-base text-sm font-medium  whitespace-nowrap  self-end flex-1 text-right text-blue-500">
              {items?.length} items
            </p>
          </div>
        </div>
        <div className="sm:p-6 p-4">
          <div className="flex space-x-6 overflow-x-auto py-4 hideScrollBar">
            {items?.map((item) => (
              <img
                key={`item-img${item?._id}`}
                className="h-20 object-contain sm:h-32"
                src={item?.image}
                alt="Product Image"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Order;
