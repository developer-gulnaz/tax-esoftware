import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  basePath: isProd ? "/sign-in" : "",
  assetPrefix: isProd ? "/sign-in/" : "",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: "export",
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/sign-in" : "",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "node_modules")],
  },
};

export default nextConfig;
