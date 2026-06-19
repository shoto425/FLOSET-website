import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: appDir,
  },
  async rewrites() {
    return [
      { source: "/", destination: "/index.html" },
    ];
  },
};

export default nextConfig;
