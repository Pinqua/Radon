// pages/500.js
import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Radon | Internal Server Error</title>
      </Head>
      <div className="heightFix flex items-center justify-center text-center">
        <div className="max-w-screen-xl mx-auto flex-col items-center justify-center">
          <div className="mb-10">
            <h1 className="font-extrabold text-9xl clr_change_animation">
              500
            </h1>
            <p className="mt-6 uppercase font-medium text-2xl">
              Internal Server Error
            </p>
          </div>
          <button className="button py-2 px-10 text-lg">HomePage</button>
        </div>
      </div>
    </>
  );
}
