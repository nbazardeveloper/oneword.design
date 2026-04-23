"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import { JsonLd, buildFaqSchema } from "@/schemas/jsonld";

const Features  = dynamic(() => import("@/components/sections/Features"));
const Faq       = dynamic(() => import("@/components/sections/Faq"));
const CtaBanner = dynamic(() => import("@/components/sections/CtaBanner"), { ssr: false });

const FAQ_ITEMS = [
  {
    question: "How does this Next.js starter achieve Lighthouse 100?",
    answer: "By combining next/font for zero layout shift, next/image for optimal LCP, dynamic imports for code splitting, lazyOnload scripts for third-parties, and Tailwind CSS for minimal CSS footprint.",
  },
  {
    question: "Is TypeScript required?",
    answer: "Yes. All components use strict TypeScript for type safety, better DX, and fewer runtime errors in production.",
  },
  {
    question: "How is the SEO metadata managed?",
    answer: "A centralized generateMetadata() function handles titles, descriptions, canonical URLs, OpenGraph, Twitter Cards, and robots directives from a single call per page.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqSchema({ items: FAQ_ITEMS })} />
      <Hero
        badge="Production Ready"
        headline="Build faster. Rank higher."
        subheadline="A Next.js 14 starter engineered for Lighthouse 100, advanced SEO, and clean architecture. Ship your best product from day one."
        ctaPrimary={{ label: "Get Started Free", href: "/signup", ariaLabel: "Get started with a free account" }}
        ctaSecondary={{ label: "View on GitHub", href: "https://github.com", ariaLabel: "View source code on GitHub" }}
        image={{
          src:    "/images/hero.webp",
          alt:    "Dashboard preview of the Next.js SEO starter",
          width:  1200,
          height: 800,
        }}
        stats={[
          { value: "100",   label: "Lighthouse Score" },
          { value: "<50ms", label: "TTFB"             },
          { value: "A11y",  label: "WCAG 2.1 AA"      },
        ]}
      />
      <Features />
      <Faq items={FAQ_ITEMS} />
      <CtaBanner />
    </>
  );
}