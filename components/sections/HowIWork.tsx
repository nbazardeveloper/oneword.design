"use client";

/**
 * HowIWork — Stacking Cards
 *
 * Architecture (exact):
 *  1. TRACK   — <section ref> h-[500vh] relative   → provides scroll runway
 *  2. VIEWPORT — sticky top-0 h-screen overflow-hidden → "camera" stays fixed
 *  3. STACK    — cards are absolute inside viewport, z-index ascending
 *
 * Animation (Framer Motion useScroll on TRACK):
 *  - Each card (except first) slides in from y:"100vh" → y:0
 *  - Each card scales down + dims progressively as more cards stack on top
 *
 * Scroll segments (5 cards, 4 entrances):
 *   Card 2 enters  0.00 → 0.20   Card 1 starts scaling
 *   Card 3 enters  0.20 → 0.40   Card 2 starts scaling
 *   Card 4 enters  0.40 → 0.60   Card 3 starts scaling
 *   Card 5 enters  0.60 → 0.80   Card 4 starts scaling
 *   0.80 → 1.00   hold final stacked state
 */

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    body: "We talk for 30 min. I learn your goals, audience, timeline, and what success looks like.",
    bg: "var(--color-brand-dark)",
    textPrimary: "var(--color-text-on-dark)",
    textSecondary: "rgba(240,237,229,0.55)",
    numGhost: "rgba(240,237,229,0.06)",
    accent: "var(--color-brand-acid)",
  },
  {
    number: "02",
    title: "Proposal & Timeline",
    body: "Clear scope, fixed price, exact delivery date. No hidden costs, no vague estimates.",
    bg: "var(--color-brand-dark-2)",
    textPrimary: "var(--color-text-on-dark)",
    textSecondary: "rgba(240,237,229,0.55)",
    numGhost: "rgba(240,237,229,0.05)",
    accent: "var(--color-brand-acid)",
  },
  {
    number: "03",
    title: "Design & Development",
    body: "Hand-coded from scratch — fast, accessible, pixel-perfect. Weekly progress updates.",
    bg: "var(--color-brand-dark-deep)",
    textPrimary: "var(--color-text-on-dark)",
    textSecondary: "rgba(240,237,229,0.55)",
    numGhost: "rgba(240,237,229,0.04)",
    accent: "var(--color-brand-acid)",
  },
  {
    number: "04",
    title: "Review & Refine",
    body: "Two revision rounds included. Your feedback shapes the final product.",
    bg: "var(--color-brand-dark-2)",
    textPrimary: "var(--color-text-on-dark)",
    textSecondary: "rgba(240,237,229,0.55)",
    numGhost: "rgba(240,237,229,0.05)",
    accent: "var(--color-brand-acid)",
  },
  {
    number: "05",
    title: "Launch & Handoff",
    body: "I deploy, configure analytics, and hand over everything. Full docs included.",
    bg: "var(--color-brand-acid)",
    textPrimary: "var(--color-brand-dark-deep)",
    textSecondary: "rgba(15,20,25,0.6)",
    numGhost: "rgba(15,20,25,0.06)",
    accent: "var(--color-brand-dark-deep)",
  },
] as const;

const N = STEPS.length; // 5

/* ─── Card positions inside the sticky viewport ─────────────────────────── */
// Each card's final resting `top` value when fully stacked.
// Peek = how many vh of the previous card remain visible above the current one.
// With N=5, CARD_H=52vh, PEEK=11vh: last card top = 4 + 4×11 = 48vh, bottom = 100vh ✓
const CARD_H   = "52vh";
const CARD_TOPS = ["4vh", "15vh", "26vh", "37vh", "48vh"] as const;

/* ─── Per-card scroll segments ───────────────────────────────────────────── */
// progress ∈ [0,1] across the 500vh track
// Each entrance uses a 0.2 slot; final 0.2 holds the stacked state
const SEG = 0.2; // width of each entrance segment

function getEnterRange(index: number): [number, number] {
  if (index === 0) return [0, 0]; // first card is already visible
  return [(index - 1) * SEG, index * SEG];
}

/* ─── Single animated card ───────────────────────────────────────────────── */

