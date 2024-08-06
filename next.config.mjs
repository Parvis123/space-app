/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      {
        protocol: "https",
        hostname: "mars.nasa.gov",
      },
      {
        protocol: "http",
        hostname: "mars.jpl.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "mars.jpl.nasa.gov",
      },
    ],
  },
};

export default nextConfig;
