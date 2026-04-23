import type { Metadata, Viewport } from "next";
import type { NextWebVitalsMetric } from "next/app";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "@/styles/globals.css";

import { SITE_CONFIG }         from "@/lib/config";
import { generateHomeMetadata } from "@/lib/metadata";
import { handleWebVitals }     from "@/utils/webVitals";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
  JsonLd,
} from "@/schemas/jsonld";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ─── Font Optimization ────────────────────────────────────────────────────────
// next/font eliminates FOIT/FOUT and self-hosts — zero layout shift.

/** Body text: clean, highly legible */
const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",       // Prevent invisible text during load
  preload:  true,
  fallback: ["system-ui", "arial"],
});

/** Display / headings: distinctive character */
const plusJakarta = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  variable: "--font-jakarta",
  display:  "swap",
  weight:   ["400", "500", "600", "700", "800"],
  preload:  true,
  fallback: ["system-ui", "arial"],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = generateHomeMetadata();

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width:              "device-width",
  initialScale:       1,
  themeColor:         SITE_CONFIG.themeColor,
  colorScheme:        "light",
};

// ─── Web Vitals Reporter ──────────────────────────────────────────────────────
export function reportWebVitals(metric: NextWebVitalsMetric): void {
  handleWebVitals(metric);
}

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={SITE_CONFIG.language}
      className={`${inter.variable} ${plusJakarta.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* ── Site-wide JSON-LD (Organization + WebSite) ─────────────── */}
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebsiteSchema()} />

        {/* ── DNS Prefetch / Preconnect for performance ──────────────── */}
        <link rel="dns-prefetch"    href="//www.google-analytics.com" />
        <link rel="dns-prefetch"    href="//www.googletagmanager.com" />
        <link rel="preconnect"      href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ── Manifest / Icons ───────────────────────────────────────── */}
        <link rel="manifest"    href="/site.webmanifest" />
        <link rel="icon"        href="/favicon.ico"               sizes="any" />
        <link rel="icon"        href="/icon.svg"                  type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        {/* ── Skip Navigation (A11y — keyboard users) ─────────────────── */}
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>

        {/* ── Site Layout ─────────────────────────────────────────────── */}
        <div className="flex min-h-screen flex-col">
          <Header />

          <main
            id="main-content"
            role="main"
            className="flex-1"
            tabIndex={-1}       // Allows focus target for skip-nav
          >
            {children}
          </main>

          <Footer />
        </div>

        {/* ════════════════════════════════════════════════════════════
            THIRD-PARTY SCRIPTS
            All non-critical scripts use strategy="lazyOnload" to
            ensure they NEVER block the critical rendering path.
            This is essential for Lighthouse 100 Performance score.
        ════════════════════════════════════════════════════════════ */}

        {/* ── Google Tag Manager ─────────────────────────────────────── */}
        {SITE_CONFIG.gtmId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"   // Load after page is interactive
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${SITE_CONFIG.gtmId}');
              `,
            }}
          />
        )}

        {/* ── Google Analytics 4 ─────────────────────────────────────── */}
        {SITE_CONFIG.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`}
              strategy="lazyOnload"      // Lowest priority — load after everything
            />
            <Script
              id="ga4-init"
              strategy="lazyOnload"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${SITE_CONFIG.gaId}', {
                    page_path: window.location.pathname,
                    send_page_view: true,
                  });
                `,
              }}
            />
          </>
        )}

        {/* ── Meta Pixel ─────────────────────────────────────────────── */}
        {SITE_CONFIG.pixelId && (
          <Script
            id="fb-pixel"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){
                n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;
                s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${SITE_CONFIG.pixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
