import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

function About() {
  return (
    <>
      <Head>
        <title>Radon | About</title>
      </Head>
      <div className="heightFix">
        <div className="mt-26 max-w-screen-xl mx-auto">
          <div className="text-lg font-medium  pt-20">
            <h3 className="text-2xl font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
              About
            </h3>
            <div className="flex w-full items-center py-6">
              <div>
                <Image
                  src="/img/programming.svg"
                  width={400}
                  height={400}
                  objectFit="contain"
                />
              </div>
              <div className="flex-grow max-w-3xl ml-auto">
                <p>
                  This a E-commerce website build using
                  <span className="link text-blue-light underline mx-1">
                    <Link href="https://nextjs.org/"> Next.js ,</Link>
                  </span>
                  <span className="link text-blue-light underline mx-1">
                    <Link href="https://redux-toolkit.js.org/"> Redux ,</Link>
                  </span>
                  <span className="link text-blue-light underline mx-1">
                    <Link href="https://tailwindcss.com"> Tailwindcss ,</Link>
                  </span>
                  <span className="link text-blue-light underline mx-1">
                    <Link href="https://cloud.mongodb.com/"> MongoDB </Link>
                  </span>
                  by
                  <span className="font-semibold text-blue-light underline mx-1">
                    <Link href="https://itspiyushsati.netlify.app">
                      Piyush Sati
                    </Link>
                  </span>
                  to enhance and showcase his developer skills.
                </p>
                <p className="mt-2">
                  If you wanna get in touch email
                  <span className="link text-blue-light mx-1">
                    piyushsati311999@gmail.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
