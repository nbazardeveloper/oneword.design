import type { Metadata } from "next";
import { generateMetadata as gen } from "@/lib/metadata";
import Services from "@/components/sections/Services";

export const metadata: Metadata = gen({
  title: "Pricing — Web Development Packages",
  description:
    "Transparent pricing for web development. Starter from $800, Growth from $1,500, Full-Service from $2,500. No hidden fees, no templates — custom code only.",
  slug: "/pricing",
  keywords: ["web design pricing", "website cost", "web development packages", "custom website price"],
});

export default function PricingPage() {
  return <Services />;
}
