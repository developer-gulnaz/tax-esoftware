import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  sassOptions: {
    includePaths: [path.join(__dirname, "node_modules")],
  },
};

export default nextConfig;
