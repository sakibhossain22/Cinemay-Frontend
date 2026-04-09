import { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        // Explicitly map auth requests
        source: "/api/auth/:path*",
        destination: process.env.BACKEND_URL + "/api/auth/:path*",
      },
      {
        // Explicitly map v1 API requests
        source: "/api/:path*",
        destination: process.env.BACKEND_URL + "/api/:path*",
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    qualities: [20, 30, 40, 50, 60, 70, 75, 80],
    minimumCacheTTL : 60
  },
};

export default nextConfig;