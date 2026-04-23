import type { WebVitalMetric } from "@/types";

// ─── Thresholds (per Google's definitions) ────────────────────────────────────
const THRESHOLDS = {
  LCP:  { good: 2500,  poor: 4000  }, // ms
  FID:  { good: 100,   poor: 300   }, // ms
  INP:  { good: 200,   poor: 500   }, // ms
  CLS:  { good: 0.1,   poor: 0.25  }, // unitless
  FCP:  { good: 1800,  poor: 3000  }, // ms
  TTFB: { good: 800,   poor: 1800  }, // ms
} as const;

// ─── Rating Calculator ────────────────────────────────────────────────────────
function getRating(
  name: WebVitalMetric["name"],
  value: number,
): WebVitalMetric["rating"] {
  const threshold = THRESHOLDS[name];
  if (!threshold) return "good";
  if (value <= threshold.good) return "good";
  if (value <= threshold.poor) return "needs-improvement";
  return "poor";
}

// ─── Console Reporter ─────────────────────────────────────────────────────────
const RATING_STYLES: Record<WebVitalMetric["rating"], string> = {
  good:               "color: #22c55e; font-weight: bold;",
  "needs-improvement":"color: #f59e0b; font-weight: bold;",
  poor:               "color: #ef4444; font-weight: bold;",
};

function reportToConsole(metric: WebVitalMetric): void {
  const style = RATING_STYLES[metric.rating];
  const unit  = metric.name === "CLS" ? "" : "ms";
  const value = metric.name === "CLS"
    ? metric.value.toFixed(4)
    : Math.round(metric.value).toString();

  console.groupCollapsed(
    `%c[Web Vitals] ${metric.name}: ${value}${unit} (${metric.rating.toUpperCase()})`,
    style,
  );
  console.log("ID:",    metric.id);
  console.log("Value:", `${value}${unit}`);
  console.log("Delta:", `${metric.delta.toFixed(2)}${unit}`);
  console.log("Label:", metric.label);
  console.groupEnd();
}

// ─── Analytics Reporter ───────────────────────────────────────────────────────
function reportToAnalytics(metric: WebVitalMetric): void {
  // Google Analytics 4
  if (typeof window !== "undefined" && "gtag" in window) {
    (window as Window & { gtag: Function }).gtag("event", metric.name, {
      value:         Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_category: "Web Vitals",
      event_label:   metric.id,
      non_interaction: true,
    });
  }

  // Vercel Analytics (if available)
  if (typeof window !== "undefined" && "va" in window) {
    (window as Window & { va: Function }).va("track", metric.name, {
      value: metric.value,
    });
  }
}

// ─── Main Handler ─────────────────────────────────────────────────────────────
/**
 * handleWebVitals
 *
 * Pass this to Next.js's `export function reportWebVitals()` in app/layout.tsx.
 * In development: logs a colour-coded summary to the console.
 * In production:  sends data to GA4 / Vercel Analytics silently.
 *
 * @example
 * // app/layout.tsx
 * export function reportWebVitals(metric: NextWebVitalsMetric) {
 *   handleWebVitals(metric);
 * }
 */
export function handleWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  delta: number;
  label: string;
}): void {
  const typedMetric: WebVitalMetric = {
    id:     metric.id,
    name:   metric.name as WebVitalMetric["name"],
    value:  metric.value,
    delta:  metric.delta,
    label:  metric.label as WebVitalMetric["label"],
    rating: getRating(metric.name as WebVitalMetric["name"], metric.value),
  };

  if (process.env.NODE_ENV === "development") {
    reportToConsole(typedMetric);
  } else {
    reportToAnalytics(typedMetric);
  }
}

// ─── Performance Observer (manual LCP/CLS tracking) ──────────────────────────
/**
 * initPerfObserver
 *
 * Call once from a Client Component to observe LCP and CLS.
 * Useful when you can't use the Next.js reportWebVitals hook.
 */
export function initPerfObserver(): () => void {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
    return () => {};
  }

  const observers: PerformanceObserver[] = [];

  // Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last    = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
      handleWebVitals({
        id:    "lcp-manual",
        name:  "LCP",
        value: last.renderTime ?? last.loadTime ?? 0,
        delta: 0,
        label: "web-vital",
      });
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    observers.push(lcpObserver);
  } catch { /* not supported */ }

  // Cumulative Layout Shift
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const e = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
        if (!e.hadRecentInput) clsValue += e.value ?? 0;
      }
      handleWebVitals({
        id:    "cls-manual",
        name:  "CLS",
        value: clsValue,
        delta: 0,
        label: "web-vital",
      });
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
    observers.push(clsObserver);
  } catch { /* not supported */ }

  return () => observers.forEach((o) => o.disconnect());
}
