'use client'
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const RegisterAs = () => {

  const {data:session} = useSession()
  console.log(session);
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-[#FAF7F0]">
        <div className="w-[70%] p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Register as:</h1>

          <div className="space-y-4">
            <Link
              href="/registerOwner"
              className="text-[#B17457] text-3xl block w-full text-center p-6 bg-[#FFEEAD] font-semibold rounded-lg shadow-lg hover:bg-[#EEDEA2] transition duration-300"
            >
              Owner
            </Link>
            <Link
              href="/registerSitter"
              className="text-[#B17457] text-3xl block w-full text-center p-6 bg-[#FFEEAD] font-semibold rounded-lg shadow-lg hover:bg-[#EEDEA2] transition duration-300"
            >
              Sitter
            </Link>

            <div className="flex flex-col items-center mt-6">
              <h1 className="text-xl font-semibold text-gray-700">
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
