"use client"

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


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
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
