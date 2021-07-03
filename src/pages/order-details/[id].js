import { useRouter } from "next/router";
import React from "react";
import OrderDetails from "../../components/Order/OrderDetails";
import Head from "next/head";
function orderDetails() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Radon | OrderDetails</title>
      </Head>
      <OrderDetails id={router.query?.id} />
    </>
  );
}

orderDetails.auth = true;
export default orderDetails;
