"use client";

import Link  from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/config";
import ContactLink from "@/components/ui/ContactLink";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      role="banner"
      className={[
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-brand-dark/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
      /* Safe area: pushes header content below iPhone notch / Dynamic Island.
         Works only when viewport meta has viewportFit="cover". */
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <nav className="container-xl flex h-24 md:h-32 items-center justify-between">

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link href="/" aria-label={`${SITE_CONFIG.name} — home`} className="group flex items-center">
          <div className="relative h-20 w-20 md:h-28 md:w-28 flex items-center justify-center shrink-0">
            <Image
              src="/icon.webp"
              alt=""
              width={112}
              height={112}
              className="h-20 w-20 md:h-28 md:w-28 object-contain"
              priority
            />
          </div>
        </Link>

        {/* ── Desktop Navigation ───────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              {item.href === "/#contacts" ? (
                <ContactLink
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-white/75 hover:text-white hover:bg-white/8 transition-all"
                >
                  {item.label}
                </ContactLink>
              ) : (
                <Link
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-white/75 hover:text-white hover:bg-white/8 transition-all"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ───────────────────────────────────────────── */}
       
        <div className="hidden md:flex items-center gap-2">

        

          {/* Get started — акцентная кнопка, хорошо видна на любом фоне */}
          <ContactLink
            href="/#contacts"
            className="px-5 py-2 rounded-full bg-brand-acid text-brand-dark-deep text-sm font-bold
                       hover:bg-brand-acid-hover hover:scale-[1.02] active:scale-[0.98]
                       transition-all duration-200"
            onNavigate={closeMenu}
          >
            Get started
          </ContactLink>
        </div>

        {/* ── Mobile Hamburger ─────────────────────────────────────── */}
        <button
          type="button"
          className="p-2 md:hidden text-white"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden fixed inset-x-0 top-[64px] bg-brand-dark border-t border-white/10 animate-fade-in shadow-2xl"
        >
          <ul className="container-xl py-8 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {item.href === "/#contacts" ? (
                  <ContactLink
                    href={item.href}
                    className="text-2xl font-semibold text-white/90 hover:text-brand-acid transition-colors"
                    onNavigate={closeMenu}
                  >
                    {item.label}
                  </ContactLink>
                ) : (
                  <Link
                    href={item.href}
                    className="text-2xl font-semibold text-white/90 hover:text-brand-acid transition-colors"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <ContactLink
                href="/#contacts"
                className="inline-flex items-center justify-center
                  h-14 rounded-xl
                  bg-brand-acid text-brand-dark-deep
                  font-bold text-lg
                  hover:bg-brand-acid-hover transition-all duration-200"
                onNavigate={closeMenu}
              >
                Get started
              </ContactLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

