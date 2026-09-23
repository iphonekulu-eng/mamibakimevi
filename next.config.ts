import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Netlify: dosya yükleme için yazılabilir dizin yok,
  // uploads public/uploads altına kaydedilir — bu Netlify'da kalıcı değil.
  // Gerçek dosya yükleme için harici storage (S3, Cloudinary vb.) gerekir.
  output: undefined, // Netlify Next.js plugin'i kendi yönetir
};

export default nextConfig;
