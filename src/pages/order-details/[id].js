import React from "react";
import moment from "moment";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import Custom404 from "../404";
import Head from "next/head";
import OrderItem from "../../components/Order/OrderItem";

function orderDetails() {
  const [session, loading] = useSession();
  const router = useRouter();
  const { data: order, error } = useSWR(
    !loading && session ? `/api/order-details/${router.query.id}` : null
  );

  if (!loading && !session) {
    return <Custom404 />;
  }

  if (error) {
    alert(error);
    console.error(error);
  }

  return (
    <>
      <Head>
        <title>Radon | OrderDetails</title>
      </Head>
      <div className="heightFix sm:px-6">
        <div className="border rounded-md max-w-screen-xl  mx-auto md:my-20 my-12 shadow-sm">
          <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-700">
            <div>
              <p className="sm:text-2xl text-xl font-semibold">Order Details</p>
              <p className="mt-4 sm:text-base text-sm">
                {order ? moment(order?.timestamp).format("llll") : <Skeleton />}
              </p>
            </div>
            {order && (
              <p className="lg:text-xl md:text-lg text-base font-medium whitespace-nowrap  self-end flex-1 text-right text-blue-500">
                {order?.items?.length} items
              </p>
            )}
          </div>

          <div className="p-5 md:p-10 sm:p-8">
            {order ? (
              <>
                <div className="space-y-6 lg:text-lg text-base">
                  <p className="whitespace-nowrap font-semibold overflow-x-auto hideScrollBar">
                    ORDER ID -
                    <span className="text-green-500 font-medium ml-2">
                      {order?.id}
                    </span>
                  </p>
                  <p className="font-semibold whitespace-nowrap overflow-x-auto hideScrollBar">
                    EMAIL -
                    <span className="text-sm font-medium ml-2">
                      {order?.customer_details?.email}
                    </span>
                  </p>
                  <div>
                    <h3 className="font-semibold mb-2 uppercase">Address </h3>
                    <div className="text-sm text-gray-700">
                      <p>
                        <span className="font-semibold"> Name - </span>
                        {order?.shipping?.name}
                      </p>
                      <p>
                        <span className="font-semibold">City - </span>
                        {order?.shipping?.address?.city}
                      </p>
                      <p>
                        <span className="font-semibold">Country - </span>
                        {order?.shipping?.address?.country}
                      </p>
                      <p>
                        <span className="font-semibold">Line 1 - </span>
                        {order?.shipping?.address?.line1},
                      </p>
                      <p>
                        <span className="font-semibold">Line 2 - </span>
                        {order?.shipping?.address?.line2}
                      </p>
                      <p>
                        <span className="font-semibold">Postal Code - </span>
                        {order?.shipping?.address?.postal_code}
                      </p>
                      <p>
                        <span className="font-semibold">State - </span>
                        {order?.shipping?.address?.state}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2  uppercase">Amount</h3>
                    <div className="text-sm text-gray-700">
                      <p>
                        <span className="font-semibold">Subtotal - </span>
                        <Currency
                          quantity={order?.amount_subtotal / 100}
                          currency="INR"
                        />
                      </p>
                      <p className="text-green-500 font-semibold">
                        <span>Shipping - </span>
                        <Currency
                          quantity={order?.total_details?.amount_shipping / 100}
                          currency="INR"
                        />
                      </p>
                      <p className="font-bold text-red-500">
                        <span className="font-semibold">Total - </span>
                        <Currency
                          quantity={order?.amount_total / 100}
                          currency="INR"
                        />
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2  uppercase">Items</h4>
                    {order?.items?.map((item) => (
                      <OrderItem item={item} key={`order-item${item?._id}`} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Skeleton count={30} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default orderDetails;
