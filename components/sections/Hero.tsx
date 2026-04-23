"use client";

import Image from "next/image";
import Link  from "next/link";
import type { HeroProps } from "@/types";

// ─── Hero Component ───────────────────────────────────────────────────────────
/**
 * Hero
 *
 * Above-the-fold section. Strictly follows:
 * - next/image with priority=true for LCP optimisation
 * - ARIA landmarks and semantic HTML for A11y
 * - Tailwind CSS only (no inline styles)
 * - Mandatory sizes prop on every next/image
 *
 * @example
 * <Hero
 *   headline="Build faster. Rank higher."
 *   subheadline="..."
 *   ctaPrimary={{ label: "Get started", href: "/signup" }}
 *   image={{ src: "/hero.webp", alt: "...", width: 1200, height: 800 }}
 * />
 */
export default function Hero({
  headline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  image,
  badge,
  stats,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-white"
    >
      {/* ── Background Decoration ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem]
                     -translate-x-1/2 rotate-[30deg]
                     bg-gradient-to-tr from-brand-300 to-accent-400
                     opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="container-xl section">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">

          {/* ── Left column: text ─────────────────────────────────────── */}
          <div className="flex flex-col items-start gap-6 animate-fade-up">

            {/* Badge */}
            {badge && (
              <div
                className="badge-brand"
                aria-label={`Status: ${badge}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                {badge}
              </div>
            )}

            {/* Headline — h1 for SEO; id for aria-labelledby on <section> */}
            <h1
              id="hero-heading"
              className="text-balance text-5xl font-bold tracking-tight
                         text-neutral-950 sm:text-6xl lg:text-7xl
                         font-[family-name:var(--font-jakarta)]"
            >
              {/* Highlight first portion with gradient */}
              {headline.split(".").length > 1 ? (
                <>
                  <span className="gradient-text">{headline.split(".")[0]}.</span>
                  <br />
                  {headline.split(".").slice(1).join(".").trim()}
                </>
              ) : (
                headline
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-pretty text-lg text-neutral-500 leading-relaxed max-w-prose-lg">
              {subheadline}
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap gap-3 pt-2"
              role="group"
              aria-label="Call to action buttons"
            >
              <Link
                href={ctaPrimary.href}
                className="btn-primary btn-lg"
                aria-label={ctaPrimary.ariaLabel ?? ctaPrimary.label}
              >
                {ctaPrimary.label}
                {/* Arrow icon */}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="btn-secondary btn-lg"
                  aria-label={ctaSecondary.ariaLabel ?? ctaSecondary.label}
                  {...(ctaSecondary.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {ctaSecondary.label}
                </Link>
              )}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <dl
                className="flex flex-wrap gap-6 pt-4 border-t border-neutral-200 w-full"
                aria-label="Key metrics"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <dt className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl font-bold text-neutral-900 font-[family-name:var(--font-jakarta)]">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* ── Right column: image ───────────────────────────────────── */}
          <div
            className="relative animate-fade-up animation-delay-200"
            aria-hidden="false"   // Image contains meaningful content
          >
            {/* Decorative glow behind image */}
            <div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br
                         from-brand-100 to-accent-100 blur-2xl opacity-60 -z-10
                         scale-95"
              aria-hidden="true"
            />

            {/* ── next/image: mandatory for LCP optimisation ─────────── */}
            {/* priority=true: marks this as an LCP candidate → preloaded */}
            {/* sizes: critical for responsive bandwidth efficiency       */}
            <Image
              src={image.src}
              alt={image.alt}       // Mandatory descriptive alt text
              width={image.width}
              height={image.height}
              priority              // ← preload: directly improves LCP score
              quality={85}          // Balance quality vs file size
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              className="w-full h-auto rounded-2xl shadow-card-lg
                         ring-1 ring-neutral-200 object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />

            {/* Floating badge — decorative */}
            <div
              className="absolute -bottom-4 -left-4 flex items-center gap-2
                         bg-white rounded-xl px-4 py-2.5 shadow-card-lg
                         border border-neutral-100 animate-fade-up animation-delay-400"
              aria-label="Lighthouse performance score: 100"
              role="img"
            >
              <span className="text-2xl" aria-hidden="true">⚡</span>
              <div>
                <p className="text-xs text-neutral-400 font-medium">Lighthouse</p>
                <p className="text-sm font-bold text-neutral-900">Score: 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom gradient fade ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-24
                   bg-gradient-to-t from-neutral-50 to-transparent"
      />
    </section>
  );
}

// ─── Placeholder blur data URL ────────────────────────────────────────────────
// In production, generate this per-image using plaiceholder or sharp.
// This prevents a layout shift while the image loads.
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACMQAAIBBAIDAQAAAAAAAAAAAAECAwAEBREhBhITMVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Ams3rW6xuuNW6OLaQICPJHPlS21orjy2wT55qPdCwvr6GGCJpJJWCqo8k0UUUqb//2Q==";
