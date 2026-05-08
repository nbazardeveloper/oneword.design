import type { Metadata } from "next";
import { generateMetadata as gen } from "@/lib/metadata";

export const metadata: Metadata = gen({
  title: "Terms of Use",
  description:
    "Terms of use for Oneword web design and development services and the use of this website.",
  slug: "/terms",
  keywords: ["terms of use", "website studio terms", "service terms"],
});

export default function TermsPage() {
  return (
    <main className="hero-surface min-h-screen pt-20 pb-20 md:pt-24 md:pb-24">
      <section className="container-xl max-w-3xl">
        <h1 className="text-on-dark">Terms of Use</h1>
        <p className="mt-6 text-lg text-on-dark-muted">
          By using this website, you agree to use it lawfully and only for legitimate business enquiries or informational purposes.
        </p>
        <div className="mt-10 space-y-8 text-on-dark-muted">
          <section>
            <h2 className="text-on-dark">Website content</h2>
            <p className="mt-3">
              All design, copy, branding, and code shown on this site remain the property of Oneword unless otherwise stated. Portfolio examples remain the property of their respective owners where applicable.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">Project discussions</h2>
            <p className="mt-3">
              Contacting through this site does not create a formal client relationship until scope, pricing, and terms are agreed in writing.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">Availability</h2>
            <p className="mt-3">
              Information on this website may be updated, changed, or removed at any time without notice as services and offerings evolve.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">Contact</h2>
            <p className="mt-3">
              For questions about these terms, contact oneworddevstudio@gmail.com.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}