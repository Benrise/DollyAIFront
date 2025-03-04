import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb'
    },
  },
  distDir: 'dist',
};

export default nextConfig;
