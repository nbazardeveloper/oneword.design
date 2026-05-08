"use client";

import { useEffect, useRef, useState } from "react";
import { WordcloudChart } from "@/components/ui/word-cloud";

export default function DemoWordcloudChart() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateWidth = () => {
      setChartWidth(Math.max(320, Math.floor(node.clientWidth)));
    };

    updateWidth();

    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-surface w-full py-16 md:py-24">
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
            SEO Focus
          </p>
          <h2
            className="text-balance font-bold tracking-tight text-on-dark"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              lineHeight: 1.08,
            }}
          >
            Built around the terms your
            <span style={{ color: "var(--color-brand-acid)" }}> clients search.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-on-dark-muted md:text-lg">
            The strategy starts with search intent, service positioning, and the language that drives qualified traffic.
          </p>
        </div>

        <div ref={containerRef} className="flex flex-col items-center justify-center">
          {chartWidth > 0 ? <WordcloudChart width={chartWidth} height={420} showControls /> : null}
        </div>
      </div>
    </section>
  );
}