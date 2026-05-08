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
  const formEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";
  const [submitState, setSubmitState] = React.useState<"idle" | "submitting" | "success" | "error" | "unconfigured">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formEndpoint) {
      setSubmitState("unconfigured");
      return;
    }

    setSubmitState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", "New website enquiry from oneword.design");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

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
              Fill in the form and your message will be sent securely to oneworddevstudio@gmail.com.
            </ContainerAnimated>
          </ContainerStagger>

          <ContainerAnimated>
            <form
              onSubmit={handleSubmit}
              className="md:px-2"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-on-dark">
                  Name *
                  <input
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
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
                    autoComplete="email"
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
                  autoComplete="tel"
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
                <div className="text-sm leading-relaxed text-on-dark-faint">
                  <p>Email recipient: oneworddevstudio@gmail.com</p>
                  {submitState === "success" ? <p className="mt-1 text-[color:var(--color-brand-acid)]">Message sent successfully.</p> : null}
                  {submitState === "error" ? <p className="mt-1 text-red-300">Something went wrong. Please try again.</p> : null}
                  {submitState === "unconfigured" ? <p className="mt-1 text-amber-300">Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to `.env.local` to enable delivery.</p> : null}
                </div>
                <Button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="btn-hero-acid w-full sm:w-auto"
                >
                  {submitState === "submitting" ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </ContainerAnimated>
        </div>
      </div>
    </section>
  );
}