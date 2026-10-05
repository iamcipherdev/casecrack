import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/casecrack",
  images: { unoptimized: true },
};

export default nextConfig;
