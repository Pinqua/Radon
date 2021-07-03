import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    let products = await db.collection("products").find({}).toArray();
    products = JSON.parse(JSON.stringify(products));
    return res.status(200).json(products);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
