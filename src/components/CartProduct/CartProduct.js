import { MinusSmIcon, PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { updateQty, removeFromCart } from "../../slices/cartSlice";
import Fade from "react-reveal/Fade";

function CartProduct({
  id,
  title,
  price,
  description,
  category,
  image,
  qty,
  border,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const total = price * qty;

  const removeItemFromCart = () => dispatch(removeFromCart({ id }));
  const incQty = () =>
    dispatch(
      updateQty({
        id,
        title,
        price,
        description,
        category,
        image,
        qty: qty + 1,
      })
    );
  const decQty = () =>
    dispatch(
      updateQty({
        id,
        title,
        price,
        description,
        category,
        image,
        qty: qty - 1,
      })
    );

  return (
    <Fade bottom>
      <div
        className={`block bg-white py-6 sm:grid sm:grid-cols-5 sm:my-3 ${
          border ? "border-b border-gray-200" : ""
        }`}
      >
        <div className="text-center sm:text-left">
          <Image
            src={image}
            width={150}
            height={150}
            objectFit="contain"
            className="cursor-pointer"
            onClick={() => router.push(`/product-details/${id}`)}
          />
        </div>

        {/* Middle */}
        <div className="col-span-3 mx-5 mb-4 sm:mb-0">
          <h4 className="my-3 link text-xl font-medium">
            <Link href={`/product-details/${id}`}>{title}</Link>
          </h4>
          <p className="text-sm my-2 mb-4 line-clamp-3 link text-gray-500">
            <Link href={`/product-details/${id}`}>{description}</Link>
          </p>
          <span className="font-medium">
            {qty} × <Currency quantity={price} currency="INR" /> =
            <span className="font-bold text-gray-700 mx-1">
              <Currency quantity={total} currency="INR" />
            </span>
          </span>
        </div>

        {/* Buttons on the right of the products */}
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
          <div className="flex justify-between xs:justify-start">
            <button className="button sm:p-1" onClick={decQty}>
              <MinusSmIcon className="h-5" />
            </button>
            <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
              <span className="font-bold text-gray-700">{qty}</span>
            </div>
            <button className="button sm:p-1" onClick={incQty}>
              <PlusIcon className="h-5" />
            </button>
          </div>
          <button className="button py-2 px-8" onClick={removeItemFromCart}>
            Remove
          </button>
        </div>
      </div>
    </Fade>
  );
}

export default CartProduct;
