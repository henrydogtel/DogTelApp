/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite imágenes desde cualquier dominio
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignorar ESLint durante la construcción
  },
};

export default nextConfig;
