"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "@/context/user";
import { ISitter } from "@/interfaces/interfaces";
import { neucha, concertOne } from "@/app/lib/server/fonts";

const SitterDetail = () => {
  const params = useParams();
  const sitterId = params.sitterId as string;
  const { getSitterById } = useContext(UserContext)!;
  const [sitter, setSitter] = useState<ISitter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSitter = async () => {
      if (!sitterId) {
        setError("Invalid sitter ID.");
        setLoading(false);
        return;
      }

      try {
        const found = await getSitterById(sitterId);
        if (!found) throw new Error("Sitter not found");
        setSitter(found);
      } catch (error) {
        setError("Sitter not found.");
        console.error("Error fetching sitter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSitter();
  }, [sitterId, getSitterById]);

  const calculateAge = (birthdate: string): number => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (month < birthDate.getMonth() || (month === birthDate.getMonth() && day < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  if (loading) {
    return <h1 className="text-center text-gray-500 text-2xl">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-red-500 text-2xl">{error}</h1>;
  }

  if (!sitter) {
    return (
      <h1 className="text-center text-red-500 text-2xl">
        Could not load the sitter.
      </h1>
    );
  }

  return (
    <div className="max-w-3xl my-10 mx-auto p-8 bg-[#fff0d3] shadow-xl rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row items-start">
        {/* Sitter Image and Rating */}
        <div className="flex-shrink-0">
          <Image
            src={sitter.userImg || "/default-image.jpg"}
            alt={`Image of ${sitter.firstname}`}
            className="w-48 h-48 rounded-full object-cover border-4 border-[#B17457] shadow-lg"
            width={192}
            height={192}
          />
          <div className={`${concertOne.className} mt-4 text-lg text-[#dc803f] font-medium text-center`}>
            <p>{sitter.rate} ★</p>
            <p>
              <span className={`${concertOne.className} text-[#dc803f] font-semibold`}>
                ${sitter.fee}
              </span>
              /hr
            </p>
          </div>
        </div>

        {/* Sitter Info Section */}
        <div className="md:ml-8 flex-grow flex flex-col justify-center mt-6 md:mt-0">
          <h1 className={`${concertOne.className} text-5xl font-bold text-[#B17457]`}>
            {sitter.firstname} {sitter.lastname}
          </h1>
          <p className={`${neucha.className} text-[#B17457] mt-3 text-lg`}>
            {sitter.descripcion || "Description not available."}
          </p>

          {/* Additional Information */}
          <div className="mt-6 space-y-4">
            <p className="text-lg font-semibold"><strong>Role:</strong> {sitter.role}</p>
            <p className="text-lg font-semibold"><strong>Birthdate:</strong> {new Date(sitter.birthdate).toLocaleDateString()}</p>
            <p className="text-lg font-semibold"><strong>Age:</strong> {calculateAge(sitter.birthdate)} years old</p>
            <p className="text-lg font-semibold"><strong>Address:</strong> {sitter.address}</p>
            <p className="text-lg font-semibold"><strong>Number of Appointments:</strong> {sitter.appointments ? sitter.appointments.length : 0}</p>
          </div>

          {/* Additional Description */}
          <div className="mt-6 text-lg text-[#B17457]">
            <p>
              This sitter charges <span className="font-semibold text-[#dc803f]">${sitter.fee} per hour</span>. Don't hesitate to hire them and get the best care for your needs. Their experience and professionalism make them the perfect choice. Feel free to reach out and hire them today!
            </p>
            <p className="mt-4">
              Located at: <span className="font-semibold">{sitter.address}</span>. Why wait? Take the first step in hiring a fantastic sitter today!
            </p>
          </div>

          {/* Hire Now Button */}
          <Link
            href="/summary"
            onClick={() =>
              localStorage.setItem("selectedSitter", JSON.stringify(sitter))
            }
            className={`${neucha.className} mt-8 bg-[#e99953] hover:bg-[#f8b275] text-[#ffffff] py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B17457] focus:ring-opacity-50 border border-[#B17457] hover:border-[#FA7070] transform hover:scale-105 text-center`}
          >
            Hire now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SitterDetail;
