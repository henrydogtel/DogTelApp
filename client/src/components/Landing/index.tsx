"use client";

import Link from "next/link";
import Image from "next/image"; 

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mt-11">
        <Image
          src="/marron.png"
          alt="Full Width Image"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="flex justify-center items-start p-12">
        <div className="w-2/3 p-8 bg-[#fff9d4] shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold mb-9 text-center text-[#b17457]">
            WHAT DEFINES US?
          </h2>
          <ul className="space-y-4">
            <li>
              <h3 className="text-lg font-semibold text-[#f08b5c]">
              ● Personalized Care:
              </h3>
              <p>
               We tailor our services to the specific needs of each dog,
                providing individual attention and love.
              </p>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#f08b5c]">
              ● Safe and Cozy Environment:
              </h3>
              <p>
               Our facilities are designed to ensure comfort and safety for all
                canine guests.
              </p>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#f08b5c]">
              ● Professional and Passionate Team:
              </h3>
              <p>
               We have a highly trained team of animal lovers committed to the
                well-being of dogs.
              </p>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#f08b5c]">
              ● Activities and Entertainment:
              </h3>
              <p>
               We offer a variety of daily games and activities to keep dogs
                active, happy, and engaged.
              </p>
            </li>
            <li>
              <h3 className="text-lg font-semibold text-[#f08b5c]">
              ● Constant Communication:
              </h3>
              <p>
               We keep owners updated on their pets status with daily updates
                and photos for peace of mind.
              </p>
            </li>
          </ul>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="relative w-1/2 flex flex-col items-center justify-center p-8 bg-[#f5ab88] shadow-lg rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-[#ffffff]">
              Do you want to be a dog sitter?
            </h2>
            <Link href="/registerSitter">
              <button className="px-6 py-3 bg-[#ffead] text-[#6c3f0f] font-semibold rounded-lg shadow-lg hover:bg-[#ffbc9f] transition duration-300">
                Click here
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

          <div className="relative w-1/2 flex flex-col items-center justify-center p-8 bg-[#ffd08e] shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#ffffff]">
              Do you need a sitter for your dog?
            </h2>
            <Link href="/registerOwner">
              <button className="px-6 py-3 bg-[#ffead] text-[#bf7451] font-semibold rounded-lg shadow-lg hover:bg-[#ffe0a3] transition duration-300">
                Click here
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
        </div>
      </div>
      <div className="text-center py-12">
  <h3 className="text-3xl font-bold text-[#c46337]">
    THESE ARE SOME OF OUR SITTERS
  </h3>
</div>

      <div className="flex justify-center space-x-4 px-12 pb-12">
        <div className="w-1/4 p-4 bg-[#ffb87e] shadow-lg rounded-lg">
          <Image
            src="/carla.jpg"
            alt="Carla M."
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-bold mb-2 text-[#ef5c3b]">CARLA M.</h4>
          <p>🌟 <span className="font-bold text-[#eaa238]">Rating</span>: 4.9/5</p>
          <p>
            Animal lover and veterinary student, Carla has 3 years of experience
            walking dogs of all breeds and sizes...
          </p>
        </div>

        <div className="w-1/4 p-4 bg-[#ffb87e] shadow-lg rounded-lg">
          <Image
            src="/juan.jpg"
            alt="Juan P."
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-bold mb-2 text-[#ef5c3b]">JUAN P.</h4>
          <p>🌟 <span className="font-bold text-[#eaa238]">Rating</span>: 4.8/5</p>
          <p>
            Juan is passionate about outdoor sports and loves taking dogs on
            long, active walks...
          </p>
        </div>

        <div className="w-1/4 p-4 bg-[#ffb87e] shadow-lg rounded-lg">
          <Image
            src="/lucia.jpg"
            alt="Lucía G."
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-bold mb-2 text-[#ef5c3b]">LUCIA G.</h4>
          <p>🌟 <span className="font-bold text-[#eaa238]">Rating</span>: 5.0/5</p>
          <p>
            With a caring and calm approach, Lucía is the ideal walker for older
            dogs or those needing a little extra attention...
          </p>
        </div>

        <div className="w-1/4 p-4 bg-[#ffb87e] shadow-lg rounded-lg">
          <Image
            src="/santiago.jpg"
            alt="Santiago R."
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h4 className="text-lg font-bold mb-2 text-[#ef5c3b]">SANTIAGO R.</h4>
          <p>🌟 <span className="font-bold text-[#f1a22b]">Rating</span>: 4.7/5</p>
          <p>
            Responsible and attentive, Santiago has a special bond with shy or
            nervous dogs...
          </p>
        </div>
      </div>
         
    </div>
  );
}