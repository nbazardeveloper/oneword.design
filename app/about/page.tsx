import type { Metadata } from "next";
import { generateMetadata as gen } from "@/lib/metadata";
import { JsonLd, buildOrganizationSchema } from "@/schemas/jsonld";
import { SITE_CONFIG } from "@/lib/config";

export const metadata: Metadata = gen({
  title:       "About Us",
  description: `Learn about ${SITE_CONFIG.name}, our mission to help developers ship faster, and the team behind the world's best Next.js SEO starter.`,
  slug:        "/about",
  keywords:    ["about us", "team", "mission", "Next.js SEO starter"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildOrganizationSchema({
          description: `${SITE_CONFIG.name} builds developer tools for Next.js teams.`,
          foundingDate: "2024",
        })}
      />

      <main className="section container-xl">
        <h1 className="mb-4">About {SITE_CONFIG.name}</h1>
        <p className="text-lg text-neutral-500 max-w-prose">
          We build tools that help developers ship production-ready Next.js
          applications faster — without sacrificing performance, SEO, or
          accessibility.
        </p>
      </main>
    </>
  );
}