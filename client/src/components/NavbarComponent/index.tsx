import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavbarComponent = () => {
  return (
    <div>
      <nav className="bg-[#96CEB4] border-gray-200 relative z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse relative"
          >
            <Image
              src="https://res.cloudinary.com/dirkgkblb/image/upload/v1729199274/ircul-removebg_mdmgna.png"
              className=""
              alt="Flowbite Logo"
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#D5E1DD] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#96CEB4]">
              <li className="">
                <Link
                  href="registerOwner"
                  className="block p-2 px-3 text-white bg-[#FA7070] rounded-2xl"
                  aria-current="page"
                >
                  Take care of dogs!
                </Link>
              </li>
              <li className="">
                <Link
                  href="/home"
                  className="block p-2 px-3 text-black bg-white rounded-2xl"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li className="">
                <Link
                  href="/login"
                  className="block p-2 px-3 text-black bg-white rounded-2xl"
                  aria-current="page"
                >
                  Sign In
                </Link>
              </li>
              <li className="">
                <Link
                  href="/registerAs"
                  className="block p-2 px-3 text-black bg-white rounded-2xl"
                  aria-current="page"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
