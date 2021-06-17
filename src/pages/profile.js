import { getSession, signIn, useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/Header/Header";
import axios from "axios";
import { connectToDatabase } from "../util/mongodb";
import moment from "moment";


function Profile({products,user}) {
    const [session] = useSession();
    const router = useRouter();

    return (
        <>
            <Header products={products} />
            <div className="heightFix">
                <div className="max-w-screen-xl mx-auto py-20 space-y-10">
                    <h3 className="text-2xl font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
                        Profile
                    </h3>
                    <div className="space-y-4 font-medium">
                        <img
                            src={user?.image || "/img/pic.jpg"}
                            loading="lazy"
                            alt="pic"
                            width="80"
                            height="80"
                            className="object-contain w-24 h-24 rounded-full hover:shadow-md"
                        />
                        <p>
                            <span className="font-semibold">Name - </span>
                            {user?.name}
                        </p>
                        <p>
                            <span className="font-semibold">Email - </span>
                            {user?.email}
                        </p>
                        <p>
                            <span className="font-semibold">Created On - </span>
                            {moment(user?.createdAt).format('llll')}
                        </p>
                        <p className="font-medium text-xl pt-8 text-blue-light">"Whoever said money can't buy happiness didn't know where to shop".</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;


export const getServerSideProps=async (context)=>{
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
        let user = await db.collection("users")
          .findOne({email: session.user.email});
        user = JSON.parse(JSON.stringify(user));
        return {
          props: {
            products: res.data,
            user,
          },
        };
      } catch (err) {
        console.log(err);
        return {
          props: {},
        };
      }
}