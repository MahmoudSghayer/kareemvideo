"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisCtx {
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number }) => void;
}

const Ctx = createContext<LenisCtx | null>(null);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // No smooth scroll under reduced motion; still refresh triggers.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Centralized in-page anchor interception (matches reference: 70px offset).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href") || "";
      if (id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      scrollTo(target as HTMLElement, { offset: -70 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo: LenisCtx["scrollTo"] = (target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: opts?.offset ?? 0 });
      return;
    }
    // reduced-motion / no lenis fallback
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (typeof target !== "string") {
      const y = target.getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0);
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      const el = document.querySelector(target);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY + (opts?.offset ?? 0);
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return <Ctx.Provider value={{ scrollTo }}>{children}</Ctx.Provider>;
}

export function useSmoothScroll() {
  return useContext(Ctx);
}
