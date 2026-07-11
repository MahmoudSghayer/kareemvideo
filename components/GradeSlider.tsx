"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import { Reveal } from "@/components/util/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const mono = { fontFamily: "var(--font-mono), monospace" } as const;

export function GradeSlider() {
  const { t } = useLang();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);

  // initGrade() — pointer drag (clamp 2–98) + auto-nudge ±22% once on view.
  useEffect(() => {
    const wrap = wrapRef.current;
    const top = topRef.current;
    const dv = divRef.current;
    if (!wrap) return;
    let drag = false;
    const set = (p: number) => {
      p = Math.max(2, Math.min(98, p));
      if (top) top.style.clipPath = "inset(0 " + (100 - p) + "% 0 0)";
      if (dv) dv.style.left = p + "%";
    };
    set(50);
    const fromX = (x: number) => {
      const r = wrap.getBoundingClientRect();
      set(((x - r.left) / r.width) * 100);
    };
    const onDown = (e: PointerEvent) => {
      drag = true;
      fromX(e.clientX);
      try {
        wrap.setPointerCapture(e.pointerId);
      } catch {}
    };
    const onMove = (e: PointerEvent) => {
      if (drag) fromX(e.clientX);
    };
    const onUp = () => {
      drag = false;
    };
    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);

    let io: IntersectionObserver | null = null;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let t0: number | null = null;
      const dur = 1500;
      const anim = (now: number) => {
        if (drag) return;
        if (!t0) t0 = now;
        const p = Math.min(1, (now - t0) / dur);
        set(50 + Math.sin(p * Math.PI * 2) * 22);
        if (p < 1) requestAnimationFrame(anim);
        else set(50);
      };
      io = new IntersectionObserver(
        (ents) => {
          ents.forEach((ent) => {
            if (ent.isIntersecting) {
              io?.unobserve(ent.target);
              requestAnimationFrame(anim);
            }
          });
        },
        { threshold: 0.4 }
      );
      io.observe(wrap);
    }

    return () => {
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      io?.disconnect();
    };
  }, []);

  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(70px,10vh,130px) clamp(18px,5vw,64px)",
        background: "#0A0B0F",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div>
            <div
              style={{
                ...mono,
                fontSize: 12,
                color: "#33CFD6",
                letterSpacing: ".24em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {t("grade_label")}
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "var(--font-anton), sans-serif",
                fontWeight: 400,
                fontSize: "clamp(30px,5vw,68px)",
                lineHeight: 0.95,
                textTransform: "uppercase",
                color: "#F2EFE8",
              }}
            >
              {t("grade_h1")} <span style={{ color: "#6B7079" }}>{t("grade_h2")}</span>
            </h2>
          </div>
          <p style={{ maxWidth: "38ch", margin: 0, color: "#9AA0AA", fontSize: 14, lineHeight: 1.6 }}>
            {t("grade_p")}
          </p>
        </Reveal>

        <motion.div
          ref={wrapRef}
          data-grade-wrap
          data-cursor="drag"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
          transition={{ duration: 0.95, ease: EASE }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            borderRadius: 10,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,.1)",
            touchAction: "none",
            userSelect: "none",
          }}
        >
          <Image
            src="/assets/kareem.png"
            alt="Graded frame"
            fill
            draggable={false}
            sizes="(max-width: 1200px) 100vw, 1200px"
            style={{
              objectFit: "cover",
              objectPosition: "50% 20%",
              filter: "contrast(1.2) saturate(1.38) brightness(1.0)",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(120deg,rgba(51,207,214,.32),transparent 46%,rgba(255,106,44,.34))",
              mixBlendMode: "overlay",
            }}
          />
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 130px 22px rgba(0,0,0,.55)" }}
          />
          <div ref={topRef} data-grade-top style={{ position: "absolute", inset: 0, clipPath: "inset(0 50% 0 0)" }}>
            <Image
              src="/assets/kareem.png"
              alt="Ungraded frame"
              fill
              draggable={false}
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{
                objectFit: "cover",
                objectPosition: "50% 20%",
                filter: "saturate(.36) contrast(.84) brightness(1.09)",
              }}
            />
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(126,128,140,.07)" }} />
          </div>
          <span
            dir="ltr"
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              padding: "6px 12px",
              background: "rgba(8,9,12,.6)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,.16)",
              borderRadius: 100,
              ...mono,
              fontSize: 11,
              letterSpacing: ".14em",
              color: "#cfd3da",
            }}
          >
            {t("grade_raw")} · LOG
          </span>
          <span
            dir="ltr"
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              padding: "6px 12px",
              background: "rgba(255,106,44,.16)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,106,44,.4)",
              borderRadius: 100,
              ...mono,
              fontSize: 11,
              letterSpacing: ".14em",
              color: "#ffb98c",
            }}
          >
            {t("grade_graded")} · REC.709
          </span>
          <div
            ref={divRef}
            data-grade-div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 2,
              background: "#F2EFE8",
              transform: "translateX(-1px)",
              boxShadow: "0 0 16px rgba(0,0,0,.7)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: 46,
                height: 46,
                borderRadius: 100,
                background: "#F2EFE8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 22px rgba(0,0,0,.5)",
              }}
            >
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                <path
                  d="M7 1L2 6L7 11M15 1L20 6L15 11"
                  stroke="#08090C"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <span
            dir="ltr"
            style={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              ...mono,
              fontSize: 10,
              letterSpacing: ".16em",
              color: "rgba(242,239,232,.72)",
              pointerEvents: "none",
            }}
          >
            {t("grade_hint")}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
