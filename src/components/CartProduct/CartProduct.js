import { MinusSmIcon, PlusIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { updateQty, removeFromCart } from "../../slices/cartSlice";
import Fade from "react-reveal/Fade";

function CartProduct({
  _id,
  title,
  price,
  description,
  category,
  image,
  qty,
  border,
  disabled,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const total = price * qty;

  const removeItemFromCart = () => dispatch(removeFromCart({ _id }));
  const incQty = () =>
    dispatch(
      updateQty({
        _id,
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
        _id,
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
        className={`block bg-white py-6 sm:grid sm:grid-cols-5 ${border ? "border-b border-gray-300" : ""
          }`}
      >
        <div className="text-center sm:text-left my-auto">
          <Image
            src={image}
            width={150}
            height={150}
            objectFit="contain"
            className="cursor-pointer"
            alt=""
            onClick={() => router.push(`/product-details/${_id}`)}
          />
        </div>

        {/* Middle */}
        <div className="col-span-3 sm:p-4 mt-2 mb-6 sm:my-0">
          <h4 className="mb-3 link lg:text-xl md:text-lg text-base capitalize font-medium">
            <Link href={`/product-details/${_id}`}>{title}</Link>
          </h4>
          <p className="lg:text-sm text-xs my-2  mb-4 line-clamp-3 link text-gray-500">
            <Link href={`/product-details/${_id}`}>{description}</Link>
          </p>
          <span className="font-medium md:text-base text-sm">
            {qty} × <Currency quantity={price} currency="INR" /> =
            <span className="font-bold text-gray-700 mx-1">
              <Currency quantity={total} currency="INR" />
            </span>
          </span>
        </div>

        {/* Buttons on the right of the products */}
        <div className="flex flex-col space-y-4 my-auto  justify-self-end">
          <div className="flex justify-between">
            <button
              className={`button sm:p-1 ${disabled ? "opacity-50" : ""}`}
              onClick={decQty}
              disabled={disabled}
            >
              <MinusSmIcon className="h-5" />
            </button>
            <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
              <span className="font-bold md:text-base text-sm text-gray-700">
                {qty}
              </span>
            </div>
            <button
              className={`button sm:p-1 ${disabled ? "opacity-50" : ""}`}
              onClick={incQty}
              disabled={disabled}
            >
              <PlusIcon className="h-5" />
            </button>
          </div>
          <button
            className={`button py-2  lg:px-10 md:px-8 px-6 ${disabled ? "opacity-50" : ""
              }`}
            onClick={removeItemFromCart}
            disabled={disabled}
          >
            Remove
          </button>
        </div>
      </div>
    </Fade>
  );
}

export default CartProduct;
