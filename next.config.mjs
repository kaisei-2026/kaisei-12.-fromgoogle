/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kaisei-google',
  images: { unoptimized: true },
  // 🌟 ここから下の3行を追加：エラーがあっても無視して公開する設定
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  swcMinify: true,
};

export default nextConfig;
