import { useSession, signIn } from "next-auth/client";
import Order from "../components/Order/Order";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Head from "next/head";

function Orders() {
  const [session, loading] = useSession();
  const { data: orders, error } = useSWR(
    !loading && session ? "/api/orders" : null
  );

  if (error) {
    orders = [];
    alert(error);
    console.error(error);
  }

  return (
    <>
      <Head>
        <title>Radon | Orders</title>
      </Head>
      <main className="max-w-screen-xl mx-auto pt-20 pb-20 heightFix">
        <h1 className="text-2xl font-semibold border-b-2 mb-2 pb-4 border-gray-200 text-gray-700 h-full">
          Your Orders
        </h1>
        {session ? (
          <>
            <h2 className="font-medium text-lg my-2 text-green-500">
              {orders ? `${orders?.length} Orders` : <Skeleton width={100} />}
            </h2>
            {orders ? (
              orders.length ? (
                <div className="mt-5 space-y-6">
                  {orders.map(({ _id, id, amount_total, items, timestamp }) => (
                    <Order
                      key={`order${_id}`}
                      id={id}
                      _id={_id}
                      amount_total={amount_total / 100}
                      timestamp={timestamp}
                      items={items}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center mt-16">
                  <Image
                    src="/img/empty.svg"
                    width={300}
                    height={300}
                    objectFit="contain"
                  />
                </div>
              )
            ) : (
              <Skeleton count={12} />
            )}
          </>
        ) : (
          <>
            <div className="text-center text-lg font-medium mt-12">
              <h2>
                Please
                <span
                  className="link underline text-blue-light mx-2"
                  onClick={signIn}
                >
                  login
                </span>
                in to see your orders.
              </h2>
              <Image src="/img/authentication.svg" width={350} height={350} />
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Orders;
