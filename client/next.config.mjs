/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
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
