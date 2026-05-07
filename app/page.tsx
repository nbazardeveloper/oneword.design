import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import HowIWork from "@/components/sections/HowIWork";
import Services from "@/components/sections/Services";
import CtaBanner from "@/components/sections/CtaBanner";
import DefaultDemo from "@/components/ui/demo";
import DemoWordcloudChart from "@/components/ui/word-cloud-demo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { JsonLd, buildFaqSchema } from "@/schemas/jsonld";

const Faq       = dynamic(() => import("@/components/sections/Faq"));

const FAQ_ITEMS = [
  {
    question: "How long does it take to build a business website?",
    answer: "Most projects take between 2 and 3 weeks depending on the scope, number of pages, and how quickly feedback is provided. Smaller brochure sites can move faster, while larger custom builds or SEO-heavy projects may take longer.",
  },
  {
    question: "Do you build custom websites or use templates?",
    answer: "I build websites from scratch around your business goals, services, and audience. That means better performance, cleaner design, stronger SEO foundations, and a site that does not look like every other template-based business website.",
  },
  {
    question: "Can you help my website rank better on Google?",
    answer: "Yes. SEO is built into the process from the start through site structure, keyword-focused page content, technical SEO, metadata, speed optimisation, and local search improvements. If you need ongoing growth, monthly SEO support is also available.",
  },
  {
    question: "What do you need from me to get started?",
    answer: "Usually I need a short discovery call, a clear idea of your services, any existing branding or content, and examples of websites you like. If you do not have everything ready, I can help structure the content and guide the process.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqSchema({ items: FAQ_ITEMS })} />
      <Hero
        headline="Your website should attract more clients."
        subheadline="I design and build fast, SEO-optimised websites for businesses serious about growth. Custom-coded from scratch — no templates, no page builders, no compromises."
        ctaPrimary={{
          label:     "Explore My Works",
          href:      "/projects",
          ariaLabel: "Explore our featured projects",
        }}
        ctaSecondary={{
          label:     "Let's Build Something Great",
          href:      "/#contacts",
          ariaLabel: "Get in touch to start a new project",
        }}
      />
      <DemoWordcloudChart />
      <DefaultDemo />
      <HowIWork />
      <Suspense fallback={<div className="section animate-pulse bg-neutral-100 h-40" />}>
        <ScrollReveal delay={80}>
          <Faq items={FAQ_ITEMS} />
        </ScrollReveal>
      </Suspense>
      <Suspense fallback={<div className="section animate-pulse bg-neutral-100 h-32" />}>
        <ScrollReveal delay={0}>
          <CtaBanner />
        </ScrollReveal>
      </Suspense>
    </>
  );
}
