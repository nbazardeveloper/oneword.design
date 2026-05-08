/**
 * Hero — двухколоночный + мобиль-оптимизированный макет
 *
 * ┌─ Mobile (одна колонка, thumb-first) ─────────────────────┐
 * │  1. H1 + подзаголовок        ← сначала читают            │
 * │  2. Портрет с подписью       ← визуальная идентификация   │
 * │  3. CTA-кнопки               ← нижняя треть → thumb zone  │
 * └───────────────────────────────────────────────────────────┘
 *
 * ┌─ Desktop (две колонки) ──────────────────────────────────┐
 * │  Col 1 Row 1: H1 + подзаголовок                          │
 * │  Col 1 Row 2: CTA-кнопки                                 │
 * │  Col 2 Row 1-2: Портрет (span 2 rows, выровнен по центру)│
 * └───────────────────────────────────────────────────────────┘
 *
 * CSS:
 *   .signature-text  — legibility fix (stroke, GPU layer, letter-spacing)
 *   .btn-hero-ghost  — WCAG 1.4.11 border fix (контраст ≥ 3:1)
 *   .portrait-card   — CSS-only hover lift/tilt
 *   .hero-noise      — SVG-шум через ::before
 * Safe area:
 *   viewportFit=cover  → layout.tsx
 *   paddingTop: env(safe-area-inset-top) → Header.tsx
 */

import Link             from "next/link";
import Image            from "next/image";
import { Dancing_Script } from "next/font/google";
import type { HeroProps } from "@/types";
import HeroTechBand     from "@/components/sections/HeroTechBand";
import FlipWords        from "@/components/ui/flip-words";
import ContactLink      from "@/components/ui/ContactLink";

const signature = Dancing_Script({
  subsets: ["latin"],
  weight:  ["700"],
  display: "optional",
});

