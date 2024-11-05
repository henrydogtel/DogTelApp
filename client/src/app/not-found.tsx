import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex flex-col justify-center items-end min-h-screen text-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://imagenes.eltiempo.com/files/image_1200_600/uploads/2024/02/06/65c2571787327.jpeg" 
          className="object-cover w-full h-full" 
          alt="Background Image"
          layout="fill" 
        />
      </div>
      <div className="relative z-10 mr-20"> 
      <h1 className="text-6xl font-extrabold text-[#B17457] mb-2 mt-2 font-concert-one">404 - NOT FOUND</h1>

        <h2 className="text-2xl text-[#4c2919] mb-6 font-concert-one">
          The page you’re looking for can’t be found.
        </h2>
        <p className="text-white mb-8 font-concert-one">
          It looks like the page you’re trying to reach doesn’t exist.
        </p>
        <Link href="/home">
          <button className="px-8 py-3 bg-[#c15f32] text-white font-medium text-lg rounded-lg hover:bg-[#6f432f] transition-colors duration-300">
            Go back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
