// ─── Site Configuration ───────────────────────────────────────────────────────
// Single source of truth for all site-wide constants.
// Never hardcode these values in components.

export const SITE_CONFIG = {
  name:        "Oneword",
  tagline:     "Ship faster. Rank higher. Convert better.",
  description: "The production-ready Next.js starter built for Lighthouse 100, Advanced SEO, and clean architecture. Start with the best.",
  url:         process.env.NEXT_PUBLIC_SITE_URL ?? "https://oneword.design",
  locale:      "en_US",
  language:    "en",
  themeColor:  "#6366f1",

  // Social handles (without @)
  social: {
    twitter:   "yourbrand",
    github:    "yourbrand",
    linkedin:  "company/yourbrand",
    instagram: "yourbrand",
  },

  // Default OG image (absolute URL)
  defaultOgImage: "/og/default.jpg",
  ogImageWidth:   1200,
  ogImageHeight:  630,

  // Google / Analytics (use env vars in production)
  gtmId:   process.env.NEXT_PUBLIC_GTM_ID   ?? "",
  gaId:    process.env.NEXT_PUBLIC_GA_ID    ?? "",
  pixelId: process.env.NEXT_PUBLIC_PIXEL_ID ?? "",

  // Contact
  email:     "info@oneword.designs",
  telephone: "+1 (555) 000-0000",
} as const;

// ─── SEO Limits ───────────────────────────────────────────────────────────────
export const SEO_LIMITS = {
  titleMin:       10,
  titleMax:       60,
  descriptionMin: 50,
  descriptionMax: 160,
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Features",  href: "/#features"  },
  { label: "Pricing",   href: "/pricing"    },
  { label: "Blog",      href: "/blog"       },
  { label: "About",     href: "/about"      },
] as const;

// ─── Footer Links ─────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  product:  [
    { label: "Features", href: "/#features" },
    { label: "Pricing",  href: "/pricing"   },
    { label: "Changelog",href: "/changelog" },
    { label: "Roadmap",  href: "/roadmap"   },
  ],
  company: [
    { label: "About",    href: "/about"    },
    { label: "Blog",     href: "/blog"     },
    { label: "Careers",  href: "/careers"  },
    { label: "Press",    href: "/press"    },
  ],
  legal: [
    { label: "Privacy",  href: "/privacy"  },
    { label: "Terms",    href: "/terms"    },
    { label: "Cookies",  href: "/cookies"  },
  ],
} as const;
