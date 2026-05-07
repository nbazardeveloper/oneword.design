"use client";

/**
 * ScrollReveal — lightweight IntersectionObserver wrapper.
 *
 * Adds class `is-visible` to the inner div once the element enters
 * the viewport. The CSS transition lives in globals.css (.reveal / .reveal.is-visible).
 *
 * Props:
 *   delay   — ms before the class is added after entering view (stagger sibling reveals)
 *   margin  — rootMargin passed to IO; negative value triggers earlier / later
 */

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  margin?: string;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  margin = "0px 0px -80px 0px",
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the user prefers reduced motion, reveal immediately without animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => el.classList.add("is-visible"), delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.08, rootMargin: margin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, margin]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
