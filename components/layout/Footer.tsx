import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-neutral-950 text-neutral-400">
      <div className="container-xl py-16">
        {/* ── Top: Brand + Link columns ─────────────────────────────── */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">

          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              aria-label={`${SITE_CONFIG.name} — home`}
              className="flex items-center gap-2 font-bold text-white text-lg
                         font-[family-name:var(--font-jakarta)] w-fit"
            >
              <span
                className="h-7 w-7 rounded-lg bg-brand-500 flex items-center justify-center
                           text-white text-sm font-black"
                aria-hidden="true"
              >
                {SITE_CONFIG.name[0]}
              </span>
              {SITE_CONFIG.name}
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>

            {/* Social links */}
            <nav aria-label="Social media links" className="flex gap-3 mt-2">
              {[
                { label: "Twitter / X",  href: `https://twitter.com/${SITE_CONFIG.social.twitter}`,    icon: "𝕏"  },
                { label: "GitHub",       href: `https://github.com/${SITE_CONFIG.social.github}`,      icon: "GH" },
                { label: "LinkedIn",     href: `https://linkedin.com/${SITE_CONFIG.social.linkedin}`,  icon: "in" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${s.label}`}
                  className="h-8 w-8 rounded-lg bg-neutral-800 flex items-center justify-center
                             text-xs font-bold text-neutral-400 hover:text-white hover:bg-neutral-700
                             transition-colors duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </nav>
          </div>

          {/* Product links */}
          <nav aria-label="Product links">
            <h2 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-4">
              Product
            </h2>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company links */}
          <nav aria-label="Company links">
            <h2 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-4">
              Company
            </h2>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal links */}
          <nav aria-label="Legal links">
            <h2 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-4">
              Legal
            </h2>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Bottom: copyright ─────────────────────────────────────── */}
        <div className="divider mt-12 mb-6" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Built with Next.js (opens in new tab)"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
