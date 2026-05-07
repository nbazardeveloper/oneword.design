"use client";

import { useState } from "react";
import type { FAQItem } from "@/types";

interface FaqProps {
  items: FAQItem[];
}

export default function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="section hero-surface"
    >
      <div className="container-xl">
        <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p
            className="mb-5 flex items-center justify-center gap-2.5 select-none text-on-dark-faint"
            aria-hidden="true"
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            <span
              style={{
                display: "inline-block",
                height: "1px",
                width: "28px",
                background: "var(--color-brand-acid)",
                borderRadius: "99px",
                flexShrink: 0,
              }}
            />
            Frequently Asked Questions
          </p>
          <h2
            id="faq-heading"
            className="text-balance font-bold tracking-tight text-on-dark"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.08,
            }}
          >
            Clear answers before we
            <span style={{ color: "var(--color-brand-acid)" }}> build.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-dark-muted md:text-lg">
            Everything important is laid out upfront so timelines, scope, and next steps stay obvious.
          </p>
        </div>

        <dl className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm">
          {items.map((item, index) => {
            const isOpen    = openIndex === index;
            const panelId   = `faq-panel-${index}`;
            const triggerId = `faq-trigger-${index}`;

            return (
              <div key={index} className={index !== 0 ? "border-t border-white/10" : undefined}>
                <dt>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left text-base font-semibold text-on-dark transition-colors duration-150 hover:text-brand-acid focus-visible:outline-none focus-visible:text-brand-acid md:px-8 md:py-7 md:text-lg"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`ml-4 shrink-0 text-on-dark-faint transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>
                </dt>
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className="px-6 pb-6 md:px-8 md:pb-7"
                >
                  <p className="max-w-3xl text-sm leading-relaxed text-on-dark-muted md:text-base">
                    {item.answer}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}