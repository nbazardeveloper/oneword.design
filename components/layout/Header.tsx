"use client";

import Link  from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";

import { NAV_ITEMS, SITE_CONFIG } from "@/lib/config";

export default function Header() {
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [isScrolled,    setIsScrolled]    = useState(false);
  const menuRef                           = useRef<HTMLDivElement>(null);
  const menuButtonRef                     = useRef<HTMLButtonElement>(null);

  // ── Scroll detection for header shadow ──────────────────────────
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close menu on Escape (A11y) ──────────────────────────────────
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape" && isMenuOpen) {
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ── Close menu on outside click ───────────────────────────────────
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isMenuOpen]);

  return (
    <header
      role="banner"
      className={[
        "sticky top-0 z-50 w-full",
        "bg-white/90 backdrop-blur-md",
        "border-b transition-all duration-200",
        isScrolled ? "border-neutral-200 shadow-card-sm" : "border-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Main navigation"
        className="container-xl flex h-16 items-center justify-between"
      >
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link
          href="/"
          aria-label={`${SITE_CONFIG.name} — go to home page`}
          className="flex items-center gap-2 font-bold text-neutral-900
                     text-lg font-[family-name:var(--font-jakarta)]
                     hover:text-brand-600 transition-colors duration-200"
        >
          {/* Replace with actual logo image */}
          <span
            className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center
                       text-white text-sm font-black"
            aria-hidden="true"
          >
            {SITE_CONFIG.name[0]}
          </span>
          {SITE_CONFIG.name}
        </Link>

        {/* ── Desktop Navigation ───────────────────────────────────── */}
        <ul
          className="hidden md:flex items-center gap-1"
          role="list"
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-600
                           hover:text-neutral-900 hover:bg-neutral-100
                           transition-colors duration-150"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ──────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login"  className="btn-ghost btn-sm">Log in</Link>
          <Link href="/signup" className="btn-primary btn-sm">Get started</Link>
        </div>

        {/* ── Mobile Hamburger ─────────────────────────────────────── */}
        <button
          ref={menuButtonRef}
          type="button"
          className="btn-ghost p-2 md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden border-t border-neutral-100 bg-white"
        >
          <ul className="container-xl py-4 flex flex-col gap-1" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex w-full items-center px-3 py-2.5 rounded-lg
                             text-sm font-medium text-neutral-700
                             hover:text-neutral-900 hover:bg-neutral-50
                             transition-colors duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 border-t border-neutral-100 flex flex-col gap-2">
              <Link href="/login"  className="btn-secondary w-full justify-center">Log in</Link>
              <Link href="/signup" className="btn-primary w-full justify-center">Get started</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
