import Link from "next/link";
import React from "react";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import Order from "../../components/Order/Order";
import { useSession } from "next-auth/client";
import Head from "next/head";

function Dashboard() {
  const [session, loading] = useSession();
  const { data: orders, error } = useSWR(
    !loading && session && session.admin ? "/api/admin/active-orders" : null
  );

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Head>
        <title>Radon | Dashboard</title>
      </Head>
      <div className="heightFixAdmin bg-gray-100 py-10 md:px-6">
        <div className="max-w-screen-xl mx-auto bg-white  shadow rounded-md my-6">
          <div className="flex flex-col md:p-8  p-6  bg-white gap-6">
            <h1 className="sm:text-2xl text-xl  font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
              Dashboard
            </h1>
            <div className="flex gap-4 sm:gap-6 lg:gap-8 xl:gap-10 text-blue-light font-medium flex-wrap sm:text-base text-sm">
              <Link href="/admin/products">
                <span className="link hover:underline">Products</span>
              </Link>
              <Link href="/admin/users">
                <span className="link hover:underline">Users</span>
              </Link>
              <Link href="/admin/add-product">
                <span className="link hover:underline">Add Product</span>
              </Link>
              <Link href="/admin/add-category">
                <span className="link hover:underline">Add Category</span>
              </Link>
            </div>
            <div className="lg:mt-10 sm:mt-8 mt-6">
              <h4 className="sm:text-xl text-lg font-semibold">
                Active Orders
              </h4>
            </div>
            <div>
              <h2 className="font-medium text-lg  my-2 text-blue-light">
                {orders ? (
                  <>
                    <span className="font-semibold text-xl mr-2">
                      {orders?.length}
                    </span>
                    Orders
                  </>
                ) : (
                  <Skeleton width={100} />
                )}
              </h2>
              {orders ? (
                orders.length ? (
                  <div className="mt-5 space-y-6">
                    {orders.map(
                      ({
                        _id,
                        id,
                        amount_total,
                        items,
                        timestamp,
                        order_status,
                      }) => (
                        <Order
                          key={`order-${_id}`}
                          id={id}
                          _id={_id}
                          amount_total={amount_total / 100}
                          timestamp={timestamp}
                          items={items}
                          status={order_status.current.status}
                          admin
                        />
                      )
                    )}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center mt-16 sm:w-auto w-3/4 mx-auto sm:max-w-xs ">
                    <Image
                      src="/img/empty.svg"
                      width={300}
                      height={300}
                      alt=""
                      objectFit="contain"
                    />
                  </div>
                )
              ) : (
                <Skeleton count={12} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Dashboard.admin = true;

export default Dashboard;
