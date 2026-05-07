"use client";

import type React from "react";

import NextImage from "next/image";
import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote: "The attention to detail is unmatched. Every interaction feels intentional.",
    author: "Sarah Chen",
    role: "Design Director",
    company: "Linear",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote: "Finally, someone who understands that simplicity is the ultimate sophistication.",
    author: "Marcus Webb",
    role: "Creative Lead",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote: "This work redefined our entire approach to digital experiences.",
    author: "Elena Frost",
    role: "Head of Product",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&h=600&fit=crop&crop=faces&auto=format&q=80",
  },
];

function usePreloadImages(images: string[]) {
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);
}

function SplitText({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <span className="inline">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: index * 0.03,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  usePreloadImages(testimonials.map((testimonial) => testimonial.avatar));

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY],
  );

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="relative mx-auto w-full max-w-xl px-6 py-20 sm:px-8"
          style={{ cursor: "none" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleNext}
        >
          <motion.div
            className="pointer-events-none absolute z-50 hidden mix-blend-difference md:block"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <motion.div
              className="flex items-center justify-center rounded-full bg-foreground"
              animate={{
                width: isHovered ? 80 : 0,
                height: isHovered ? 80 : 0,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <motion.span
                className="text-xs font-medium uppercase tracking-wider text-background"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.1 }}
              >
                Next
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute right-6 top-6 flex items-baseline gap-1 font-mono text-xs sm:right-8 sm:top-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              className="text-2xl font-light text-foreground"
              key={activeIndex}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{String(testimonials.length).padStart(2, "0")}</span>
          </motion.div>

          <motion.div
            className="absolute left-6 top-6 flex -space-x-2 sm:left-8 sm:top-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.6 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.avatar}
                className={`h-6 w-6 overflow-hidden rounded-full border-2 border-background transition-all duration-300 ${
                  index === activeIndex ? "ring-1 ring-accent ring-offset-1 ring-offset-background" : "grayscale opacity-50"
                }`}
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                <div className="relative h-full w-full">
                  <NextImage
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="text-xl font-light leading-relaxed tracking-tight text-foreground md:text-2xl"
              >
                <SplitText text={currentTestimonial.quote} />
              </motion.blockquote>
            </AnimatePresence>

            <motion.div className="relative mt-12" layout>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12">
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-accent/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.avatar}
                      className="absolute inset-0 overflow-hidden rounded-full grayscale transition-[filter] duration-500 hover:grayscale-0"
                      animate={{
                        opacity: index === activeIndex ? 1 : 0,
                        zIndex: index === activeIndex ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <NextImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className="relative pl-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 top-0 w-px bg-accent"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originY: 0 }}
                    />
                    <span className="block text-sm font-medium tracking-wide text-foreground">
                      {currentTestimonial.author}
                    </span>
                    <span className="mt-0.5 block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      {currentTestimonial.role} - {currentTestimonial.company}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="relative mt-16 h-px overflow-hidden bg-border">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          <motion.div
            className="absolute bottom-8 left-6 flex items-center gap-2 sm:left-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.4 : 0.2 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Click anywhere</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}