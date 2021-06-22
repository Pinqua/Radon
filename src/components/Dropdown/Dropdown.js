import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import React from "react";
import onClickOutside from "react-onclickoutside";

function Dropdown({ handleClickOutside }) {
  const router = useRouter();
  Dropdown.handleClickOutside = handleClickOutside;
  return (
    <div className="w-32 font-medium bg-white text-sm rounded shadow overflow-hidden border border-gray-100">
      <div
        className="dropDownOption border-b border-gray-200"
        onClick={() => router.push("/profile")}
      >
        Profile
      </div>
      <div
        className="dropDownOption border-b border-gray-200"
        onClick={() => router.push("/orders")}
      >
        Orders
      </div>
      <div
        className="dropDownOption border-b border-gray-200"
        onClick={() => router.push("/about")}
      >
        Contact
      </div>
      <div className="dropDownOption" onClick={signOut}>
        Logout
      </div>
    </div>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
