/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "s2.coinmarketcap.com" },
      { hostname: "upload.wikimedia.org" },
    ],
  },
};

export default nextConfig;
