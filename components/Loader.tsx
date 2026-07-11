"use client";

import { useEffect, useRef } from "react";
import { tc } from "@/lib/timecode";
import { loaderSignal } from "@/lib/loaderSignal";

// Loading screen — ported from initLoader(). Once per session (sessionStorage),
// skipped for prefers-reduced-motion.
export function Loader() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const tcRef = useRef<HTMLSpanElement | null>(null);
  const pctRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const bar = barRef.current;
    const tcEl = tcRef.current;
    const pctEl = pctRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const done = () => {
      if (loader) {
        loader.style.transition =
          "opacity .6s ease, transform .8s cubic-bezier(.7,0,.2,1)";
        loader.style.transform = "translateY(-100%)";
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => {
          if (loader) loader.style.display = "none";
        }, 850);
      }
      loaderSignal.fire();
    };

    const already = (() => {
      try {
        return sessionStorage.getItem("ka_loaded") === "1";
      } catch {
        return false;
      }
    })();

    if (reduced || already) {
      if (bar) bar.style.transform = "scaleX(1)";
      done();
      return;
    }
    try {
      sessionStorage.setItem("ka_loaded", "1");
    } catch {}

    const dur = 1900;
    const t0 = performance.now();
    const total = 4.2;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      if (bar) bar.style.transform = "scaleX(" + e + ")";
      if (pctEl) pctEl.textContent = Math.round(e * 100) + "%";
      if (tcEl) tcEl.textContent = tc(e * total);
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(done, 220);
    };
    raf = requestAnimationFrame(step);

    return () => cancelAnimationFrame(raf);
  }, []);

  const mono = { fontFamily: "var(--font-mono), monospace" } as const;

  return (
    <div
      ref={loaderRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#08090C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 26,
          left: 26,
          ...mono,
          fontSize: 11,
          letterSpacing: ".18em",
          color: "#6B7079",
        }}
      >
        <span style={{ color: "#FF6A2C" }}>●</span> REC &nbsp;·&nbsp; INGESTING FOOTAGE
      </div>
      <div
        style={{
          position: "absolute",
          top: 26,
          right: 26,
          ...mono,
          fontSize: 11,
          letterSpacing: ".18em",
          color: "#6B7079",
        }}
      >
        24.00 FPS
      </div>
      <div
        style={{
          fontFamily: "var(--font-anton), sans-serif",
          fontSize: "clamp(40px,9vw,120px)",
          lineHeight: 0.9,
          letterSpacing: "-.01em",
          textTransform: "uppercase",
          color: "#F2EFE8",
          textAlign: "center",
        }}
      >
        KAREEM<span style={{ color: "#FF6A2C" }}>.</span>ANIS
      </div>
      <div
        style={{
          width: "min(340px,64vw)",
          height: 2,
          background: "rgba(255,255,255,.1)",
          overflow: "hidden",
        }}
      >
        <div
          ref={barRef}
          style={{
            height: "100%",
            width: "100%",
            transform: "scaleX(0)",
            transformOrigin: "left",
            background: "linear-gradient(90deg,#FF6A2C,#33CFD6)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          gap: 20,
          alignItems: "center",
          ...mono,
          fontSize: 12,
          letterSpacing: ".16em",
          color: "#8A8F98",
        }}
      >
        <span ref={tcRef}>00:00:00:00</span>
        <span ref={pctRef} style={{ color: "#33CFD6" }}>
          0%
        </span>
      </div>
    </div>
  );
}
