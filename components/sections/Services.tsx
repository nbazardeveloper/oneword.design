const PACKAGES = [
  {
    label: "Package 1",
    name: "Starter Website",
    tagline: "Get Online Fast",
    audience:
      "Perfect for businesses that just need a clean, professional presence online.",
    features: [
      "Up to 5 pages (Home, About, Services, Gallery, Contact)",
      "Mobile-friendly and fast-loading design",
      "Basic on-page SEO setup",
      "Contact form and Google Maps integration",
      "Google Business Profile setup",
      "30 days of post-launch support included",
    ],
    price: "Starting at $800 - one-time payment",
    turnaround: "Turnaround: 2 weeks",
    featured: false,
  },
  {
    label: "Package 2",
    name: "Growth Website",
    tagline: "Look Professional, Get Found on Google",
    audience:
      "For businesses that want more customers - not just a website.",
    features: [
      "Everything in Starter, plus:",
      "Up to 8 pages with custom layout",
      "Local SEO optimization (keywords, meta tags, schema markup)",
      "Google Analytics and Search Console setup",
      "Page speed optimization",
      "Blog setup (so you can post updates)",
      "60 days of post-launch support",
    ],
    price: "Starting at $1,500 - one-time payment",
    turnaround: "Turnaround: 2-3 weeks",
    featured: true,
  },
  {
    label: "Package 3",
    name: "Full-Service Website",
    tagline: "Your Complete Digital Presence",
    audience:
      "For businesses serious about standing out and growing online.",
    features: [
      "Everything in Growth, plus:",
      "Up to 12 pages with premium design",
      "Competitor and keyword research",
      "Custom photography guidance / stock photo sourcing",
      "Email setup (professional @yourbusiness.com)",
      "90 days of post-launch support",
      "Priority response time",
    ],
    price: "Starting at $2,500 - one-time payment",
    turnaround: "Turnaround: 3 weeks",
    featured: false,
  },
] as const;

const ADD_ONS = [
  {
    label: "Add-On",
    name: "Technical Support - On Demand",
    tagline: "Something broke? I've got it.",
    body:
      "Don't have time to deal with website issues? I'll handle it for you - fast.",
    details: [
      "Website edits and content updates",
      "Bug fixes and broken link repair",
      "Plugin / software updates",
      "Security checks",
      "Hosting and domain help",
      "Speed and performance fixes",
    ],
    price: "$75/hour - pay only when you need it",
    meta: "Response within 24 hours on business days",
    note: "Need regular updates? Ask about a monthly maintenance retainer.",
  },
  {
    label: "Add-On",
    name: "SEO Optimization - Monthly",
    tagline: "Get Found by More Customers Every Month",
    body:
      "One-time setup isn't enough. SEO works best when it's consistent.",
    details: [
      "Monthly keyword research and tracking",
      "On-page optimization (title tags, content, internal links)",
      "Google Business Profile management and posts",
      "Local citation building (directories, listings)",
      "Monthly report - you always know what's happening",
      "Competitor monitoring",
    ],
    price: "Starting at $300/month",
    meta: "Most clients start seeing results within 60-90 days.",
    note: "No long-term contracts - cancel anytime.",
  },
  {
    label: "Add-On",
    name: "Setup Google Business Profile",
    tagline: "Show up locally and look trustworthy from day one",
    body:
      "I will set up or fully optimize your Google Business Profile so customers can find you faster in local search and on Google Maps.",
    details: [
      "Profile setup or cleanup",
      "Business category and service configuration",
      "Description, contact info, hours, and service area setup",
      "Photo and branding guidance",
      "Map and website connection",
      "Basic local visibility optimization",
    ],
    price: "Starting at $150 - one-time setup",
    meta: "Ideal for new businesses or profiles that were never optimized properly.",
    note: "Can be added to any website package or booked separately.",
  },
] as const;

