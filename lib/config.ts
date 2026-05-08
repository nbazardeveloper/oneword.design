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
  defaultOgImage: "/images/projects/oneword-project-beauty-websitemobil.webp",
  ogImageWidth:   1200,
  ogImageHeight:  630,

  // Google / Analytics (use env vars in production)
  gtmId:   process.env.NEXT_PUBLIC_GTM_ID   ?? "",
  gaId:    process.env.NEXT_PUBLIC_GA_ID    ?? "",
  pixelId: process.env.NEXT_PUBLIC_PIXEL_ID ?? "",

  // Contact
  email:     "oneworddevstudio@gmail.com",
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
  { label: "Projects", href: "/projects" },
  { label: "Pricing",  href: "/pricing"  },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/#contacts" },
] as const;

// ─── Footer Links ─────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  product:  [
    { label: "Projects", href: "/projects" },
    { label: "Pricing",  href: "/pricing"  },
    { label: "Contact",  href: "/#contacts" },
  ],
  company: [
    { label: "About",    href: "/about"    },
    { label: "Projects", href: "/projects" },
    { label: "Contact",  href: "/#contacts" },
  ],
  legal: [
    { label: "Privacy",  href: "/privacy"  },
    { label: "Terms",    href: "/terms"    },
    { label: "Cookies",  href: "/cookies"  },
  ],
} as const;
