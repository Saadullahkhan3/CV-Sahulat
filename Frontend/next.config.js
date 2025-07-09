/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Configure for Vercel deployment
  experimental: {
    serverComponentsExternalPackages: []
  },
};

module.exports = nextConfig;