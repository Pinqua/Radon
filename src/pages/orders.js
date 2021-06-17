import { useSession, getSession, signIn } from "next-auth/client";
import Header from "../components/Header/Header";
import Order from "../components/Order/Order";
//import db from "../../firebase";
import Link from "next/link";
import axios from "axios";
import { connectToDatabase } from "../util/mongodb";

function Orders({ orders, products }) {
  const [session] = useSession();
  return (
    <>
      <Header products={products} />
      <main className="max-w-screen-xl mx-auto pt-20 pb-10 heightFix">
        <h1 className="text-2xl font-semibold border-b-2 mb-2 pb-4 border-gray-200 text-gray-700">
          Your Orders
        </h1>
        {session ? (
          <>
            <h2 className="font-medium text-lg my-2 text-green-500">{orders?.length} Orders</h2>
            <div className="mt-5 space-y-6">
              {orders?.map(
                ({
                  _id,
                  id,
                  amount_total,
                  items,
                  timestamp,
                }) => (
                  <Order
                    key={_id}
                    id={id}
                    amount_total={amount_total/100}
                    timestamp={timestamp}
                    items={items}
                  />
                )
              )}
            </div>
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
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default Orders;
/*
export const getServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  //get the users logged in credentials
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }
  //Firebase DB
  const stripeOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

    /*const order = await stripe.orders.retrieve(
      order.id
    );
    
    const orders = await stripe.orders.list({
      limit: 3,
    });
    //
  //Stripe Orders
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
    },
  };
};
*/

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
    const ordersCollection = db.collection("orders");
    let orders = await ordersCollection
      .find({ user: session.user.email,payment_status:"paid" })
      .toArray();
    orders = JSON.parse(JSON.stringify(orders));
    return {
      props: {
        products: res.data,
        orders,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};

/*
export const getStaticProps = async () => {
  try {
    const res = await axios.get("https://fakestoreapi.com/products");
    return {
      props: {
        products: res.data,
      },
      revalidate: 10,
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
};
*/
