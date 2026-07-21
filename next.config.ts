import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ['new.alliakids.com', 'alliakids.com'],
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com', 'source.unsplash.com', 'storage.alliago.id'],
  },
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
