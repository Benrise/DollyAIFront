import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        }
      }
    }
  },
  distDir: 'dist',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PULBIC_API_TIMEOUT_MS: process.env.NEXT_PULBIC_API_TIMEOUT_MS,
    NEXT_TERMS_LINK: process.env.NEXT_TERMS_LINK,
    NEXT_OAUTH_LINK: process.env.NEXT_OAUTH_LINK
  },
};

export default nextConfig;
