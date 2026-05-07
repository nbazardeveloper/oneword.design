"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type LenisLike = {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void;
};

interface ContactLinkProps {
  children: ReactNode;
  className?: string;
  href?: string;
  ariaLabel?: string;
  onNavigate?: () => void;
}

export default function ContactLink({
  children,
  className,
  href = "/#contacts",
  ariaLabel,
  onNavigate,
}: ContactLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();

    const contactsSection = document.getElementById("contacts");
    if (!contactsSection) {
      window.location.hash = "contacts";
      return;
    }

    const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;

    if (lenis) {
      lenis.scrollTo(contactsSection, { offset: -96 });
    } else {
      contactsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.history.replaceState(null, "", "/#contacts");
  };

  return (
    <Link href={href} aria-label={ariaLabel} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}