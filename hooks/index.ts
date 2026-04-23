// ─── SEO & Metadata Types ─────────────────────────────────────────────────────

export interface SeoMetadataProps {
  title: string;
  description: string;
  slug?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noIndex?: boolean;
  noFollow?: boolean;
  publishedAt?: string;
  modifiedAt?: string;
  authors?: string[];
  keywords?: string[];
}

export interface OpenGraphData {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: OgImage[];
  type: string;
  locale: string;
}

export interface OgImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

// ─── JSON-LD Schema Types ─────────────────────────────────────────────────────

export interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  email?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: { latitude: number; longitude: number };
  openingHours?: string[];
  priceRange?: string;
  image?: string;
  logo?: string;
  sameAs?: string[];
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description?: string;
  foundingDate?: string;
  numberOfEmployees?: number;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType: string;
    availableLanguage?: string[];
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchema {
  items: FAQItem[];
}

// ─── Component Prop Types ─────────────────────────────────────────────────────

export interface HeroProps {
  headline: string;
  subheadline: string;
  ctaPrimary: CtaButton;
  ctaSecondary?: CtaButton;
  image: HeroImage;
  badge?: string;
  stats?: StatItem[];
}

export interface CtaButton {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface HeroImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface StatItem {
  value: string;
  label: string;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isExternal?: boolean;
  ariaLabel?: string;
}

// ─── Web Vitals ───────────────────────────────────────────────────────────────

export type WebVitalMetric = {
  id: string;
  name: "CLS" | "FID" | "FCP" | "LCP" | "TTFB" | "INP";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  label: "web-vital" | "custom";
};
