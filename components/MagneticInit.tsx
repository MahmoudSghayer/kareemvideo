"use client";

import { useEffect } from "react";

// Global magnetic pull — ported verbatim from initMagnetic(): strength .32,
// pointer-fine only, disabled under reduced motion. Attaches to every
// [data-magnetic] element once on mount.
export function MagneticInit() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;

    const strength = 0.32;
    const cleanups: Array<() => void> = [];
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transition = "transform .1s linear";
        el.style.transform = `translate(${x}px,${y}px)`;
      };
      const onLeave = () => {
        el.style.transition = "transform .5s cubic-bezier(.16,1,.3,1)";
        el.style.transform = "translate(0,0)";
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
