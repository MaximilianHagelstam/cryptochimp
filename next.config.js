/** @type {import("next").NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "s2.coinmarketcap.com" },
      { hostname: "upload.wikimedia.org" },
    ],
  },
};
