import Link from "next/link";
import React from "react";

function Footer() {
    return (
        <div className="bg-gray-800 py-8 px-6 text-gray-200">
            <div className="max-w-screen-xl w-full mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <Link href="/">
                            <span className="cursor-pointer hover:text-white">Home</span>
                        </Link>
                        <Link href="/orders">
                            <span className="cursor-pointer hover:text-white">Orders</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-8">
                        <Link href="/">
                            <img
                                width="20"
                                height="20"
                                src="/img/social/gmail.svg"
                                loading="lazy"
                                className="cursor-pointer"
                                alt="gmail"
                            />
                        </Link>
                        <Link href="/">
                            <img
                                width="20"
                                height="20"
                                src="/img/social/facebook.svg"
                                loading="lazy"
                                alt="facebook"
                                className="cursor-pointer"
                            />
                        </Link>
                        <Link href="/">
                            <img
                                width="20"
                                height="20"
                                src="/img/social/instagram.svg"
                                loading="lazy"
                                alt="instagram"
                                className="cursor-pointer"
                            />
                        </Link>
                        <Link href="/">
                            <img
                                width="20"
                                height="20"
                                src="/img/social/twitter.svg"
                                loading="lazy"
                                alt="twitter"
                                className="cursor-pointer"
                            />
                        </Link>
                    </div>
                </div>
                <p className="mt-6 text-gray-200 text-center">Made with  💗  🔥  by <span className="text-white hover:underline"><Link href="https://itspiyushsati.netlify.app">Piyush Sati</Link></span></p>
            </div>
        </div>
    );
}

export default Footer;
