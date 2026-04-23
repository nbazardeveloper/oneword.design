"use client";

import Link from "next/link";

export default function CtaBanner() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="section bg-brand-600"
    >
      <div className="container-xl text-center">
        <h2
          id="cta-heading"
          className="text-white mb-4 text-4xl font-bold"
        >
          Ready to ship your best product?
        </h2>
        <p className="text-brand-200 text-lg mb-8 max-w-xl mx-auto">
          Clone, configure, and deploy a Lighthouse-100 Next.js site in under
          10 minutes. No compromises.
        </p>
        <div
          className="flex flex-wrap justify-center gap-4"
          role="group"
          aria-label="Sign up options"
        >
          <Link
            href="/signup"
            className="btn bg-white text-brand-600 hover:bg-brand-50
                       btn-lg font-bold shadow-lg hover:shadow-xl
                       transition-all duration-200"
            aria-label="Get started for free"
          >
            Get started — it's free
          </Link>
          <Link
            href="/docs"
            className="btn border-2 border-white/30 text-white
                       hover:bg-white/10 btn-lg"
            aria-label="Read the documentation"
          >
            Read the docs
          </Link>
        </div>
      </div>
    </section>
  );
}