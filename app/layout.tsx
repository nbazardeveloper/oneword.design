import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import "@/styles/globals.css";

import { SITE_CONFIG }         from "@/lib/config";
import {
  buildOrganizationSchema,
  buildWebsiteSchema,
  JsonLd,
} from "@/schemas/jsonld";
import Header            from "@/components/layout/Header";
import Footer            from "@/components/layout/Footer";
import LenisProvider     from "@/components/providers/LenisProvider";
import WebVitalsProvider from "@/components/providers/WebVitalsProvider";

// ─── Font Optimization ────────────────────────────────────────────────────────
// next/font eliminates FOIT/FOUT and self-hosts — zero layout shift.

/** Body text: clean, highly legible */
const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "optional",   // No FOIT: uses fallback until font is ready, no swap flash
  preload:  true,
  fallback: ["system-ui", "arial"],
});

/** Display / headings: distinctive character */
const plusJakarta = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  variable: "--font-jakarta",
  display:  "optional",
  weight:   ["400", "500", "600", "700", "800"],
  preload:  true,
  fallback: ["system-ui", "arial"],
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
const homeDescriptionOptions = {
  performance:
    "High-end websites for small businesses, built for speed, technical SEO, and strong search visibility.",
  business:
    "High-end websites for small businesses that help local brands build trust, win more enquiries, and grow with impact.",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: "High-End Websites For Small Businesses | Oneword",
  description: homeDescriptionOptions.business,
  applicationName: SITE_CONFIG.name,
  referrer: "origin-when-cross-origin",
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  keywords: [
    "high-end websites for small businesses",
    "small business web design",
    "small business website development",
    "agency websites",
    "local business websites",
    "website design for small businesses",
  ],
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "High-End Websites For Small Businesses | Oneword",
    description: homeDescriptionOptions.business,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
    images: [
      {
        url: `${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`,
        width: SITE_CONFIG.ogImageWidth,
        height: SITE_CONFIG.ogImageHeight,
        alt: "Oneword high-end websites for small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "High-End Websites For Small Businesses | Oneword",
    description: homeDescriptionOptions.business,
    images: [`${SITE_CONFIG.url}${SITE_CONFIG.defaultOgImage}`],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.webp", type: "image/webp" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width:              "device-width",
  initialScale:       1,
  themeColor:         SITE_CONFIG.themeColor,
  colorScheme:        "light",
  // Required for env(safe-area-inset-*) to work on iPhone notch / Dynamic Island
  viewportFit:        "cover",
};

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={SITE_CONFIG.language}
      className={`${inter.variable} ${plusJakarta.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* ── Site-wide JSON-LD (Organization + WebSite) ─────────────── */}
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebsiteSchema()} />

        {/* ── LCP preload — hero portrait ────────────────────────────── */}
        {/* Explicit preload ensures browser fetches developer.webp at highest
            priority before JS hydration, regardless of static export mode.   */}
        <link
          rel="preload"
          as="image"
          href="/images/developer-hero.webp"
          fetchPriority="high"
        />

        {/* ── DNS Prefetch for analytics ─────────────────────────────── */}
        {/* Note: Google Fonts preconnects removed — next/font self-hosts fonts */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* ── Manifest / Icons ───────────────────────────────────────── */}
        <link rel="manifest"    href="/site.webmanifest" />
        <link rel="icon"        href="/favicon.ico"               sizes="any" />
        <link rel="icon"        href="/icon.webp"                 type="image/webp" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>

      <body className="font-sans antialiased bg-neutral-50 text-neutral-900">
        {/* ── Web Vitals (App Router hook — replaces legacy reportWebVitals) ── */}
        <WebVitalsProvider />

        {/* ── Site Layout ─────────────────────────────────────────────── */}
        <div className="flex min-h-screen flex-col">
          <Header />

          <main
            id="main-content"
            role="main"
            className="flex-1"
            tabIndex={-1}
          >
            <LenisProvider>
              {children}
            </LenisProvider>
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