interface CardProps {
  step: (typeof STEPS)[number];
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function StackCard({ step, index, progress }: CardProps) {
  const isFirst = index === 0;
  const isLast  = index === N - 1;

  // ── Y entrance ─────────────────────────────────────────────────────────
  const [enterStart, enterEnd] = getEnterRange(index);

  // Raw scroll-derived y (entrance from bottom)
  const rawY = useTransform(
    progress,
    isFirst ? [0, 1] : [enterStart, enterEnd],
    isFirst ? ["0vh", "0vh"] : ["100vh", "0vh"],
  );

  // Spring-smoothed y — low stiffness = silky entrance, no jitter
  const y = useSpring(rawY, { stiffness: 55, damping: 22, mass: 0.6 });

  // ── Progressive scale ───────────────────────────────────────────────────
  const scaleInputs  = Array.from({ length: N + 1 }, (_, j) => j * SEG);
  const scaleOutputs = Array.from({ length: N + 1 }, (_, j) => {
    const cardsOnTop = Math.max(0, j - index);
    return Math.max(0.82, 1 - cardsOnTop * 0.045);
  });

  const rawScale = useTransform(
    progress,
    isLast ? [0, 1] : scaleInputs,
    isLast ? [1, 1] : scaleOutputs,
  );

  // Spring-smoothed scale — slightly stiffer so depth feels responsive
  const scale = useSpring(rawScale, { stiffness: 70, damping: 24, mass: 0.5 });

  // ── Progressive dim ─────────────────────────────────────────────────────
  const dimOutputs = Array.from({ length: N + 1 }, (_, j) => {
    const cardsOnTop = Math.max(0, j - index);
    return Math.min(0.5, cardsOnTop * 0.08);
  });

  const dim = useTransform(
    progress,
    isLast ? [0, 1] : scaleInputs,
    isLast ? [0, 0] : dimOutputs,
  );

  return (
    <motion.div
      style={{
        position:        "absolute",
        top:             CARD_TOPS[index],
        left:            0,
        width:           "100%",
        height:          CARD_H,
        zIndex:          (index + 1) * 10,
        y,
        scale,
        transformOrigin: "top center",
        // Force GPU compositing layer — eliminates paint on every frame
        willChange:      "transform",
      }}
    >
      {/* Card shell — full width, rounded, bordered */}
      <div
        className="relative w-full h-full overflow-hidden"
        style={{ background: step.bg }}
      >
        {/* Depth dim overlay */}
        <motion.div
          style={{ opacity: dim, willChange: "opacity" }}
          className="pointer-events-none absolute inset-0 z-20 bg-black"
        />

        {/* Ghost background number — right side, clipped by overflow-hidden */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[3vw] top-1/2 -translate-y-1/2
                     font-bold leading-none"
          style={{
            fontSize:      "clamp(10rem, 24vw, 20rem)",
            letterSpacing: "-0.05em",
            color:         step.numGhost,
          }}
        >
          {step.number}
        </span>

        {/* ── Content — aligned with site container ── */}
        <div className="container-xl relative z-10 h-full flex items-center py-8 md:py-10">

          {/* Title + description */}
          <div>
            <p
              className="mb-1 select-none"
              style={{
                fontSize:      "10px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color:         step.textSecondary,
              }}
            >
              Step {step.number}
            </p>
            <h3
              className="font-bold tracking-tight"
              style={{
                fontSize:    "clamp(2.75rem, 7vw, 6rem)",
                lineHeight:  1.1,
                color:       step.textPrimary,
                marginBottom: "0.6rem",
                maxWidth:    "100%",
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize:  "clamp(0.875rem, 1.2vw, 1rem)",
                lineHeight: 1.65,
                color:     step.textSecondary,
                maxWidth:  "50ch",
              }}
            >
              {step.body}
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export default function HowIWork() {
  const trackRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    // Outer wrapper carries the background so the header above the track
    // matches the track color seamlessly
    <div style={{ background: "var(--color-brand-dark-deep)" }}>

      {/* ── Section header — normal document flow, above the track ── */}
      <div className="container-xl pt-24 md:pt-32 pb-16 md:pb-20">
        <p
          className="mb-5 flex items-center gap-2.5 select-none"
          aria-hidden="true"
          style={{
            fontSize:      "11px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color:         "rgba(255,255,255,0.32)",
          }}
        >
          <span
            style={{
              display:      "inline-block",
              height:       "1px",
              width:        "28px",
              background:   "var(--color-brand-acid)",
              borderRadius: "99px",
              flexShrink:   0,
            }}
          />
          How I Work
        </p>

        <h2
          className="font-bold tracking-tight text-white"
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1.08,
          }}
        >
          A process built for{" "}
          <span style={{ color: "var(--color-brand-acid)" }}>results.</span>
        </h2>
      </div>

      {/* ── 1. TRACK — 500vh scroll runway ── */}
      {/* position:relative via inline style — Framer Motion reads this before Tailwind paints */}
      <section ref={trackRef} style={{ position: "relative", width: "100%", height: "500vh" }}>

        {/* ── 2. VIEWPORT — sticky "camera", h-screen, clips overflow ── */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* ── 3. STACK — cards absolutely positioned, z-index ascending ── */}
          {STEPS.map((step, i) => (
            <StackCard
              key={step.number}
              step={step}
              index={i}
              progress={scrollYProgress}
            />
          ))}

        </div>
      </section>

      {/* Small buffer so the section after doesn't abruptly follow the track */}
      <div style={{ height: "4rem", background: "var(--color-brand-dark-deep)" }} />

    </div>
  );
}
