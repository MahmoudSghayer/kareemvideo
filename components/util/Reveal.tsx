"use client";

import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type MotionTag = "div" | "a" | "h2" | "h3" | "p" | "form" | "li" | "span" | "section" | "article";

type RevealProps = {
  as?: MotionTag;
  delay?: number; // ms (mirrors data-rd)
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
} & { [key: `data-${string}`]: string | boolean | undefined };

// Standard reveal — ported from initReveal(): opacity 0→1 + translateY(30)→0,
// cubic-bezier(.16,1,.3,1) ~0.95s, IntersectionObserver ~12% threshold,
// per-element stagger via `delay`. Respects prefers-reduced-motion.
export const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  { as = "div", delay = 0, children, ...rest },
  ref
) {
  const reduced = useReducedMotion();
  const M = (motion as unknown as Record<string, React.ElementType>)[as];

  if (reduced) {
    return (
      <M ref={ref} {...rest}>
        {children}
      </M>
    );
  }

  return (
    <M
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.95, ease: EASE, delay: delay / 1000 }}
      {...rest}
    >
      {children}
    </M>
  );
});
