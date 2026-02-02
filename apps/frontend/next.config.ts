import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "localhost",
      "i.pinimg.com",
      "res.cloudinary.com",
      "imgkit.io",
      "pbs.twimg.com",
    ],
  },
};

export default nextConfig;
