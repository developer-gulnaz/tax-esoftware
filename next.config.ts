import type { NextConfig } from "next";
import path from "path";

const isProd = process.env.NODE_ENV === "production";

console.log(">>> NODE_ENV:", process.env.NODE_ENV);
console.log(">>> BASE PATH:", isProd ? "/sign-in" : "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: isProd ? "/sign-in" : "",
  assetPrefix: isProd ? "/sign-in/" : "",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? "/sign-in" : "",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "node_modules")],
  },
};

export default nextConfig;