export default function Services() {
  return (
    <section aria-labelledby="services-heading" className="section hero-surface">
      <div className="container-xl">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-18">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.24em]"
            style={{ color: "var(--color-brand-acid)" }}
          >
            Services
          </p>
          <h2
            id="services-heading"
            className="text-balance text-4xl font-bold tracking-tight text-on-dark md:text-5xl lg:text-6xl"
          >
            Everything Your Business Needs Online - Under One Roof
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-on-dark-muted md:text-xl">
            No need to hire a designer, an SEO agency, and a tech guy separately.
            You get it all in one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <article
              key={pkg.name}
              className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-7 shadow-card transition-transform duration-300 hover:-translate-y-1 md:p-8"
              style={{
                background: pkg.featured
                  ? "linear-gradient(180deg, var(--color-brand-dark) 0%, var(--color-brand-dark-deep) 100%)"
                  : "#ffffff",
                borderColor: pkg.featured ? "var(--color-brand-acid)" : "var(--color-neutral-200)",
              }}
            >
              <div
                className={pkg.featured
                  ? "mb-6 flex flex-col items-center gap-4 text-center"
                  : "mb-6 flex items-start justify-between gap-4"
                }
              >
                <div className={pkg.featured ? "text-center" : undefined}>
                  <p
                    className="text-xs font-semibold uppercase tracking-[0.22em]"
                    style={{ color: pkg.featured ? "var(--color-brand-acid)" : "var(--color-brand-dark)" }}
                  >
                    {pkg.label}
                  </p>
                  <h3
                    className="mt-3 text-3xl font-bold leading-tight md:text-4xl"
                    style={{ color: pkg.featured ? "var(--color-text-on-dark)" : "var(--color-neutral-900)" }}
                  >
                    {pkg.name}
                  </h3>
                </div>
                {pkg.featured ? (
                  <span className="rounded-full bg-[var(--color-brand-acid)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-dark-deep)]">
                    Most Popular
                  </span>
                ) : null}
              </div>

              <p
                className="text-lg font-medium leading-snug"
                style={{ color: pkg.featured ? "var(--color-text-on-dark)" : "var(--color-neutral-800)" }}
              >
                {pkg.tagline}
              </p>
              <p
                className="mt-4 text-sm leading-7"
                style={{ color: pkg.featured ? "var(--color-text-on-dark)" : "var(--color-neutral-600)" }}
              >
                {pkg.audience}
              </p>

              <ul className="mt-8 space-y-3" role="list" aria-label={`${pkg.name} features`}>
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 md:text-base"
                    style={{ color: pkg.featured ? "var(--color-text-on-dark)" : "var(--color-neutral-700)" }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: pkg.featured ? "var(--color-brand-acid)" : "var(--color-brand-dark-2)" }}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <p
                  className="text-xl font-bold md:text-2xl"
                  style={{ color: pkg.featured ? "var(--color-brand-acid)" : "var(--color-brand-dark)" }}
                >
                  {pkg.price}
                </p>
                <p
                  className="mt-3 text-sm font-medium uppercase tracking-[0.18em]"
                  style={{ color: pkg.featured ? "var(--color-text-on-dark)" : "var(--color-neutral-500)" }}
                >
                  {pkg.turnaround}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-2">
          {ADD_ONS.map((item, index) => (
            <article
              key={item.name}
              className={`relative overflow-hidden rounded-[1.75rem] border border-[var(--color-neutral-200)] bg-white p-7 shadow-card md:p-8 ${
                ADD_ONS.length % 2 === 1 && index === ADD_ONS.length - 1 ? "lg:col-span-2" : ""
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-brand-dark)]">
                {item.label}
              </p>
              <h3 className="mt-3 text-3xl font-bold leading-tight text-neutral-900 md:text-4xl">
                {item.name}
              </h3>
              <p className="mt-4 text-lg font-medium text-neutral-800">{item.tagline}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600 md:text-base">
                {item.body}
              </p>

              <p className="mt-7 text-base font-semibold text-[var(--color-brand-dark)]">
                {item.price}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2" role="list" aria-label={`${item.name} details`}>
                {item.details.map((detail) => (
                  <li key={detail} className="rounded-2xl bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-700">
                    {detail}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
                {item.meta}
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{item.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
