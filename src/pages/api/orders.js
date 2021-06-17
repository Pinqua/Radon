import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  try {
    const session = await getSession({ req });
    if (session) {
      const { db } = await connectToDatabase();
      let orders = await db
        .collection("orders")
        .find({ user: session.user.email, payment_status: "paid" })
        .toArray();
      orders = JSON.parse(JSON.stringify(orders));
      res.send(200).json(orders);
    } else {
      res.send(400);
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
