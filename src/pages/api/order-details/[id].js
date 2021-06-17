import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    try {
        const session = await getSession({ req });
        if (session) {
            const { db } = await connectToDatabase();
            let order = await db
                .collection("order")
                .findOne({ user: session.user.email, id: req.query.id });
            order = JSON.parse(JSON.stringify(order));
            res.send(200).json(order);
        } else {
            res.send(400);
        }
    } catch (err) {
        console.log(err)
        res.status(500);
    }
};
