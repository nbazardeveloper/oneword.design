/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // ─── Compiler Options ─────────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // ─── Image Optimization ────────────────────────────────────────
 images: {
  formats: ["image/avif", "image/webp"],
  qualities: [75, 85],
  deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 30,
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "cdn.yourdomain.com",
    },
  ],
},

  // ─── Strict HTTP Headers ───────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff"       },
          { key: "X-Frame-Options",          value: "DENY"          },
          { key: "X-XSS-Protection",         value: "1; mode=block" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // ─── Experimental ─────────────────────────────────────────────
  experimental: {
    // optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },

  // ─── Turbopack root (убирает предупреждение о lockfiles) ───────
  turbopack: {
    root: __dirname,
  },

  poweredByHeader: false,
  reactStrictMode: true,
  // swcMinify убран — в Next.js 16 он включён по умолчанию
};

module.exports = withBundleAnalyzer(nextConfig);