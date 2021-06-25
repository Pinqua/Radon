import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Fade from "react-reveal/Fade";

function About() {
  return (
    <>
      <Head>
        <title>Radon | About</title>
      </Head>
      <div className="heightFix px-6">
        <div className="max-w-screen-xl mx-auto md:py-20 py-12 pb-20">
          <div className="xl:text-lg text-base   font-medium">
            <h3 className="sm:text-2xl text-xl font-semibold border-b-2 border-gray-200 pb-4 text-gray-700">
              About
            </h3>
            <div className="flex md:gap-8 md:flex-row flex-col w-full items-center overflow-hidden">
              <Fade left>
                <div className="mx-auto md:w-3/4 md:max-w-lg  max-w-xs">
                  <Image
                    src="/img/programming.svg"
                    width={400}
                    height={400}
                    objectFit="contain"
                  />
                </div>
              </Fade>
              <Fade right>
                <div className="flex-grow ml-auto">
                  <p>
                    This a E-commerce website build using
                    <span className="link text-blue-light underline mx-1">
                      <Link href="https://nextjs.org/"> Next.js,</Link>
                    </span>
                    <span className="link text-blue-light underline mx-1">
                      <Link href="https://redux-toolkit.js.org/"> Redux,</Link>
                    </span>
                    <span className="link text-blue-light underline mx-1">
                      <Link href="https://tailwindcss.com"> Tailwindcss,</Link>
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
              </Fade>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
