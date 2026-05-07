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

  useEffect(() => {
    if (phrases.length <= 1) return;

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, duration);

    return () => window.clearInterval(interval);
  }, [duration, phrases]);

  if (phrases.length === 0) {
    return null;
  }

  return (
    <span className="relative inline-block min-w-0 align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{
            y: { type: "spring", stiffness: 420, damping: 28 },
            opacity: { duration: 0.2 },
            filter: { duration: 0.25 },
          }}
          className={cn("inline-block text-wrap", className)}
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}