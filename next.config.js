/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
