import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database:
    "mongodb+srv://PiyushSati:X17yhHFbRtwpI7vN@cluster0.dv62p.mongodb.net/Radon",

  theme: "dark",
});
