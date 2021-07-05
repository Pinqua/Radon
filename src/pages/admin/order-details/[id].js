import { useRouter } from "next/router";
import OrderDetails from "../../../components/Order/OrderDetails";
import Head from "next/head";

function orderDetails() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Radon | OrderDetails</title>
      </Head>
      <OrderDetails id={router.query?.id} admin />
    </>
  );
}

orderDetails.admin = true;
export default orderDetails;
