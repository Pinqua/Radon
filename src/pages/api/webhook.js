import { buffer } from "micro";
import { connectToDatabase } from "../../util/mongodb";

//Establish connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  try {
    const { db } = await connectToDatabase();
    //console.log(session);
    /* const listLineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      { limit: 100 }
    );
    */

    /*
    {
      "id": "cs_test_xzljJfJefAcCvGQVL30yVvjVbmzB2vHXKHFssYlONGcUG5lEBG3Hr3S3",
      "object": "checkout.session",
      "allow_promotion_codes": null,
      "amount_subtotal": null,
      "amount_total": null,
      "automatic_tax": {
        "enabled": false,
        "status": null
      },
      "billing_address_collection": null,
      "cancel_url": "https://example.com/cancel",
      "client_reference_id": null,
      "currency": null,
      "customer": null,
      "customer_details": null,
      "customer_email": null,
      "livemode": false,
      "locale": null,
      "metadata": {},
      "mode": "payment",
      "payment_intent": "pi_1DoXwd2eZvKYlo2CHX53UyfJ",
      "payment_method_options": {},
      "payment_method_types": [
        "card"
      ],
      "payment_status": "unpaid",
      "setup_intent": null,
      "shipping": null,
      "shipping_address_collection": null,
      "submit_type": null,
      "subscription": null,
      "success_url": "https://example.com/success",
      "total_details": null
    }*/
    //const images=listLineItems

    /* const orderDetails={
          _id:session.id,
          user:session.metadata.email,
          amount_subtotal: session.amount_subtotal / 100,
          amount_total:session.amount_total/100,
          amount_shipping: session.total_details.amount_shipping / 100,
          images: JSON.parse(session.metadata.images).map(
            (img) => `https://fakestoreapi.com/img/${img}`
          ),
          items:listLineItems.data,

    }
*/

    let result = await db
      .collection("temp")
      .findOne({ user: session.metadata.user });
    delete result._id;
    console.log(result);
    const orderDetails = {
      ...result,
      ...session,
      timestamp: new Date(),
    };
    await db.collection("orders").insertOne(orderDetails);

    /*const client = await MongoClient.connect(
      ""
    ,{ useUnifiedTopology: true });
    const db = client.db();
    const orderCollection = db.collection("orders");
    const order = await orderCollection.insertOne({
      user: session.metadata.email,
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: new Date(),
    });*/
   
    console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
  } catch (err) {
    console.log(err);
  }

  /*console.log("Fulfilling order", session);
  console.log("SUCCESS");
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to the DB`);
    });*/
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    //Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //Fulfill the order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
