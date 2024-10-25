"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const SignUpWithGoogle = () => {

  const {data: session} = useSession()
  console.log(session);
  

  return (
    <div className="flex justify-center">
      <button
        onClick={() => signIn()}
        className="w-full flex items-center justify-center py-3 px-5 text-white bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
          width={20}
          height={20}
        />
        <span className="text-gray-800">Continue with Google</span>
      </button>
    </div>
  );
};

export default SignUpWithGoogle;
