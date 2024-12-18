"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { concertOne, neucha } from "@/app/lib/server/fonts";

export default function LandingPage() {
  const [ratings, setRatings] = useState<String[]>([]);

  useEffect(() => {
    // Generar ratings aleatorios en el cliente
    const generatedRatings = ["carla.jpg", "juan.jpg", "lucia.jpg", "santiago.jpg"].map(() => 
      (Math.random() * (5 - 4.7) + 4.7).toFixed(1)
    );
    setRatings(generatedRatings);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#fff4d6]">
      <div className="w-full">
        <Image
          src="/marron.png"
          alt="Full Width Image"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex justify-center items-start p-12">
        <div className="w-2/3 p-8 bg-[#fff6bd] shadow-lg rounded-lg">
          <h2 className={`${concertOne.className} text-4xl font-bold mb-9 text-center text-[#d1702b]`}>
            WHAT DEFINES US?
          </h2>
          <ul className="space-y-4">
            {[
              { title: "Personalized Care:", description: "We tailor our services to the specific needs of each dog, providing individual attention and love." },
              { title: "Safe and Cozy Environment:", description: "Our facilities are designed to ensure comfort and safety for all canine guests." },
              { title: "Professional and Passionate Team:", description: "We have a highly trained team of animal lovers committed to the well-being of dogs." },
              { title: "Activities and Entertainment:", description: "We offer a variety of daily games and activities to keep dogs active, happy, and engaged." },
              { title: "Constant Communication:", description: "We keep owners updated on their pet's status with daily updates and photos for peace of mind." },
            ].map((item, index) => (
              <li key={index}>
                <h3 className={`${concertOne.className} text-lg font-semibold text-[#f08b5c]`}>
                  ● {item.title}
                </h3>
                <p className={`${neucha.className} text-[#774d39]`}>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex flex-col items-center">
          {["Do you want to be a dog sitter?", "Do you need a sitter for your dog?"].map((text, index) => (
            <div key={index} className={`relative w-1/2 flex flex-col items-center justify-center p-8 ${index === 0 ? 'bg-[#ffb28e]' : 'bg-[#ffc97e]'} shadow-lg rounded-lg mb-8`}>
              <h2 className={`${concertOne.className} text-2xl font-bold mb-4 text-[#ffffff]`}>
                {text}
              </h2>
              <Link href={index === 0 ? "/registerSitter" : "/registerOwner"}>
                <button className="px-6 py-3 bg-[#ffead] text-[#6c3f0f] font-semibold rounded-lg shadow-lg hover:bg-[#ffbc9f] transition duration-300">
                  <p className={`${neucha.className} text-[#ffffff]`}>Click here</p>
                </button>
              </Link>

              <div className="absolute bottom-4 right-4 w-16 h-16">
                <Image
                  src="/perrito.png"
                  alt="Small image"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-12">
        <h3 className={`${concertOne.className} text-4xl font-bold text-[#ea804f]`}>
          THESE ARE SOME OF OUR SITTERS
        </h3>
      </div>

      <div className="flex justify-center space-x-4 px-12 pb-12">
        {["carla.jpg", "juan.jpg", "lucia.jpg", "santiago.jpg"].map((src, idx) => (
          <div key={idx} className="w-1/4 p-4 bg-[#ffc494] shadow-lg rounded-lg">
            <Image
              src={`/${src}`}
              alt={src.split('.')[0].toUpperCase()}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h4 className={`${concertOne.className} text-lg font-bold mb-2 text-[#ef5c3b]`}>{src.split('.')[0].toUpperCase()}</h4>
            <p className={`${neucha.className} text-[#0d5757cf]`}>🌟 <span className="font-bold">Rating</span>: {ratings[idx]}/5</p>
            <p className={`${neucha.className} text-[#774d39]`}>
              {idx === 0
                ? "Animal lover and veterinary student, Carla has 3 years of experience walking dogs of all breeds and sizes..."
                : idx === 1
                ? "Juan is passionate about outdoor sports and loves taking dogs on long, active walks..."
                : idx === 2
                ? "With a caring and calm approach, Lucía is the ideal walker for older dogs or those needing a little extra attention..."
                : "Responsible and attentive, Santiago has a special bond with shy or nervous dogs..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}