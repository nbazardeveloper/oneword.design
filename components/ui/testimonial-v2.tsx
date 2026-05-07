"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";

interface ProjectCard {
  text: string;
  name: string;
  role: string;
  initials: string;
}

const projectCards: ProjectCard[] = PROJECTS.map((project) => ({
  text: project.summary,
  name: project.name,
  role: `${project.category} • ${project.location}`,
  initials: project.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join(""),
}));

const firstColumn = projectCards.slice(0, 3);
const secondColumn = projectCards.slice(3, 5);
const thirdColumn = projectCards.slice(5, 7);

interface TestimonialsColumnProps {
  className?: string;
  testimonials: ProjectCard[];
  duration?: number;
  isDark: boolean;
}

function TestimonialsColumn({
  className,
  testimonials: items,
  duration = 10,
  isDark,
}: TestimonialsColumnProps) {
  const cardClassName = [
    "group w-full max-w-xs cursor-default select-none rounded-[1.75rem] border p-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 md:p-10",
    isDark
      ? "border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
      : "border-neutral-200 bg-white shadow-black/5",
  ].join(" ");

  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="m-0 flex list-none flex-col gap-6 bg-transparent p-0 pb-6"
      >
        {new Array(2).fill(0).map((_, index) => (
          <li key={index} className="contents">
            {items.map(({ text, name, role, initials }, itemIndex) => (
              <motion.article
                key={`${index}-${itemIndex}`}
                aria-hidden={index === 1 ? "true" : "false"}
                tabIndex={index === 1 ? -1 : 0}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 30px 70px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.08)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                whileFocus={{
                  scale: 1.03,
                  y: -8,
                  boxShadow:
                    "0 30px 70px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.08)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className={cardClassName}
              >
                <blockquote className="m-0 p-0">
                  <span
                    aria-hidden="true"
                    className="mb-6 block text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: "var(--color-brand-acid)" }}
                  >
                    Featured Project
                  </span>
                  <p
                    className={[
                      "m-0 font-normal leading-relaxed transition-colors duration-300",
                      isDark ? "text-on-dark-muted" : "text-neutral-600",
                    ].join(" ")}
                  >
                    {text}
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className={[
                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold tracking-[0.12em] transition-all duration-300 ease-in-out group-hover:ring-primary/30",
                        isDark ? "bg-brand-acid text-brand-dark-deep ring-2 ring-white/10" : "bg-neutral-900 text-white",
                      ].join(" ")}
                    >
                      {initials}
                    </div>
                    <div className="flex flex-col">
                      <cite
                        className={[
                          "not-italic font-semibold tracking-tight leading-5 transition-colors duration-300",
                          isDark ? "text-on-dark" : "text-neutral-900",
                        ].join(" ")}
                      >
                        {name}
                      </cite>
                      <span className="mt-0.5 text-sm leading-5 tracking-tight text-on-dark-faint transition-colors duration-300">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.article>
            ))}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export default function TestimonialV2() {
  return (
    <div className="dark">
      <section
        aria-labelledby="testimonials-heading"
        className="hero-surface relative overflow-hidden py-24 text-white transition-colors duration-300"
      >
        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.8 },
          }}
          className="container-xl relative z-10"
        >
          <div className="mx-auto mb-16 flex max-w-3xl flex-col items-center justify-center text-center">
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
              Testimonials
            </p>
            <h2
              id="testimonials-heading"
              className="text-balance font-bold tracking-tight text-on-dark transition-colors"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                lineHeight: 1.08,
              }}
            >
              Real projects for real
              <span style={{ color: "var(--color-brand-acid)" }}> businesses.</span>
            </h2>
            <p
              className="mt-5 max-w-2xl text-center text-base leading-relaxed text-on-dark-muted transition-colors md:text-lg"
            >
              Instead of placeholder testimonials, this section now highlights the businesses behind the work and the type of websites built for them.
            </p>
          </div>

          <div
            className="mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            role="region"
            aria-label="Scrolling project cards"
          >
            <TestimonialsColumn testimonials={firstColumn} duration={15} isDark />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden md:block"
              duration={19}
              isDark
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              className="hidden lg:block"
              duration={17}
              isDark
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}