import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.2.164.246"],
  images: {
    unoptimized: true,
  },
  output: "export",
  reactCompiler: true,
  trailingSlash: true,
};

export default nextConfig;
