import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    // Geliştirme ortamında image cache'i minimize et
    minimumCacheTTL: isDev ? 0 : 60,
  },
  output: undefined, // Netlify Next.js plugin'i kendi yönetir
};

export default nextConfig;

export default nextConfig;
