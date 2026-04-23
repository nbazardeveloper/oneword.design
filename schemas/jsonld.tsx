import type {
  LocalBusinessSchema,
  OrganizationSchema,
  FAQSchema,
} from "@/types";
import { SITE_CONFIG } from "@/lib/config";

// ─── JSON-LD Injector ─────────────────────────────────────────────────────────
/**
 * JsonLd component — injects structured data into <head> via Next.js.
 * Usage: Place inside page components, not in layout (for page-specific schemas).
 *
 * @example
 * <JsonLd data={buildOrganizationSchema({ ... })} />
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 0) }}
    />
  );
}

// ─── Organization Schema ──────────────────────────────────────────────────────
export function buildOrganizationSchema(
  overrides: Partial<OrganizationSchema> = {},
): Record<string, unknown> {
  const defaults: OrganizationSchema = {
    name:  SITE_CONFIG.name,
    url:   SITE_CONFIG.url,
    logo:  `${SITE_CONFIG.url}/logo.png`,
    sameAs: [
      `https://twitter.com/${SITE_CONFIG.social.twitter}`,
      `https://github.com/${SITE_CONFIG.social.github}`,
      `https://linkedin.com/${SITE_CONFIG.social.linkedin}`,
    ],
    contactPoint: {
      telephone:         SITE_CONFIG.telephone,
      contactType:       "customer support",
      availableLanguage: ["English"],
    },
  };

  const merged = { ...defaults, ...overrides };

  return {
    "@context":   "https://schema.org",
    "@type":      "Organization",
    name:         merged.name,
    url:          merged.url,
    logo:         merged.logo,
    description:  merged.description,
    foundingDate: merged.foundingDate,
    sameAs:       merged.sameAs,
    ...(merged.contactPoint
      ? {
          contactPoint: {
            "@type":           "ContactPoint",
            telephone:          merged.contactPoint.telephone,
            contactType:        merged.contactPoint.contactType,
            availableLanguage:  merged.contactPoint.availableLanguage,
          },
        }
      : {}),
  };
}

// ─── Local Business Schema ────────────────────────────────────────────────────
export function buildLocalBusinessSchema(
  data: LocalBusinessSchema,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type":    "LocalBusiness",
    name:       data.name,
    description: data.description,
    url:        data.url,
    telephone:  data.telephone,
    email:      data.email,
    image:      data.image,
    logo:       data.logo,
    priceRange: data.priceRange,
    address: {
      "@type":          "PostalAddress",
      streetAddress:    data.address.streetAddress,
      addressLocality:  data.address.addressLocality,
      addressRegion:    data.address.addressRegion,
      postalCode:       data.address.postalCode,
      addressCountry:   data.address.addressCountry,
    },
    ...(data.geo
      ? {
          geo: {
            "@type":    "GeoCoordinates",
            latitude:   data.geo.latitude,
            longitude:  data.geo.longitude,
          },
        }
      : {}),
    ...(data.openingHours
      ? { openingHours: data.openingHours }
      : {}),
    sameAs: data.sameAs,
  };
}

// ─── FAQ Schema ───────────────────────────────────────────────────────────────
export function buildFaqSchema(data: FAQSchema): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: data.items.map((item) => ({
      "@type":          "Question",
      name:             item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:    item.answer,
      },
    })),
  };
}

// ─── WebSite Schema ───────────────────────────────────────────────────────────
export function buildWebsiteSchema(): Record<string, unknown> {
  return {
    "@context":    "https://schema.org",
    "@type":       "WebSite",
    name:          SITE_CONFIG.name,
    url:           SITE_CONFIG.url,
    description:   SITE_CONFIG.description,
    potentialAction: {
      "@type":       "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── BreadcrumbList Schema ────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function buildBreadcrumbSchema(
  items: BreadcrumbItem[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type":   "ListItem",
      position:  index + 1,
      name:      item.name,
      item:      `${SITE_CONFIG.url}${item.href}`,
    })),
  };
}
