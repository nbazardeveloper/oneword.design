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
      className="section bg-white"
    >
      <div className="container-xl max-w-3xl">
        <div className="text-center mb-12">
          <h2 id="faq-heading" className="mb-4">Frequently asked questions</h2>
          <p className="text-neutral-500">
            Everything you need to know about the starter.
          </p>
        </div>

        <dl className="divide-y divide-neutral-200">
          {items.map((item, index) => {
            const isOpen    = openIndex === index;
            const panelId   = `faq-panel-${index}`;
            const triggerId = `faq-trigger-${index}`;

            return (
              <div key={index}>
                <dt>
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between py-5 text-left
                               text-neutral-900 font-semibold text-base
                               hover:text-brand-600 transition-colors duration-150
                               focus-visible:outline-none focus-visible:text-brand-600"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`ml-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
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
                  className="pb-5"
                >
                  <p className="text-neutral-500 leading-relaxed text-sm">
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