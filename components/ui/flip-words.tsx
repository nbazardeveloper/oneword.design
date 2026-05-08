"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  phrases: string[];
  className?: string;
  duration?: number;
}

export default function FlipWords({
  phrases,
  className,
  duration = 2200,
}: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  // Track whether the first phrase has already been shown.
  // On first paint we skip the entrance animation so Lighthouse
  // sees the LCP text immediately — no opacity:0 blocking paint.
  const [hasFlipped, setHasFlipped] = useState(false);

  useEffect(() => {
    if (phrases.length <= 1) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
      setHasFlipped(true);
    }, duration);

    return () => window.clearInterval(interval);
  }, [duration, phrases]);

  if (phrases.length === 0) return null;

  return (
    <span className="relative inline-block min-w-0 align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          // First phrase: visible immediately (critical for LCP).
          // Subsequent flips: use the blur-up entrance animation.
          initial={hasFlipped ? { opacity: 0, y: 10, filter: "blur(8px)" } : false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{
            y:      { type: "spring", stiffness: 420, damping: 28 },
            opacity: { duration: 0.2 },
            filter:  { duration: 0.25 },
          }}
          className={cn("inline-block text-wrap", className)}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
