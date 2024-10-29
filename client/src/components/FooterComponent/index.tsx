import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { neucha, concertOne } from "@/app/lib/server/fonts";

const FooterComponent = () => {
  return (
    <div>
      <footer className="bg-[#96CEB4]">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="flex flex-col items-center">
            <div className="mb-6 flex justify-start w-full">
              <Link
                href="/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <Image
                  src="https://res.cloudinary.com/dirkgkblb/image/upload/v1729199274/ircul-removebg_mdmgna.png"
                  alt="Flowbite Logo"
                  width={100}
                  height={100}
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
              <div>
                <h2 className={`mb-6 text-sm font-semibold text-gray-900 uppercase ${concertOne.className}`}>
                  Resources
                </h2>
                <ul className={`text-black font-medium ${neucha.className}`}>
                  <li className="mb-4">
                    <Link href="https://flowbite.com/" className="hover:underline">
                      Flowbite
                    </Link>
                  </li>
                  <li>
                    <Link href="https://tailwindcss.com/" className="hover:underline">
                      Tailwind CSS
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className={`mb-6 text-sm font-semibold text-gray-900 uppercase ${concertOne.className}`}>
                  Follow us
                </h2>
                <ul className={`text-black font-medium ${neucha.className}`}>
                  <li className="mb-4">
                    <Link href="https://github.com/themesberg/flowbite" className="hover:underline">
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link href="https://discord.gg/4eeurUVvTy" className="hover:underline">
                      Discord
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className={`mb-6 text-sm font-semibold text-gray-900 uppercase ${concertOne.className}`}>
                  Legal
                </h2>
                <ul className={`text-black font-medium ${neucha.className}`}>
                  <li className="mb-4">
                    <Link href="#" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="flex flex-col items-center">
            <span className={`text-sm text-black ${concertOne.className}`}>
              © 2023{" "}
              <Link href="https://flowbite.com/" className="hover:underline">
                Flowbite™
              </Link>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 justify-center">
              {/* Redes sociales */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
