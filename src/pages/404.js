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
          <div className="sm:mb-10 mb-6">
            <h1 className="font-extrabold sm:text-9xl text-8xl text-blue-light clr_change_animation">
              404
            </h1>
            <p className="sm:mt-6 mt-4 uppercase font-medium sm:text-2xl text-xl">
              Page Not Found
            </p>
          </div>
          <button className="button py-2 px-10 lg:text-lg text-base">
            HomePage
          </button>
        </div>
      </div>
    </>
  );
}
