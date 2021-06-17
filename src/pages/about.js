import React from "react";
import Link from "next/link";
import Header from "../components/Header/Header";

function About() {
  return (
    <>
      <Header />
      <div className="heightFix">
        <div className="mt-26 max-w-screen-xl mx-auto">
          <div className="text-lg font-medium  pt-32">
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
              as a side project to enhance and showcase his developer skills.
            </p>
            <p className="mt-2">
              If you wanna get in touch, talk to me about a project
              collaboration or just say hi, just email me -
              <span className="link text-blue-light mx-1">
                piyushsati311999@gmail.com
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
