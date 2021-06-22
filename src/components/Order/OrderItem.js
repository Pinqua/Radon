import React from "react";
import Image from "next/image";
import Link from "next/link";
import Currency from "react-currency-formatter";
import { useRouter } from "next/router";

function OrderItem({ item }) {
    const router = useRouter();
    return (
        <div className="flex my-4 text-sm text-gray-700 p-6 border border-gray-200 justify-between">
            <div>
                <span className="link font-semibold">
                    <Link href={`/product-details/${item?._id}`}>{item?.title}</Link>
                </span>
                <div className="mt-1 mb-2">
                    <p>
                        <span>Quantity - </span>
                        {item?.qty}
                    </p>
                    <p className="font-semibold">
                        <span className="font-normal">Price - </span>
                        <Currency quantity={item?.price} currency="INR" />
                    </p>
                </div>
            </div>
            <div className="ml-6">
                <Image
                    src={item?.image}
                    width={120}
                    height={120}
                    objectFit="contain"
                    className="cursor-pointer"
                    onClick={() => {
                        router.push(`/product-details/${item?._id}`);
                    }}
                />
            </div>
        </div>
    );
}

export default OrderItem;