export default function Hero({
  subheadline,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  const phrases = [
    "generate more leads",
    "close more sales",
    "scale your brand",
    "outperform competitors",
  ];

  return (
    <section className="hero-noise relative flex min-h-screen flex-col overflow-hidden bg-brand-dark">

      {/* ═══════════════════════ КОНТЕНТ ════════════════════════ */}
      {/*
        Золотая треть: pt = высота хедера (h-20 = 80px) + минимальный буфер.
        pb сбалансирован с pt, чтобы flex items-center давал истинный вертикальный центр.
        Результат: визуальный центр контента ≈ 38–42% высоты экрана.
      */}
      <div className="relative z-10 flex-1 flex items-center pt-28 md:pt-20 pb-16 md:pb-20">

        {/*
          container-xl → max-width 80rem + padding 1rem/1.5rem/2rem
          Зеркалит Header nav.container-xl → идеальная вертикальная сетка.
          Трёхэлементная сетка:
          Мобиль   — grid-cols-1, визуальный порядок через order-1/2/3
          Desktop  — grid-cols-[text | portrait], portrait span 2 rows
        */}
        <div className="container-xl grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-y-8 lg:gap-y-5 lg:gap-x-16 xl:gap-x-24">

          {/* ────────────── ① TEXT BLOCK ────────────── */}
          {/* Mobile: order 1 (top) | Desktop: col 1, row 1 */}
          <div className="order-1 flex flex-col items-start">

            {/*
              Eyebrow — якорит верхнюю зону, выстраивает F-pattern иерархию.
              Заполняет «мёртвое» пространство между хедером и заголовком.
              aria-hidden: декоративный элемент, не нужен скринридерам.
            */}
            <p
              className="hero-enter mb-5 flex items-center gap-2.5 select-none text-on-dark-faint"
              aria-hidden="true"
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                animationDelay: "0ms",
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
              Web Development Studio
            </p>

            <h1
              className="hero-enter font-bold text-on-dark tracking-tight"
              style={{ lineHeight: 1.05, animationDelay: "100ms" }}
            >
              <span aria-hidden="true" className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem]">
                Your website should
              </span>
              <FlipWords
                phrases={phrases}
                className="mt-[0.05em] block max-w-[13ch] text-4xl font-inherit leading-[1.05] text-[color:var(--color-brand-acid)] sm:max-w-none sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem]"
              />
              <span className="sr-only">Your website should generate more leads, close more sales, scale your brand, or outperform competitors.</span>
            </h1>

            {/* Условный рендер — пустая строка не создаёт призрачный mt-отступ */}
            {subheadline && (
              <p
                className="hero-enter mt-5 md:mt-7 text-base md:text-lg leading-relaxed max-w-[44ch] text-on-dark-muted"
                style={{ animationDelay: "240ms" }}
              >
                {subheadline}
              </p>
            )}

          </div>

          {/* ────────────── ② PORTRAIT ────────────── */}
          {/*
            Mobile: order 2 (middle) — after text, before CTA
            Desktop: col 2, row 1-2 (row-span-2), self-center
            lg:col-start-2 lg:row-start-1 lg:row-span-2 → spans both text+CTA rows
          */}
          <div
            className="
              hero-enter-right
              order-2 flex flex-col items-center
              lg:col-start-2 lg:row-start-1 lg:row-span-2
              lg:items-end lg:self-center
            "
            style={{ animationDelay: "150ms" }}
          >

            {/*
              Роспись «Nazgul»
              .signature-text CSS class добавляет:
                -webkit-text-stroke, paint-order, dual text-shadow,
                translateZ(0) + backface-visibility (GPU layer → no iOS blur),
                letter-spacing: 0.015em (cursive breathing room)
              fontSize: clamp(2.75rem, 8vw, 4.5rem) → ≥44px на смартфоне
              marginBottom: -0.55rem → роспись немного заходит на рамку
              zIndex: 10 → поверх acid-border рамки
            */}
            <span
              className={`${signature.className} signature-text`}
              aria-hidden="true"
              style={{
                fontSize:     "clamp(2.75rem, 8vw, 4.5rem)",
                lineHeight:   1,
                color:        "var(--color-brand-acid)",
                display:      "inline-block",
                marginBottom: "-0.55rem",
                position:     "relative",
                zIndex:       10,
              }}
            >
              Nazgul
            </span>

            {/*
              Портретный слот — 3:4, acid-рамка, адаптивный maxWidth
              .portrait-card → CSS-only hover lift (globals.css)
              @media (hover: none) отключает transform на touch — нет «прилипания»
            */}
            <div
              className="portrait-card relative w-full max-w-[200px] sm:max-w-[240px] lg:max-w-[300px] xl:max-w-[320px] rounded-2xl"
              style={{
                aspectRatio: "3/4",
                border:      "2px solid var(--color-brand-acid)",
              }}
            >
              {/* Acid glow за рамкой */}
              <div
                aria-hidden="true"
                style={{
                  position:     "absolute",
                  inset:        "-2rem",
                  borderRadius: "1.5rem",
                  background:
                    "radial-gradient(ellipse at center, rgba(207,245,71,0.08) 0%, rgba(15,91,69,0.22) 45%, transparent 70%)",
                  filter: "blur(20px)",
                  zIndex: 0,
                }}
              />

              {/* Контейнер изображения */}
              <div
                className="relative w-full h-full rounded-[calc(1rem-2px)] overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #1c2a25 0%, #0e1d18 45%, #08130f 100%)",
                  zIndex:     1,
                }}
              >
                {/*
                  next/image handles WebP conversion, retina srcSet,
                  and LCP priority automatically — no manual <picture> needed.
                  priority prop = fetchPriority="high" + preload link in <head>.
                  fill + object-cover replaces the absolute-inset pattern.
                */}
                <Image
                  src="/images/developer.webp"
                  alt="Nazgul — your personal developer"
                  fill
                  priority
                  sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 320px"
                  className="object-cover grayscale transition-[filter] duration-700 hover:grayscale-0"
                />

                {/* Световые блики */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 65% 55% at 55% 28%, rgba(255,255,255,0.05) 0%, transparent 65%), " +
                      "radial-gradient(ellipse 35% 25% at 55% 15%, rgba(255,255,255,0.03) 0%, transparent 55%)",
                    zIndex: 2,
                  }}
                />

                {/* Нижний виньет */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40%]"
                  style={{
                    background: "linear-gradient(to top, rgba(8,19,15,0.85) 0%, transparent 100%)",
                    zIndex: 2,
                  }}
                />
              </div>
            </div>

            {/* Подпись под фото */}
            <span
              className="mt-4 block text-center lg:text-right text-on-dark-soft"
              style={{
                fontSize:      "13px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                userSelect:    "none",
              }}
            >
              your personal developer
            </span>

          </div>

          {/* ────────────── ③ CTA BUTTONS ────────────── */}
          {/*
            Mobile: order 3 — ниже портрета → нижняя треть экрана → thumb zone
            Desktop: col 1, row 2 → под текстом в левой колонке

            Кнопки: w-full на мобиле (< sm) → максимальная hit area
                    sm:w-auto — естественная ширина на планшете+
            flex-col sm:flex-row → стопка на мобиле, строчка на планшете

            Минимальная высота 3.5rem (56px) — выше WCAG 2.5.5 (44px)
          */}
          <div
            className="
              hero-enter
              order-3 flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4
              lg:col-start-1 lg:row-start-2 lg:self-start
            "
            style={{ animationDelay: "380ms" }}
          >

            {/* Primary — acid */}
            {ctaSecondary?.href === "/#contacts" ? (
              <ContactLink
                href={ctaSecondary.href}
                ariaLabel={ctaSecondary.ariaLabel}
                className="btn-hero-acid w-full sm:w-auto justify-center"
              >
                {ctaSecondary.label}
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </ContactLink>
            ) : (
              <Link
                href={ctaSecondary?.href || "#"}
                aria-label={ctaSecondary?.ariaLabel}
                className="btn-hero-acid w-full sm:w-auto justify-center"
              >
                {ctaSecondary?.label}
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            )}

            {/* Secondary — ghost (WCAG border fix в globals.css) */}
            <Link
              href={ctaPrimary.href}
              aria-label={ctaPrimary.ariaLabel}
              className="btn-hero-ghost w-full sm:w-auto justify-center"
            >
              {ctaPrimary.label}
            </Link>

          </div>

        </div>
      </div>

      {/* Trust / Integration Band */}
      <div className="hero-enter" style={{ animationDelay: "560ms" }}>
        <HeroTechBand />
      </div>

    </section>
  );
}
