import './src/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@fpoon-tymex/ui'],
  output: 'standalone',
  experimental: {},
};
