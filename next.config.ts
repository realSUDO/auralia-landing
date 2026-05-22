import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/auralia-landing",
  images: { unoptimized: true },
};

export default nextConfig;
