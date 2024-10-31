  "use client";

  import React, { useEffect, useState, useContext } from "react";
  import { useParams } from "next/navigation";
  import Image from "next/image";
  import Link from "next/link";
  import { UserContext } from "@/context/user";
  import { ISitter } from "@/interfaces/interfaces";

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
          setError("ID del cuidador no válido.");
          setLoading(false);
          return;
        }


        try {
          const found = await getSitterById(sitterId);

          if (!found) throw new Error("Sitter not found");
          setSitter(found);
        } catch (error) {
          setError("No se encontró el cuidador.");
          console.error("Error fetching sitter:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchSitter();
    }, [sitterId, getSitterById]);

    if (loading) {
      return <h1 className="text-center text-gray-500 text-2xl">Cargando...</h1>;
    }

    if (error) {
      return <h1 className="text-center text-red-500 text-2xl">{error}</h1>;
    }

    if (!sitter) {
      return <h1 className="text-center text-red-500 text-2xl">No se pudo cargar el cuidador.</h1>;
    }

    return (
      <div className="max-w-3xl my-10 mx-auto p-8 bg-white shadow-xl rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row items-start">
          <div className="flex-shrink-0">
            <Image
              src={sitter.userImg || '/default-image.jpg'}
              alt={`Imagen de ${sitter.firstname}`}
              className="w-48 h-48 rounded-full object-cover border-4 border-[#B17457] shadow-lg"
              width={192}
              height={192}
            />
            <div className="mt-4 text-lg text-[#B17457] font-medium text-center">
              <p>{sitter.rate} ★</p>
              <p>
                <span className="text-[#FA7070] font-semibold">${sitter.fee}</span>/h
              </p>
            </div>
          </div>

          <div className="md:ml-8 flex-grow flex flex-col justify-center mt-6 md:mt-0">
            <h1 className="text-5xl font-bold text-[#B17457]">
              {sitter.firstname} {sitter.lastname}
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              {sitter.descripcion || "Descripción no disponible."}
            </p>
            <Link
              href="/summary"
              className="mt-8 bg-[#FFEEAD] hover:bg-[#FA7070] text-[#B17457] py-3 px-8 rounded-lg transition duration-300 ease-in-out shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#B17457] focus:ring-opacity-50 border border-[#B17457] hover:border-[#FA7070] transform hover:scale-105"
            >
              Hire now!
            </Link>
          </div>
        </div>
      </div>
    );
  };

  export default SitterDetail;