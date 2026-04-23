import type { Metadata } from "next";
import type { SeoMetadataProps } from "@/types";
import { SITE_CONFIG, SEO_LIMITS } from "@/lib/config";

// ─── Title Formatter ─────────────────────────────────────────────────────────
/**
 * Formats the page title with a brand suffix.
 * Warns in dev when title falls outside SEO-optimal character range.
 */
function formatTitle(title: string, isHomePage = false): string {
  const formatted = isHomePage
    ? `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`
    : `${title} | ${SITE_CONFIG.name}`;

  if (process.env.NODE_ENV === "development") {
    if (formatted.length < SEO_LIMITS.titleMin) {
      console.warn(`[SEO] Title too short (${formatted.length} chars): "${formatted}"`);
    }
    if (formatted.length > SEO_LIMITS.titleMax) {
      console.warn(`[SEO] Title too long (${formatted.length} chars): "${formatted}"`);
    }
  }

  return formatted;
}

// ─── Description Validator ────────────────────────────────────────────────────
function validateDescription(description: string): string {
  if (process.env.NODE_ENV === "development") {
    if (description.length < SEO_LIMITS.descriptionMin) {
      console.warn(`[SEO] Description too short (${description.length} chars).`);
    }
    if (description.length > SEO_LIMITS.descriptionMax) {
      console.warn(`[SEO] Description too long (${description.length} chars). Will be truncated by Google.`);
    }
  }
  return description;
}

// ─── Canonical URL Builder ────────────────────────────────────────────────────
function buildCanonicalUrl(slug?: string): string {
  if (!slug || slug === "/") return SITE_CONFIG.url;
  const cleanSlug = slug.startsWith("/") ? slug : `/${slug}`;
  return `${SITE_CONFIG.url}${cleanSlug}`;
}

// ─── OG Image URL Builder ─────────────────────────────────────────────────────
function buildOgImageUrl(ogImage?: string): string {
  if (!ogImage) return `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`;
  if (ogImage.startsWith("http")) return ogImage;
  return `${SITE_CONFIG.url}${ogImage}`;
}

// ─── Main Metadata Generator ─────────────────────────────────────────────────
/**
 * generateMetadata
 *
 * Centralised metadata factory. Call this from every page's
 * `export async function generateMetadata()` to ensure consistent,
 * SEO-optimal output across the entire site.
 *
 * @example
 * ```ts
 * // app/about/page.tsx
 * export const metadata = generateMetadata({
 *   title: "About Us",
 *   description: "Learn about our mission, team, and values.",
 *   slug: "/about",
 * });
 * ```
 */
export function generateMetadata(props: SeoMetadataProps, isHomePage = false): Metadata {
  const {
    title,
    description,
    slug,
    ogImage,
    ogType      = "website",
    noIndex     = false,
    noFollow    = false,
    publishedAt,
    modifiedAt,
    authors     = [],
    keywords    = [],
  } = props;

  const formattedTitle = formatTitle(title, isHomePage);
  const validatedDesc  = validateDescription(description);
  const canonicalUrl   = buildCanonicalUrl(slug);
  const ogImageUrl     = buildOgImageUrl(ogImage);

  const robotsDirective = [
    noIndex  ? "noindex"  : "index",
    noFollow ? "nofollow" : "follow",
  ].join(", ");

  return {
    // ── Core ─────────────────────────────────────────────────────
    title:          formattedTitle,
    description:    validatedDesc,
    keywords:       keywords.length ? keywords.join(", ") : undefined,

    // ── Canonical ─────────────────────────────────────────────────
    alternates: {
      canonical: canonicalUrl,
    },

    // ── Robots ───────────────────────────────────────────────────
    robots: {
      index:           !noIndex,
      follow:          !noFollow,
      googleBot: {
        index:         !noIndex,
        follow:        !noFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // ── OpenGraph ─────────────────────────────────────────────────
    openGraph: {
      title:       formattedTitle,
      description: validatedDesc,
      url:         canonicalUrl,
      siteName:    SITE_CONFIG.name,
      locale:      SITE_CONFIG.locale,
      type:        ogType as "website" | "article",
      images: [
        {
          url:    ogImageUrl,
          width:  SITE_CONFIG.ogImageWidth,
          height: SITE_CONFIG.ogImageHeight,
          alt:    formattedTitle,
        },
      ],
      ...(ogType === "article" && publishedAt
        ? {
            publishedTime: publishedAt,
            modifiedTime:  modifiedAt,
            authors:       authors,
          }
        : {}),
    },

    // ── Twitter / X ───────────────────────────────────────────────
    twitter: {
      card:        "summary_large_image",
      title:       formattedTitle,
      description: validatedDesc,
      site:        `@${SITE_CONFIG.social.twitter}`,
      creator:     authors.length ? `@${authors[0]}` : `@${SITE_CONFIG.social.twitter}`,
      images:      [ogImageUrl],
    },

    // ── App-level ─────────────────────────────────────────────────
    metadataBase: new URL(SITE_CONFIG.url),
    applicationName: SITE_CONFIG.name,
    referrer: "origin-when-cross-origin",
    creator:  SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,

    // ── Verification (add your tokens in env vars) ─────────────────
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION      ?? "",
    },

    // ── Custom robots meta ────────────────────────────────────────
    other: {
      "robots": robotsDirective,
    },
  };
}

// ─── Page-level metadata shorthand ───────────────────────────────────────────
/** Convenience wrapper for the home page. */
export function generateHomeMetadata(): Metadata {
  return generateMetadata(
    {
      title:       SITE_CONFIG.name,
      description: SITE_CONFIG.description,
      slug:        "/",
    },
    true, // isHomePage
  );
}
