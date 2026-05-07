/**
 * HeroTechBand — React Server Component
 *
 * Trust Bar: «Built with industry-leading integrations» (только текст, без дублирующих бейджей)
 * Ticker:    Stripe · Google Analytics · Cloudflare · SendGrid — монохром, fade-mask по краям
 *
 * Все иконки: fill="currentColor", opacity ~0.18–0.22 (grayscale-эффект через цвет).
 * h-[11vh] — одна строка, border-t разделяет Hero и Band.
 */

import type { JSX } from "react";

type IconProps = { className?: string };
type IconFn    = (p: IconProps) => JSX.Element;

/* ─────────────────────── SVG Icons ─────────────────────────────────────── */

/** Stripe — оригинальный S-образный контур */
const StripeIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
  </svg>
);

/** Google Analytics — три восходящих столбца (язык GA) */
const GoogleAnalyticsIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <rect x="2"  y="14" width="4" height="8"  rx="1" />
    <rect x="10" y="8"  width="4" height="14" rx="1" />
    <rect x="18" y="2"  width="4" height="20" rx="1" />
  </svg>
);

/** Cloudflare — облако с характерной выпуклостью */
const CloudflareIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.16 9.37A6.5 6.5 0 0 0 4.9 11.5H4.5A4.5 4.5 0 0 0 4 20.5h14.5a4 4 0 0 0 .5-7.97 6.51 6.51 0 0 0-1.84-3.16ZM18.5 19H4.5a3 3 0 0 1-.25-5.99l.87-.07.13-.87A5 5 0 0 1 15 12.58l.2 1h.8a2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5l2.5-.08Z" />
  </svg>
);

/** SendGrid — бумажный самолётик (email / send) */
const SendGridIcon: IconFn = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

/* ─────────────────────── Types ──────────────────────────────────────────── */

interface Integration {
  name:  string;
  label: string;
  Icon:  IconFn;
}

/* ─────────────────────── Data ───────────────────────────────────────────── */

const INTEGRATIONS: Integration[] = [
  { name: "Stripe",           label: "Payments",  Icon: StripeIcon           },
  { name: "Google Analytics", label: "Analytics", Icon: GoogleAnalyticsIcon  },
  { name: "Cloudflare",       label: "Security",  Icon: CloudflareIcon       },
  { name: "SendGrid",         label: "Email",     Icon: SendGridIcon         },
];

/* ─────────────────────── Chip ───────────────────────────────────────────── */

function IntegrationChip({ name, label, Icon }: Integration) {
  return (
    <li className="group flex shrink-0 cursor-default select-none items-center gap-3 px-7">

      {/* Иконка — нейтральная серость, яркость при hover */}
      <span
        className="flex shrink-0 items-center transition-all duration-500 ease-out"
        style={{ color: "rgba(255,255,255,0.22)" }}
      >
        <Icon className="h-7 w-7 shrink-0 group-hover:text-white/60 transition-colors duration-500" />
      </span>

      {/* Текст — двухуровневый: имя / категория */}
      <span className="flex flex-col leading-tight">
        <span
          className="whitespace-nowrap font-semibold transition-colors duration-500 ease-out group-hover:text-white/70"
          style={{ fontSize: "1.2rem", color: "rgba(255,255,255,0.18)" }}
        >
          {name}
        </span>
        <span
          className="uppercase tracking-widest transition-colors duration-500 ease-out group-hover:text-white/25"
          style={{ fontSize: "9px", color: "rgba(255,255,255,0.1)" }}
        >
          {label}
        </span>
      </span>

    </li>
  );
}

/* ─────────────────────── Main Component ─────────────────────────────────── */

export default function HeroTechBand() {
  /* 6× дублирование: 4 инструмента × 6 = 24 чипа — безупречно заполняет любой экран */
  const track = [
    ...INTEGRATIONS,
    ...INTEGRATIONS,
    ...INTEGRATIONS,
    ...INTEGRATIONS,
    ...INTEGRATIONS,
    ...INTEGRATIONS,
  ];

  return (
    <div className="w-full shrink-0 border-y border-white/10" aria-hidden="true">


      {/* ── Scrolling Ticker ──────────────────────────────────────────── */}
      <div className="tech-scroll-row h-[11vh]">
        <ul className="tech-scroll-track--left flex w-max items-center" role="list">
          {track.map((integration, i) => (
            <IntegrationChip key={i} {...integration} />
          ))}
        </ul>
      </div>

    </div>
  );
}
