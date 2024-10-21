"use client";

import React from "react";
import { useParams } from "next/navigation";
import { sitters } from "../../../../public/sitters"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";

const SitterDetail = () => {
  const { sitterId } = useParams(); // Obtener el ID del cuidador de la URL

  // Asegúrate de que sitterId sea un string antes de intentar parsear
  const id = Array.isArray(sitterId) ? sitterId[0] : sitterId;
  const sitter = sitters.find((sitter) => sitter.id === parseInt(id)); // Buscar el cuidador en el array

  // Verifica si el cuidador existe
  if (!sitter) {
    return (
      <h1 className="text-center text-red-500 text-2xl">
        No se encontró el cuidador.
      </h1>
    );
  }

  return (
    <div className="max-w-3xl my-10 mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row items-start">
        {/* Imagen del Sitter */}
        <div className="flex-shrink-0">
          <Image
            src={sitter.image}
            alt={`Imagen de ${sitter.name}`}
            className="w-48 h-48 rounded-full object-cover border-4 border-[#B17457] shadow-lg"
            width={192}
            height={192}
          />
          <div className="mt-4 text-lg text-[#B17457] font-medium text-center">
            {" "}
            {/* Añadido text-center */}
            <p>{sitter.rating} ★</p>
            <p>
              <span className="text-[#FA7070] font-semibold">
                ${sitter.pricePerHour}
              </span>
              /h
            </p>
          </div>
        </div>

        {/* Detalles del Sitter */}
        <div className="md:ml-8 flex-grow flex flex-col justify-center mt-6 md:mt-0">
          <h1 className="text-5xl font-bold text-[#B17457]">{sitter.name}</h1>
          <p className="text-gray-600 mt-3 text-lg">
            {sitter.about || "Descripción no disponible."}
          </p>
          <button className="mt-8 bg-[#FFEEAD] hover:bg-[#FA7070] text-[#B17457] py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B17457] focus:ring-opacity-50 border border-[#B17457] hover:border-[#FA7070] transform hover:scale-105">
            Hire now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SitterDetail;
