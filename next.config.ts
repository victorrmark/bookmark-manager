import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.googleusercontent.com",
        pathname: "/s2/favicons/**",
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
