import type { Metadata } from "next";
import { generateMetadata as gen } from "@/lib/metadata";

export const metadata: Metadata = gen({
  title: "Cookies Policy",
  description:
    "Cookie policy for Oneword, including how analytics and essential website technologies may be used.",
  slug: "/cookies",
  keywords: ["cookies policy", "website cookies", "analytics cookies"],
});

export default function CookiesPage() {
  return (
    <main className="hero-surface min-h-screen pt-20 pb-20 md:pt-24 md:pb-24">
      <section className="container-xl max-w-3xl">
        <h1 className="text-on-dark">Cookies Policy</h1>
        <p className="mt-6 text-lg text-on-dark-muted">
          This website may use essential technologies and analytics tools to understand performance, improve usability, and support normal site operation.
        </p>
        <div className="mt-10 space-y-8 text-on-dark-muted">
          <section>
            <h2 className="text-on-dark">Essential cookies</h2>
            <p className="mt-3">
              Some cookies or browser storage technologies may be required for core website functionality, navigation, and performance.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">Analytics</h2>
            <p className="mt-3">
              Analytics tools may collect non-sensitive usage information such as device type, visited pages, and traffic sources to help improve the website.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">Your choice</h2>
            <p className="mt-3">
              You can manage or disable cookies in your browser settings. Disabling some technologies may affect how parts of the site behave.
            </p>
          </section>
          <section>
            <h2 className="text-on-dark">Contact</h2>
            <p className="mt-3">
              For questions about cookies or tracking technologies, contact oneworddevstudio@gmail.com.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}