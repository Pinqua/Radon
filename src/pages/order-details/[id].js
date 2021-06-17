import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header/Header";
import moment from "moment";
import Currency from "react-currency-formatter";
import { getSession } from "next-auth/client";
import axios from "axios";
import { connectToDatabase } from "../../util/mongodb";
import { useRouter } from "next/router";

function orderDetails({ products, order }) {
  const router=useRouter();

  return (
    <>
      <Header products={products} />
      <div className="border rounded-md max-w-screen-xl heightFix mx-auto my-20 shadow-sm">
        <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-700">
          <div>
            <p className="text-2xl font-semibold">Order Details</p>
            <p className="mt-4">{moment(order?.timestamp).format("llll")}</p>
          </div>
          <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
            {order?.items?.length} items
          </p>
        </div>
        <div className="p-5 sm:p-10">
          <div className="space-y-6 text-lg">
            <p className="whitespace-nowrap font-semibold">
              ORDER ID -
              <span className="text-green-500 font-medium mx-2">
                {order?.id}
              </span>
            </p>
            <p className="font-semibold">
              EMAIL -
              <span className="text-sm font-medium mx-2">
                {order?.customer_details.email}
              </span>
            </p>
            <div>
              <h3 className="font-semibold mb-2 uppercase">Address </h3>
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-semibold"> Name - </span>
                  {order.shipping.name}
                </p>
                <p>
                  <span className="font-semibold">City - </span>
                  {order.shipping.address.city}
                </p>
                <p>
                  <span className="font-semibold">Country - </span>
                  {order.shipping.address.country}
                </p>
                <p>
                  <span className="font-semibold">Line 1 - </span>
                  {order.shipping.address?.line1},
                </p>
                <p>
                  <span className="font-semibold">Line 2 - </span>
                  {order.shipping.address?.line2}
                </p>
                <p>
                  <span className="font-semibold">Postal Code - </span>
                  {order.shipping.address.postal_code}
                </p>
                <p>
                  <span className="font-semibold">State - </span>
                  {order.shipping.address.state}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2  uppercase">Amount</h3>
              <div className="text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Subtotal - </span>
                  <Currency
                    quantity={order.amount_subtotal / 100}
                    currency="INR"
                  />
                </p>
                <p>
                  <span className="font-semibold">Shipping - </span>
                  <Currency
                    quantity={order.total_details.amount_shipping / 100}
                    currency="INR"
                  />
                </p>
                <p className="font-bold text-red-400">
                  <span className="font-semibold">Total - </span>
                  <Currency
                    quantity={order.amount_total / 100}
                    currency="INR"
                  />
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2  uppercase">Items</h4>
              {order?.items.map((item) => (
                <div
                  key={item?.id}
                  className="flex-col my-4 text-sm text-gray-700"
                >
                  <span className="link font-semibold">
                    <Link href={`/product-details/${item.id}`}>
                      {item?.title}
                    </Link>
                  </span>
                  <div className="mt-1 mb-2">
                    <p>
                      <span>Quantity - </span>
                      {item?.qty}
                    </p>
                    <p className="font-semibold">
                      <span className="font-normal">Price - </span>
                      <Currency quantity={item?.price} currency="INR" />
                    </p>
                  </div>
                  <Image
                    src={item?.image}
                    width={120}
                    height={120}
                    objectFit="contain"
                    className="cursor-pointer"
                    onClick={()=>{router.push(`/product-details/${item.id}`)}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default orderDetails;

export const getServerSideProps = async (context) => {
  try {
    //get the users logged in credentials
    const session = await getSession(context);
    const res = await axios.get("https://fakestoreapi.com/products");
    if (!session) {
      return {
        props: { products: res.data },
      };
    }
    const { db } = await connectToDatabase();
    let order = await db.collection("orders").findOne({
      user: session.user.email,
      id: context.params.id,
    });
    order = JSON.parse(JSON.stringify(order));
    return {
      props: {
        products: res.data,
        order,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};
