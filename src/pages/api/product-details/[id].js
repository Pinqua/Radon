import { ObjectId } from "bson";
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    try {
        const { db } = await connectToDatabase();
        let product;
        try {
            product = await db
                .collection("products")
                .findOne({ _id: ObjectId(req.query.id) });
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "Bad Request" });
        }
        if (!product) {
            return res.status(404).json({ message: "Not Found" });
        }
        product = JSON.parse(JSON.stringify(product));
        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
