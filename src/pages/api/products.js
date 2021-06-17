import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    let products = await db.collection("products").find({}).toArray();
    products = JSON.parse(JSON.stringify(products));
    res.status(200).json({ products });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
