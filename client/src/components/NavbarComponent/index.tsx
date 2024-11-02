"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import { neucha } from "@/app/lib/server/fonts";
import { signOut } from 'next-auth/react';

const NavbarComponent = () => {
  const { logOut, user } = useContext(UserContext);
  const router = useRouter();
  const [userLocal,setUser] = useState<string | null>(null)
  const [token,setToken] = useState<string | null>(null)


  const logOutUser = () => {
    logOut();
  };

  // Verifica si el usuario y el token existen en localStorage

  useEffect(() => {
    setUser(localStorage.getItem('user')) ;
    setToken(localStorage.getItem('token')) ;
  },[user])
  
 

  return (
    <div>
      <nav className="bg-[#ffb54fd0] border-gray-200 relative z-10">
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

            <ul className={`${neucha.className} font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#D5E1DD] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#ffb64f26]`}>

              <li>
                
                <Link
                  href="registerOwner"
                  className="block p-2 px-3 text-white bg-[#ffd735] hover:bg-[#ffbf52] rounded-2xl"
                  aria-current="page"
                >
                  Take care of dogs!
                </Link>
              </li>

              {/* Renderiza los botones de Sign In y Sign Up solo si no hay user y token */}
              {!userLocal || !token ? (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="block p-2 px-3 text-white bg-[#fc955e] hover:bg-[#d9865d] rounded-2xl"
                      aria-current="page"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/registerAs"
                      className="block p-2 px-3 text-white bg-[#fc955e] hover:bg-[#d9865d] rounded-2xl"
                      aria-current="page"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : null}

              <Link
                  href="/home"
                className="bg-[#fc955e] hover:bg-[#d9865d] text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F0854F] focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center justify-center"
              >
                Home
              </Link>

              {userLocal && token && (
                <Link
                  href="/dashboard"
                  className="bg-[#fc955e] hover:bg-[#d9865d] text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F0854F] focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center justify-center"
                >
                  Dashboard
                </Link>
              )}

              {userLocal && token && (
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
