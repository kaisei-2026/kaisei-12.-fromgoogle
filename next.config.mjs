/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kaisei-google',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // 🌟 ここから下を追加！
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;
