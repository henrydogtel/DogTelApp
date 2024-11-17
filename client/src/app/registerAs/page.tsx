'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { neucha, concertOne } from "../lib/server/fonts";
const RegisterAs = () => {

  const {data:session} = useSession()
  console.log(session);
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-[#fffdfa]">
        <div className="w-[70%] p-6 bg-[#fff8e1] rounded-lg shadow-lg text-[#e18048] ">
          <h1 className={` ${concertOne.className} text-3xl font-bold mb-6 text-center`}>Register as:</h1>

          <div className="space-y-4">
            <Link
              href="/registerOwner"
              className={` ${neucha.className} text-[#fffefe] text-3xl block w-full text-center p-6 bg-[#ffc676] font-semibold rounded-lg shadow-lg hover:bg-[#f5ad47] transition duration-300`}
            >
              Owner
            </Link>
            <Link
              href="/registerSitter"
              className={`${neucha.className} text-[#ffffff] text-3xl block w-full text-center p-6 bg-[#ffc676] font-semibold rounded-lg shadow-lg hover:bg-[#f5ad47] transition duration-300`}
            >
              Sitter
            </Link>

            <div className="flex flex-col items-center mt-6">
              <h1 className={`${concertOne.className} text-xl font-semibold text-[#f68f53]`}>
                Have an account?
                <Link
                  href="/login"
                  className="text-[#FA7070] hover:text-[#B94F4F] ml-2 transition-colors duration-300"
                >
                  Log In
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAs;
