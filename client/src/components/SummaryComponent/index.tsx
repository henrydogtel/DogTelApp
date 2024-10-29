"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Definir el tipo Pet
interface Pet {
  name: string;
  image: string;
}

const SummaryComponent = () => {
  const router = useRouter();
  // Información ficticia
  const sitter = {
    name: "Jane Smith",
    profileImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // Imagen de perfil ficticia
    stars: "4.8",
  };

  const initialPet: Pet = {
    name: "Buddy",
    image:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // Imagen de la mascota ficticia
  };

  const [selectedPet, setSelectedPet] = useState<Pet>(initialPet); // Mascota seleccionada
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla el estado del modal

  // Lista de mascotas ficticias
  const pets: Pet[] = [
    {
      name: "Buddy",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      name: "Charlie",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    {
      name: "Max",
      image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  ];

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const total = 150; // Total ficticio

  const handleProceedToPayment = async () => {
    try {
      const response = await fetch("api/checkout", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
      router.push("/home");
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
    }
  };

  // Define el tipo de parámetro como Pet
  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(false); // Cierra el modal después de seleccionar
  };

  return (
    <div className="bg-[#FAF7F0] p-8 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* Contenedor Principal (dos columnas para el sitter y la mascota) */}
      <div className="flex justify-between items-start mb-8">
        {/* Sección del Sitter */}
        <div className="w-1/2 p-6 border border-[#B17457] rounded-lg shadow-sm mr-4 bg-white min-h-[354px]">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#B17457]">
            Sitter
          </h1>
          <div className="flex flex-col items-center text-center">
            <Image
              src={sitter.profileImage}
              alt={sitter.name}
              className="rounded-full object-cover mb-4 border-4 border-[#B17457]"
              width={150}
              height={150}
            />
            <h2 className="text-2xl font-bold text-[#B17457]">{sitter.name}</h2>
            <h2 className="text-xl font-bold text-[#B17457]">
              {sitter.stars}⭐
            </h2>
          </div>
        </div>

        {/* Sección de la Mascota */}
        <div className="w-1/2 p-6 border border-[#B17457] rounded-lg shadow-sm bg-white min-h-[300px]">
          <h1 className="text-3xl font-bold text-center mb-6 text-[#B17457]">
            Selected Pet
          </h1>
          <div className="flex flex-col items-center text-center">
            <Image
              src={selectedPet.image}
              alt={selectedPet.name}
              className="rounded-lg object-cover mb-4 border-4 border-[#FFEEAD]"
              width={150}
              height={150}
            />
            <h3 className="text-2xl font-semibold text-[#B17457]">
              {selectedPet.name}
            </h3>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="bg-[#FFEEAD] hover:bg-[#eedfa2] text-[#B17457] font-semibold py-2 px-4 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Select Another Pet
            </button>
          </div>
        </div>
      </div>

      {/* Campos de fecha, horario y nota */}
      <div className="mb-4">
        <label className="block text-[#B17457] font-semibold mb-2">
          Start Date:
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border border-[#B17457] rounded mb-4"
        />

        <label className="block text-[#B17457] font-semibold mb-2">
          End Date:
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border border-[#B17457] rounded mb-4"
        />

        <label className="block text-[#B17457] font-semibold mb-2">Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border border-[#B17457] rounded mb-4"
        />

        <label className="block text-[#B17457] font-semibold mb-2">Note:</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border border-[#B17457] rounded"
          placeholder="Add any special instructions or notes..."
        />
      </div>

      {/* Sección del Total */}
      <div className="flex justify-center items-end mb-4">
        <div className="w-1/2 p-2 flex justify-center items-center border border-[#B17457] rounded-lg shadow-sm bg-white">
          <span className="text-lg font-bold text-[#B17457] mr-2">Total:</span>
          <span className="text-2xl font-bold text-[#FA7070]">${total}</span>
        </div>
      </div>

      {/* Botón para proceder al pago */}
      <div className="flex justify-center items-end">
        <button
          className="bg-[#FA7070] hover:bg-[#ec6a6a] text-white font-bold py-3 px-6 w-1/2 flex justify-center items-center border rounded-lg shadow-sm"
          onClick={handleProceedToPayment}
        >
          Proceed to Payment
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-center text-[#B17457]">
              Select a Pet
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {pets.map((petOption) => (
                <div
                  key={petOption.name}
                  className="flex items-center p-2 border border-[#B17457] rounded-lg cursor-pointer hover:bg-[#FFEEAD]"
                  onClick={() => handleSelectPet(petOption)}
                >
                  <Image
                    src={petOption.image}
                    alt={petOption.name}
                    className="w-12 h-12 rounded-lg object-cover mr-4 border-2 border-[#FFEEAD]"
                    width={50}
                    height={50}
                  />
                  <span className="text-lg text-[#B17457]">
                    {petOption.name}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="bg-[#FA7070] hover:bg-[#B17457] text-white font-bold py-2 px-4 rounded w-full mt-6"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryComponent;