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
        <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
          <div>
            <p className="font-bold text-xs">ORDER PLACED</p>
            <p>{moment(timestamp).format("DD MMM YYYY")}</p>
          </div>
          <div>
            <p className="text-xs font-bold">TOTAL</p>
            <p className="text-xs font-bold text-red-400">
              <Currency quantity={amount_total} currency="INR" />
            </p>
          </div>
          <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
            {items?.length} items
          </p>
          <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
            ORDER # <span className="text-green-500">{id}</span>
          </p>
        </div>
        <div className="p-5 sm:p-10">
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
