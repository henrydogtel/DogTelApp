"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useContext, useCallback } from "react";
import { ISitter } from "@/interfaces/interfaces";
import { concertOne, neucha } from "../lib/server/fonts";
import { UserContext } from "@/context/user"; 

const SittersPricesDetail = () => {
  const { getSitters } = useContext(UserContext);
  const [sitters, setSitters] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSitters = useCallback(async () => {
    setLoading(true); 
    try {
      const fetchedSitters  = await getSitters() as ISitter[];
      if (fetchedSitters && fetchedSitters.length > 0) {
        setSitters(fetchedSitters); 
      } else {
        setError("Sitters could not be loaded."); 
      }
    } catch (err) {
      setError("Error loading sitters.");
      console.error(err);
    } finally {
      setLoading(false); 
    }
  }, [getSitters]); 

  useEffect(() => {
    fetchSitters(); 
  }, [fetchSitters]); 


  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className={`${neucha.className} text-center text-red-500`}>{error}</p>;
  }

  return (
    <div className="flex bg-[#fcf9f2]">
      <div className="max-w-4xl w-1/2 mx-auto p-6">
        <h1 className={`${concertOne.className} text-3xl font-bold mb-6 text-[#dc803f]`}>Sitters</h1>
        {sitters.length > 0 ? (
          <ul className="space-y-4">
            {sitters.map((sitter:any) => (
              <li
                key={sitter.id}
                className="border border-[#e17442] p-4 rounded-lg shadow bg-[#feeecc] hover:bg-[#f5e1b6] transition"
              >
                <Link href={`/sittersPricesDetail/${sitter.id}`} className="flex items-start space-x-4">
                  <Image
                    src={sitter.userImg || '/default-image.jpg'} 
                    alt={`Imagen de ${sitter.firstname}`}
                    className="w-32 h-32 rounded-full object-cover mb-2"
                    width={100}
                    height={100}
                  />
                  <div>
                    <h2 className={`${concertOne.className} text-xl font-semibold text-[#dc803f]`}>
                      {sitter.firstname} {sitter.lastname}
                    </h2>
                    <p className={`${concertOne.className} text-lg text-gray-700 font-medium mt-2`}>
                    Rating: {sitter.rate} ★
                    </p>
                    <p className={`${concertOne.className} text-lg text-[#dc803f] font-medium mt-2`}>
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
      <div className="w-1/2 bg-[#fff0d3] p-6 flex items-center justify-center">
        <h1 className={`${concertOne.className} text-[#dc803f] text-2xl`}>Map</h1>
      </div>
    </div>
  );
};

export default SittersPricesDetail;
