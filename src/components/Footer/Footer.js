import Link from "next/link";
import React from "react";
import Image from "next/image";

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
                    <div className="flex items-center space-x-6">
                        <div>
                            <Image
                                width={20}
                                height={20}
                                src="/img/social/gmail.svg"
                                objectFit="contain"
                                className="cursor-pointer"
                                alt="gmail"
                                onClick={() => { }}
                            />
                        </div>
                        <div>
                            <Image
                                width={20}
                                height={20}
                                src="/img/social/facebook.svg"
                                objectFit="contain"
                                className="cursor-pointer"
                                alt="facebook"
                                onClick={() => { }}
                            />
                        </div>
                        <div>
                            <Image
                                width={20}
                                height={20}
                                src="/img/social/instagram.svg"
                                objectFit="contain"
                                className="cursor-pointer"
                                alt="instagram"
                                onClick={() => { }}
                            />
                        </div>
                        <div>
                            <Image
                                width={20}
                                height={20}
                                src="/img/social/twitter.svg"
                                objectFit="contain"
                                className="cursor-pointer"
                                alt="twitter"
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-gray-200 text-center">
                    Made with &nbsp;💗 🔥&nbsp; by
                    <span className="text-white hover:underline ml-2">
                        <Link href="https://itspiyushsati.netlify.app">Piyush Sati</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Footer;
