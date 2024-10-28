"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import {signOut} from 'next-auth/react'

const NavbarComponent = () => {
  const { logOut } = useContext(UserContext);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null); // Estado para el rol del usuario
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setIsAuthenticated(true);
      const userData = JSON.parse(user);
      setRole(userData.role); // Asignar el rol del usuario
    }
    setIsLoading(false); // Marcar la carga como completa
  }, []);

  const logOutUser = () => {

    logOut();
    router.push("/");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole(null); // Resetear el rol al salir
  };

  if (isLoading) {
    return null; // O renderiza un spinner o un elemento de carga si prefieres

    router.push("/")
    localStorage.removeItem('firstname')
    localStorage.removeItem('lastname')
    localStorage.removeItem('data')
    logOut()
    signOut()

    

  }

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
              alt="Flowbite Logo"
              width={100}
              height={100}
            />
          </Link>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#D5E1DD] md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-[#96CEB4]">
              {isAuthenticated ? (
                <>
                  {role === "sitter" ? ( // Renderizar opciones para "sitter"
                    <>
                      <li>
                        <Link
                          href="/home"
                          className="block p-2 px-3 text-black bg-white rounded-2xl"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard"
                          className="block p-2 px-3 text-black bg-white rounded-2xl"
                        >
                          Dashboard
                        </Link>
                      </li>
                    </>
                  ) : (
                    // Renderizar opciones para "user"
                    <>
                      <li>
                        <Link
                          href="/home"
                          className="block p-2 px-3 text-black bg-white rounded-2xl"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/sittersPricesDetail"
                          className="block p-2 px-3 text-black bg-white rounded-2xl"
                        >
                          Find Sitters
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/dashboard"
                          className="block p-2 px-3 text-black bg-white rounded-2xl"
                        >
                          Dashboard
                        </Link>
                      </li>
                    </>
                  )}
                  <button
                    onClick={logOutUser}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} size="sm" />
                  </button>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="registerOwner"
                      className="block p-2 px-3 text-white bg-[#FA7070] rounded-2xl"
                    >
                      Take care of dogs!
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="block p-2 px-3 text-black bg-white rounded-2xl"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/registerAs"
                      className="block p-2 px-3 text-black bg-white rounded-2xl"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
