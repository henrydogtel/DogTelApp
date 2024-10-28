import Link from "next/link";
import { sitters } from "../../../public/sitters"; // Asegúrate de que la ruta sea correcta
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/context/user";

const SittersPricesDetail = () => {



  return (
    <div className="flex">
      <div className="max-w-4xl w-1/2 mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#B17457]">
          Sitters
        </h1>
        <ul className="space-y-4">
          {sitters.map((sitter) => (
            <li
              key={sitter.id}
              className="border border-[#B17457] p-4 rounded-lg shadow hover:bg-[#FFEEAD] transition"
            >
              <Link
                href={`/sittersPricesDetail/${sitter.id}`}
                className="flex items-start space-x-4"
              >
                <Image
                  src={sitter.image}
                  alt={`Imagen de ${sitter.name}`}
                  className="w-32 h-32 rounded-full object-cover mb-2"
                  width={100}
                  height={100}
                />
                <div>
                  <h2 className="text-xl font-semibold text-[#B17457]">
                    {sitter.name}
                  </h2>
                  <p className="text-lg text-gray-700 font-medium mt-2">
                    Stars: {sitter.rating} ★
                  </p>
                  <p className="text-lg text-[#B17457] font-medium mt-2">
                    ${sitter.pricePerHour}/h
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-1/2 bg-[#FAF7F0] p-6 flex items-center justify-center">
        <h1 className="text-[#B17457] text-2xl">Mapa</h1>
      </div>
    </div>
  );
};

export default SittersPricesDetail;
