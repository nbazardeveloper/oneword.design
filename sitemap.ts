import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/config";

/**
 * sitemap.ts
 *
 * Dynamically generates /sitemap.xml via Next.js App Router.
 * Add dynamic page fetching (e.g., from CMS) in the body below.
 *
 * Priority guide:
 *   1.0 = Home page
 *   0.9 = Primary landing pages
 *   0.8 = Key feature/product pages
 *   0.6 = Content/blog
 *   0.4 = Legal / secondary
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const now     = new Date();

  // ── Static Pages ──────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url:            baseUrl,
      lastModified:   now,
      changeFrequency:"weekly",
      priority:       1.0,
    },
    {
      url:            `${baseUrl}/pricing`,
      lastModified:   now,
      changeFrequency:"weekly",
      priority:       0.9,
    },
    {
      url:            `${baseUrl}/projects`,
      lastModified:   now,
      changeFrequency:"weekly",
      priority:       0.9,
    },
    {
      url:            `${baseUrl}/about`,
      lastModified:   now,
      changeFrequency:"monthly",
      priority:       0.7,
    },
    {
      url:            `${baseUrl}/privacy`,
      lastModified:   now,
      changeFrequency:"yearly",
      priority:       0.3,
    },
    {
      url:            `${baseUrl}/terms`,
      lastModified:   now,
      changeFrequency:"yearly",
      priority:       0.3,
    },
  ];

  // ── Dynamic Pages (example: blog posts from CMS) ──────────────────
  // const posts = await fetchBlogPosts(); // Replace with your data source
  // const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
  //   url:            `${baseUrl}/blog/${post.slug}`,
  //   lastModified:   new Date(post.updatedAt),
  //   changeFrequency:"weekly",
  //   priority:       0.6,
  // }));

  return [
    ...staticPages,
    // ...blogPages,
  ];
}
