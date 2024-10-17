import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 text-center">
      <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-6">
        Oops! 😞
        <br />
        The page you’re looking for can’t be found.
      </h2>
      <p className="text-gray-500 mb-8">
        It looks like the page you’re trying to reach doesn’t exist.
      </p>
      <Link href="/">
        <h1 className="px-8 py-3 bg-blue-600 text-white font-medium text-lg rounded-lg hover:bg-blue-700 transition-colors duration-300">
          Go back to Home
        </h1>
      </Link>
    </div>
  );
}
