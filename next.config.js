/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  // 1. КРИТИЧЕСКИ ВАЖНО: Создает папку "out" для Cloudflare
  output: 'export',
  
  // 2. ИСПРАВЛЕННЫЙ БЛОК IMAGES: unoptimized теперь работает
  images: {
    unoptimized: true, 
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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

  // 3. Остальные настройки
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Turbopack settings
  turbopack: {
    root: __dirname,
  },

  poweredByHeader: false,
  reactStrictMode: true,
};

// 4. ЭКСПОРТ: Обязательно через обертку Analyzer
module.exports = withBundleAnalyzer(nextConfig);


// /** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// const nextConfig = {
//   output: 'export',
//   images: {
//     unoptimized: true, // Добавьте эту строку
//   },
//   // ─── Compiler Options ─────────────────────────────────────────
//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production"
//       ? { exclude: ["error", "warn"] }
//       : false,
//   },

//   // ─── Image Optimization ────────────────────────────────────────
//  images: {
//   formats: ["image/avif", "image/webp"],
//   qualities: [75, 85],
//   deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//   imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   minimumCacheTTL: 60 * 60 * 24 * 30,
//   // Allow locally-hosted SVG placeholders to pass through next/image.
//   // Hardened with a strict CSP so an inline <script> in a rogue SVG
//   // cannot execute. Safe because we only serve SVGs we author.
//   dangerouslyAllowSVG: true,
//   contentDispositionType: "attachment",
//   contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
//   remotePatterns: [
//     {
//       protocol: "https",
//       hostname: "images.unsplash.com",
//     },
//     {
//       protocol: "https",
//       hostname: "cdn.yourdomain.com",
//     },
//   ],
// },

//   // ─── Strict HTTP Headers ───────────────────────────────────────
//   async headers() {
//     return [
//       {
//         source: "/(.*)",
//         headers: [
//           { key: "X-Content-Type-Options",  value: "nosniff"       },
//           { key: "X-Frame-Options",          value: "DENY"          },
//           { key: "X-XSS-Protection",         value: "1; mode=block" },
//           { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
//           { key: "Permissions-Policy",       value: "camera=(), microphone=(), geolocation=()" },
//         ],
//       },
//     ];
//   },

//   // ─── Experimental ─────────────────────────────────────────────
//   experimental: {
//     // optimizeCss: true,
//     optimizePackageImports: ["lucide-react"],
//   },

//   // ─── Turbopack root (убирает предупреждение о lockfiles) ───────
//   turbopack: {
//     root: __dirname,
//   },

//   poweredByHeader: false,
//   reactStrictMode: true,
//   // swcMinify убран — в Next.js 16 он включён по умолчанию
// };

// module.exports = withBundleAnalyzer(nextConfig);