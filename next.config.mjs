/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["apod.nasa.gov, www.youtube.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
    ],
  },
};

export default nextConfig;
