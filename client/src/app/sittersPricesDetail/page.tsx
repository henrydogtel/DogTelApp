"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSittersFetch } from "../lib/server/fetchSitter"; 
import { ISitter } from "@/interfaces/interfaces";
import { useContext } from "react";
import { UserContext } from "@/context/user";


const SittersPricesDetail = () => {
  const [sitters, setSitters] = useState<ISitter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSitters = async () => {
      const data = await getSittersFetch();
      if (data) {
        setSitters(data);
      }
      setLoading(false);
    };

    fetchSitters();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }



  return (
    <div className="flex">
      <div className="max-w-4xl w-1/2 mx-auto p-6">
        <h1 className={`${concertOne.className} text-3xl font-bold mb-6 text-[#B17457]`}>Sitters</h1>
        {sitters && sitters.length > 0 ? (
          <ul className="space-y-4">
            {sitters.map((sitter) => (
              <li
                key={sitter.id}
                className="border border-[#B17457] p-4 rounded-lg shadow hover:bg-[#FFEEAD] transition"
              >
                <Link href={`/sittersPricesDetail/${sitter.id}`} className="flex items-start space-x-4">
                  <Image
                    src={sitter.userImg}
                    alt={`Imagen de ${sitter.firstname}`}
                    className="w-32 h-32 rounded-full object-cover mb-2"
                    width={100}
                    height={100}
                  />
                  <div>
                    <h2 className={`${concertOne.className} text-xl font-semibold text-[#B17457]`}>
                      {sitter.firstname} {sitter.lastname}
                    </h2>
                    <p className={`${concertOne.className} text-lg text-gray-700 font-medium mt-2`}>
                      Stars: {sitter.rate} ★
                    </p>
                    <p className={`${concertOne.className} text-lg text-[#B17457] font-medium mt-2`}>
                      ${sitter.fee}/h
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`${concertOne.className} text-lg text-center text-gray-500`}>No sitters found.</p>
        )}
      </div>
      <div className="w-1/2 bg-[#FAF7F0] p-6 flex items-center justify-center">
        <h1 className={`${concertOne.className} text-[#B17457] text-2xl`}>Mapa</h1>
      </div>
    </div>
  );
};

export default SittersPricesDetail;