import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/Gist-Blog-Generator',
  images: {
    unoptimized: true
  }
};

export default nextConfig;