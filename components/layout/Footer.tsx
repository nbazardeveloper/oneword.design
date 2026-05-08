import Link from "next/link";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/config";
import ContactLink from "@/components/ui/ContactLink";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-brand-dark text-neutral-400">
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
              <span className="text-lg font-extrabold uppercase tracking-[0.18em] text-[color:var(--color-brand-acid)] md:text-xl">
                oneword
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>

            {/* Social links */}
            {SITE_CONFIG.social.instagram !== "yourbrand" ? (
              <nav aria-label="Social media links" className="flex gap-3 mt-2">
                <a
                  href={`https://instagram.com/${SITE_CONFIG.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="h-8 w-8 rounded-lg bg-brand-dark-2 flex items-center justify-center
                             text-xs font-bold text-neutral-400 hover:text-white hover:bg-brand-dark-deep
                             transition-colors duration-150"
                >
                  IG
                </a>
              </nav>
            ) : null}
          </div>

          {/* Product links */}
          <nav aria-label="Product links">
            <h2 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-4">
              Product
            </h2>
            <ul className="flex flex-col gap-2.5" role="list">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  {link.href === "/#contacts" ? (
                    <ContactLink className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors">
                      {link.label}
                    </ContactLink>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
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
                  {link.href === "/#contacts" ? (
                    <ContactLink className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors">
                      {link.label}
                    </ContactLink>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
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
          <p className="text-xs text-neutral-400">
            &copy; {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors"
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
