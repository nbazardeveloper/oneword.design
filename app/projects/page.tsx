import type { Metadata } from "next";
import Image from "next/image";
import { generateMetadata as gen } from "@/lib/metadata";
import { PROJECTS } from "@/lib/projects";
import { JsonLd, buildBreadcrumbSchema } from "@/schemas/jsonld";

export const metadata: Metadata = gen({
  title: "Projects",
  description:
    "Selected client projects across beauty, wellness, service, and product brands. Explore websites built for stronger positioning, SEO, and conversion.",
  slug: "/projects",
  keywords: [
    "web design portfolio",
    "website projects",
    "beauty salon website design",
    "service business web design",
    "seo web development portfolio",
  ],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ])}
      />

      <main className="hero-surface min-h-screen pt-20 pb-20 md:pt-24 md:pb-24">
        <section className="container-xl">
          <div className="mx-auto max-w-3xl text-center">
            <p
              className="mb-5 flex items-center justify-center gap-2.5 select-none text-on-dark-faint"
              aria-hidden="true"
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  height: "1px",
                  width: "28px",
                  background: "var(--color-brand-acid)",
                  borderRadius: "99px",
                  flexShrink: 0,
                }}
              />
              Selected Work
            </p>

            <h1
              className="text-balance font-bold tracking-tight text-on-dark"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.75rem)",
                lineHeight: 1.02,
              }}
            >
              Websites built to look sharp,
              <span style={{ color: "var(--color-brand-acid)" }}> rank well, and convert.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-on-dark-muted md:text-lg">
              A selection of client work across beauty, wellness, local services, and specialist product brands. Each project is shaped around positioning, performance, and a cleaner path to enquiries or bookings.
            </p>
          </div>
        </section>

        <section className="container-xl mt-14 grid gap-6 md:mt-16 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.href}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10] border-b border-white/10 bg-brand-dark-2/60">
                <Image
                  src={project.image}
                  alt={`${project.name} project preview`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,20,25,0.78)] via-[rgba(15,20,25,0.18)] to-transparent" />
                <div className="absolute left-6 top-6 inline-flex rounded-full border border-white/10 bg-brand-dark/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-on-dark-faint backdrop-blur-sm">
                  {project.category}
                </div>
                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-on-dark-faint">
                    {project.location}
                  </p>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-on-dark md:text-4xl">
                    {project.name}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-base leading-relaxed text-on-dark-muted md:text-lg">
                  {project.summary}
                </p>

                <ul className="mt-6 space-y-3" role="list" aria-label={`${project.name} highlights`}>
                  {project.notes.map((note) => (
                    <li key={note} className="flex items-start gap-3 text-sm leading-6 text-on-dark-soft md:text-base">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--color-brand-acid)" }}
                      />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm leading-relaxed text-on-dark-faint">
                    Live project available online
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-hero-acid w-full justify-center sm:w-auto"
                  >
                    Visit website
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}