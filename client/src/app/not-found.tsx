import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-center px-4 mt-5 mb-10">
      <Image
        src="https://t2.uc.ltmcdn.com/es/posts/0/8/4/como_saber_si_mi_perro_esta_triste_41480_orig.jpg"
        className="rounded-3xl shadow-lg mt-6 w-64 h-64 object-cover mx-auto"
        alt="Sad Dog Image"
        width={500}
        height={500}
      />
      <h1 className="text-6xl font-bold text-gray-900 mb-2 mt-2">404 - NOT FOUND</h1>
      <h2 className="text-2xl text-gray-600 mb-6">
        The page you’re looking for can’t be found.
      </h2>
      <p className="text-gray-500 mb-8">
        It looks like the page you’re trying to reach doesn’t exist.
      </p>
      <Link href="/home">
        <button className="px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Go back to Home
        </button>
      </Link>
    </div>
  );
}
