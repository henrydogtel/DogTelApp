"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "@/context/user";
import { neucha } from "@/app/lib/server/fonts";

const NavbarComponent = () => {
  const { logOut } = useContext(UserContext);


  const logOutUser = () => {
    logOut();
  };

  // Verifica si el usuario y el token existen en localStorage
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  return (
    <div>
      <nav className="bg-[#e9d7a5] border-gray-200 relative z-10">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse relative"
          >
            <Image
              src="https://res.cloudinary.com/dirkgkblb/image/upload/v1729199274/ircul-removebg_mdmgna.png"
              alt="Flowbite Logo"
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul
              className={`${neucha.className} font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-[#e9d7a5]`}
            >
              <li>
                <Link
                  href="registerOwner"
                  className=" p-2 px-3 text-white bg-[#f0a328]  hover:bg-[#cd953b]  font-semibold py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
                  aria-current="page"
                >
                  Take care of dogs!
                </Link>
              </li>

              {/* Renderiza los botones de Sign In y Sign Up solo si no hay user y token */}
              {!user || !token ? (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block p-2 px-3 text-white bg-[#e2a652] hover:bg-[#be9254] rounded-2xl"
                      aria-current="page"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/registerAs"
                      className="block p-2 px-3 text-white bg-[#e2a652] hover:bg-[#be9254] rounded-2xl"
                      aria-current="page"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : null}

              {user && token && (
                <>
                  <li>
                    <Link
                      href="/sittersPricesDetail"
                      className="bg-[#b96c1e] hover:bg-[#be9254] text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
                    >
                      Find Sitters
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/home"
                      className="bg-[#b96c1e] hover:bg-[#be9254] text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
                    >
                      Home
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/dashboard"
                      className="bg-[#b96c1e] hover:bg-[#be9254] text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center justify-center"
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}

              {user && token && (
                <button
                  onClick={() => logOutUser()}
                  className="bg-[#f8503a] hover:bg-[#c54534] text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F0854F] focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
