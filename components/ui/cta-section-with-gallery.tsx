"use client";

import * as React from "react";
import { type HTMLMotionProps, type Variants, motion } from "framer-motion";

import { Button } from "@/components/ui/Button";

const SPRING_TRANSITION_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
} as const;

const filterVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

export const ContainerStagger = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        staggerChildren: transition?.staggerChildren ?? 0.2,
        delayChildren: transition?.delayChildren ?? 0.2,
        duration: 0.3,
        ...transition,
      }}
      {...props}
    />
  );
});
ContainerStagger.displayName = "ContainerStagger";

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={filterVariants}
      transition={{
        ...SPRING_TRANSITION_CONFIG,
        duration: 0.3,
        ...transition,
      }}
      {...props}
    />
  );
});
ContainerAnimated.displayName = "ContainerAnimated";

export function CtaSectionWithGallery() {
  return (
    <section id="contacts" className="hero-surface w-full">
      <div className="container-xl py-20 md:py-24">
        <div className="grid items-center gap-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm md:grid-cols-2 md:gap-12 md:p-10 lg:p-12">
          <ContainerStagger>
            <ContainerAnimated
              className="mb-5 flex items-center gap-2.5 text-on-dark-faint"
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
              Contacts
            </ContainerAnimated>
            <ContainerAnimated
              className="text-on-dark font-bold tracking-tight"
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                lineHeight: 1.08,
              }}
            >
              Ready to turn traffic into
              <span style={{ color: "var(--color-brand-acid)" }}> enquiries?</span>
            </ContainerAnimated>
            <ContainerAnimated className="my-5 max-w-xl text-base leading-relaxed text-on-dark-muted md:my-6 md:text-lg">
              If you need a site that looks sharp, loads fast, and helps your business win more leads, this is the place to start the conversation.
            </ContainerAnimated>
            <ContainerAnimated className="text-sm leading-relaxed text-on-dark-faint">
              Fill in the form and your email app will open a message addressed to oneworddevstudio@gmail.com.
            </ContainerAnimated>
          </ContainerStagger>

          <ContainerAnimated>
            <form
              action="mailto:oneworddevstudio@gmail.com"
              method="post"
              encType="text/plain"
              className="rounded-[1.75rem] border border-white/10 bg-brand-dark/40 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.24)] md:p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-on-dark">
                  Name *
                  <input
                    type="text"
                    name="name"
                    required
                    className="h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-on-dark placeholder:text-on-dark-faint focus:border-[var(--color-brand-acid)] focus:outline-none"
                    placeholder="Your name"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm font-medium text-on-dark">
                  Email *
                  <input
                    type="email"
                    name="email"
                    required
                    className="h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-on-dark placeholder:text-on-dark-faint focus:border-[var(--color-brand-acid)] focus:outline-none"
                    placeholder="you@example.com"
                  />
                </label>
              </div>

              <label className="mt-4 flex flex-col gap-2 text-sm font-medium text-on-dark">
                Phone *
                <input
                  type="tel"
                  name="phone"
                  required
                  className="h-12 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-on-dark placeholder:text-on-dark-faint focus:border-[var(--color-brand-acid)] focus:outline-none"
                  placeholder="Your phone number"
                />
              </label>

              <label className="mt-4 flex flex-col gap-2 text-sm font-medium text-on-dark">
                Message *
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="min-h-[160px] rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-on-dark placeholder:text-on-dark-faint focus:border-[var(--color-brand-acid)] focus:outline-none"
                  placeholder="Tell me about your business, what you need, and your timeline."
                />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-on-dark-faint">
                  Email recipient: oneworddevstudio@gmail.com
                </p>
                <Button
                  type="submit"
                  className="btn-hero-acid w-full sm:w-auto"
                >
                  Send
                </Button>
              </div>
            </form>
          </ContainerAnimated>
        </div>
      </div>
    </section>
  );
}