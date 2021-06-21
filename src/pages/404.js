// pages/404.js
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Radon | Page Not Found</title>
      </Head>
      <div className="heightFix flex items-center justify-center text-center">
        <div className="max-w-screen-xl mx-auto flex-col items-center justify-center">
          <div className="mb-10">
            <h1 className="font-extrabold text-9xl text-blue-light clr_change_animation">
              404
            </h1>
            <p className="mt-6 uppercase font-medium text-2xl">
              Page Not Found
            </p>
          </div>
          <button className="button py-2 px-10 text-lg">HomePage</button>
        </div>
      </div>
    </>
  );
}
