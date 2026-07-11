"use client";

import { useEffect, useRef } from "react";

// Custom cursor — ported from initCursor(). Pointer-fine only.
export function Cursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    if (!ring || !dot) return;

    ring.style.display = "flex";
    dot.style.display = "block";

    let mx = innerWidth / 2,
      my = innerHeight / 2,
      rx = mx,
      ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const big = (txt: string, accent?: string) => {
      ring.style.width = txt ? "auto" : "58px";
      ring.style.height = "58px";
      ring.style.padding = txt ? "0 16px" : "0";
      ring.style.background = accent || "rgba(242,239,232,.95)";
      ring.style.borderColor = "transparent";
      if (label) {
        label.textContent = txt || "";
        label.style.opacity = txt ? "1" : "0";
      }
    };
    const small = () => {
      ring.style.width = "38px";
      ring.style.height = "38px";
      ring.style.padding = "0";
      ring.style.background = "transparent";
      ring.style.borderColor = "rgba(242,239,232,.6)";
      if (label) label.style.opacity = "0";
    };
    const generic = () => {
      ring.style.width = "58px";
      ring.style.height = "58px";
      ring.style.background = "rgba(242,239,232,.14)";
      ring.style.borderColor = "rgba(242,239,232,.5)";
    };

    const cursorEls = Array.from(document.querySelectorAll<HTMLElement>("[data-cursor]"));
    const enterFns: Array<[HTMLElement, () => void, () => void]> = [];
    cursorEls.forEach((el) => {
      const onEnter = () => big((el.getAttribute("data-cursor") || "").toUpperCase(), "#FF6A2C");
      const onLeave = small;
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      enterFns.push([el, onEnter, onLeave]);
    });

    const genEls = Array.from(
      document.querySelectorAll<HTMLElement>("a, button, [data-magnetic]")
    ).filter((el) => !el.hasAttribute("data-cursor"));
    genEls.forEach((el) => {
      el.addEventListener("mouseenter", generic);
      el.addEventListener("mouseleave", small);
    });

    const onDown = () => (ring.style.opacity = ".6");
    const onUp = () => (ring.style.opacity = "1");
    const onDocLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onDocEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
      enterFns.forEach(([el, a, b]) => {
        el.removeEventListener("mouseenter", a);
        el.removeEventListener("mouseleave", b);
      });
      genEls.forEach((el) => {
        el.removeEventListener("mouseenter", generic);
        el.removeEventListener("mouseleave", small);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: 38,
          height: 38,
          margin: "-19px 0 0 -19px",
          border: "1px solid rgba(242,239,232,.6)",
          borderRadius: 100,
          pointerEvents: "none",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          transition:
            "width .25s cubic-bezier(.16,1,.3,1),height .25s cubic-bezier(.16,1,.3,1),background .25s,border-color .25s",
          backdropFilter: "invert(6%)",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: ".14em",
            color: "#08090C",
            textTransform: "uppercase",
            opacity: 0,
            whiteSpace: "nowrap",
          }}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          width: 5,
          height: 5,
          margin: "-2.5px 0 0 -2.5px",
          background: "#FF6A2C",
          borderRadius: 100,
          pointerEvents: "none",
          display: "none",
        }}
      />
    </>
  );
}
