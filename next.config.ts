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
        source: "/api/v1/:path*",
        destination: process.env.BACKEND_URL + "/api/v1/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
};

export default nextConfig;