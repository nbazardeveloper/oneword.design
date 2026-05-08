import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config";

/**
 * robots.ts
 *
 * Generates /robots.txt via Next.js App Router metadata API.
 * Configures which paths crawlers can/cannot access.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow:     ["/"],
        disallow:  [
          "/api/",        // Never index API routes
          "/admin/",      // Never index admin pages
          "/_next/",      // Next.js internals
          "/dashboard/",  // Auth-gated content
        ],
      },
      {
        // Block AI training crawlers
        userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "anthropic-ai"],
        disallow:  ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
