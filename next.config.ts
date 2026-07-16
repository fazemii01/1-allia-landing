import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: ['new.alliakids.com'],
  },
};

export default nextConfig;
