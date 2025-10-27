/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Ignore next/document imports from dependencies during build
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/document': false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;