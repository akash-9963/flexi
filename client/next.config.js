/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flexi-phi.vercel.app",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
