import React, { useEffect } from "react";
import Image from "next/image";
import { XIcon } from "@heroicons/react/solid";
import Fade from "react-reveal/Fade";
import { signIn, signOut, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import onClickOutside from "react-onclickoutside";
import Skeleton from "react-loading-skeleton";

function SideBarMenu({ closeSideBar }) {
  const [session, loading] = useSession();
  const router = useRouter();
  SideBarMenu.handleClickOutside = closeSideBar;
  const sideBarClickHandler = (href) => {
    closeSideBar();
    router.push(href);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Fade left>
      <div className="z-40 fixed inset-y-0 left-0  xxs:w-1/2 shadow-2xl w-full h-full bg-white p-8  font-medium md:hidden sideBarMenu">
        <div>
          <Image
            src="/img/Radon.svg"
            alt="RADON"
            className="cursor-pointer"
            width={70}
            objectFit="contain"
            height={30}
          />
        </div>
        <div className="my-6">
          {!loading ? (
            session ? (
              <img
                src={session?.user?.image || "/img/profile_pic.svg"}
                loading="lazy"
                alt="pic"
                width="24"
                height="24"
                className="object-contain w-10 h-10 rounded-full mr-1 hover:shadow-md"
                onClick={() => sideBarClickHandler("/profile")}
              />
            ) : (
              <span className="link text-blue-light" onClick={signIn}>
                Login/Signup
              </span>
            )
          ) : (
            <Skeleton circle={true} width={50} height={50} />
          )}
        </div>
        <div className="gap-2 flex flex-col">
          <div>
            <span onClick={() => sideBarClickHandler("/")} className="link">
              Home
            </span>
          </div>
          {session && (
            <div>
              <span
                onClick={() => sideBarClickHandler("/profile")}
                className="link"
              >
                Profile
              </span>
            </div>
          )}
          <div>
            <span
              onClick={() => sideBarClickHandler("/orders")}
              className="link"
            >
              Orders
            </span>
          </div>
          <div>
            <span
              onClick={() => sideBarClickHandler("/about")}
              className="link"
            >
              Contact
            </span>
          </div>
          <div>
            <span
              onClick={() => sideBarClickHandler("/about")}
              className="link"
            >
              About
            </span>
          </div>
          {session && (
            <div>
              <span
                onClick={() => {
                  router.replace("/");
                  signOut();
                }}
                className="link"
              >
                Logout
              </span>
            </div>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <XIcon className="w-7" onClick={closeSideBar} />
        </div>
      </div>
    </Fade>
  );
}

const clickOutsideConfig = {
  handleClickOutside: () => SideBarMenu.handleClickOutside,
};

export default onClickOutside(SideBarMenu, clickOutsideConfig);
