/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kaisei-google', // 🌟 リポジトリ名に合わせる
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
