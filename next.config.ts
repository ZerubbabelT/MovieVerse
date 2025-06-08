import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // register the images from tmdb
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/home",
        destination: "/",
      }
    ]
  }
};
export default nextConfig;
