"use client";

/**
 * LenisProvider — global smooth scrolling
 *
 * Lenis 1.3 drives the RAF loop itself (autoRaf: true is the default).
 * It scrolls the document natively (window.scrollY keeps real values),
 * so Framer Motion's useScroll works without any extra bridging.
 *
 * Integration notes:
 *  - duration / easing control the feel of the scroll lerp
 *  - touchMultiplier: 1 keeps mobile momentum natural
 *  - wheelMultiplier: 1 avoids over-acceleration on trackpads
 *  - The `lenis` instance is stored on `window.__lenis` for debugging
 */

import Lenis from "lenis";
import { useEffect } from "react";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.25,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
      smoothWheel:     true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite:        false,
    });

    // Expose for devtools / external control
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    // Drive RAF manually so we can cancel it cleanly on unmount
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
