/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // required for static export with next/image
  },
};

module.exports = nextConfig;
