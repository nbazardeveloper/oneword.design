const FEATURES = [
  {
    icon:        "⚡",
    title:       "Lighthouse 100",
    description: "Engineered from the ground up for perfect Core Web Vitals. Every decision — fonts, scripts, images — is optimised.",
  },
  {
    icon:        "🔍",
    title:       "Advanced SEO",
    description: "Centralised metadata, JSON-LD schemas, dynamic sitemaps, and canonical URLs. Never miss a ranking opportunity.",
  },
  {
    icon:        "♿",
    title:       "WCAG 2.1 AA",
    description: "Full ARIA compliance, keyboard navigation, skip links, and colour contrast — accessibility is not an afterthought.",
  },
  {
    icon:        "🏗️",
    title:       "Clean Architecture",
    description: "Atomic Design-inspired component structure, strict TypeScript, and single-responsibility modules.",
  },
  {
    icon:        "🎨",
    title:       "Design System",
    description: "Tailwind CSS with a fully custom token system: palette, spacing, typography scales, and shadow presets.",
  },
  {
    icon:        "📊",
    title:       "Web Vitals Monitoring",
    description: "Built-in Core Web Vitals reporter logs to console in dev and ships to GA4 in production automatically.",
  },
] as const;

export default function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="section bg-neutral-50"
    >
      <div className="container-xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge-brand mx-auto mb-4">Everything included</div>
          <h2 id="features-heading" className="mb-4">
            Built for production from day one
          </h2>
          <p className="text-lg text-neutral-500">
            Every feature is thoughtfully integrated — no stitching together
            dozens of packages. Just clone, configure, and ship.
          </p>
        </div>

        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Product features"
        >
          {FEATURES.map((feature) => (
            <li key={feature.title} className="card-hover p-6">
              <div
                className="text-3xl mb-4 w-12 h-12 flex items-center justify-center
                           bg-brand-50 rounded-xl"
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}