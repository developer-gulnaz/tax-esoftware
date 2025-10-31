import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  sassOptions: {
    includePaths: [path.join(__dirname, "node_modules")],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/sign-in",
        permanent: false, // temporary redirect so you can still adjust it later
      },
    ];
  },
};

export default nextConfig;
