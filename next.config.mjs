/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "s2.coinmarketcap.com" },
      { hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;
