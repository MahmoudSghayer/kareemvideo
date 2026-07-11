"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/providers/LangProvider";
import { Reveal } from "@/components/util/Reveal";
import { SectionTag } from "@/components/util/SectionTag";
import { courses } from "@/lib/skills";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;
const anton = "var(--font-anton), sans-serif";

const dotLeft =
  "calc(-1 * clamp(38px,6vw,72px) + clamp(14px,2.4vw,26px) - 6px)";

function Dot({ color }: { color: string }) {
  return (
    <span
      data-dot
      style={{
        position: "absolute",
        left: dotLeft,
        top: 4,
        width: 14,
        height: 14,
        borderRadius: 100,
        background: "#08090C",
        border: `2px solid ${color}`,
        transition: "box-shadow .4s,background .4s",
      }}
    />
  );
}

export function Timeline() {
  const { t } = useLang();
  const tlRef = useRef<HTMLDivElement | null>(null);
  const phRef = useRef<HTMLDivElement | null>(null);

  // initTimeline() — scroll-driven playhead + dot lighting (driven by ScrollTrigger).
  useEffect(() => {
    const tl = tlRef.current;
    const ph = phRef.current;
    if (!tl || !ph) return;
    gsap.registerPlugin(ScrollTrigger);
    const scenes = Array.from(tl.querySelectorAll<HTMLElement>("[data-scene]"));

    const update = () => {
      const r = tl.getBoundingClientRect();
      const vh = innerHeight;
      const start = vh * 0.7;
      const end = vh * 0.2;
      let p = (start - r.top) / (r.height + (start - end));
      p = Math.max(0, Math.min(1, p));
      ph.style.height = p * r.height + "px";
      const active = Math.floor(p * scenes.length + 0.15);
      scenes.forEach((sc, i) => {
        const dot = sc.querySelector<HTMLElement>("[data-dot]");
        if (!dot) return;
        if (i <= active && p > 0.02) {
          dot.style.background = dot.style.borderColor;
          dot.style.boxShadow = "0 0 16px " + dot.style.borderColor;
        } else {
          dot.style.background = "#08090C";
          dot.style.boxShadow = "none";
        }
      });
    };

    const st = ScrollTrigger.create({
      trigger: tl,
      start: "top bottom",
      end: "bottom top",
      onUpdate: update,
      onRefresh: update,
    });
    update();
    return () => {
      st.kill();
    };
  }, []);

  return (
    <section
      id="experience"
      style={{
        position: "relative",
        padding: "clamp(80px,12vh,150px) clamp(18px,5vw,64px)",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <SectionTag num="04" labelKey="sec_exp" />
      <Reveal
        as="h2"
        style={{
          margin: "0 0 64px",
          fontFamily: anton,
          fontWeight: 400,
          fontSize: "clamp(34px,6vw,84px)",
          lineHeight: 0.95,
          letterSpacing: "-.01em",
          textTransform: "uppercase",
          color: "#F2EFE8",
        }}
      >
        {t("exp_h")}
      </Reveal>

      <div ref={tlRef} data-timeline style={{ position: "relative", paddingLeft: "clamp(38px,6vw,72px)" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "clamp(14px,2.4vw,26px)",
            top: 6,
            bottom: 6,
            width: 2,
            background: "rgba(255,255,255,.1)",
          }}
        />
        <div
          aria-hidden="true"
          ref={phRef}
          data-playhead
          style={{
            position: "absolute",
            left: "clamp(14px,2.4vw,26px)",
            top: 6,
            width: 2,
            height: 0,
            background: "linear-gradient(#FF6A2C,#33CFD6)",
            boxShadow: "0 0 12px rgba(255,106,44,.6)",
          }}
        />

        {/* scene 1 */}
        <Reveal data-scene style={{ position: "relative", marginBottom: 44 }}>
          <Dot color="#FF6A2C" />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
            <span dir="ltr" style={{ ...mono, fontSize: 12, letterSpacing: ".1em", color: "#FF6A2C" }}>
              2024 — PRESENT
            </span>
            <span style={{ ...mono, fontSize: 11, color: "#6B7079" }}>SCENE 01</span>
          </div>
          <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.6vw,28px)", color: "#F2EFE8" }}>
            {t("exp1_t")}
          </h3>
          <div style={{ fontSize: 14, color: "#8A8F98", marginBottom: 14 }}>{t("exp1_s")}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
            {(["exp1_b1", "exp1_b2", "exp1_b3", "exp1_b4"] as const).map((k) => (
              <li key={k} style={{ display: "flex", gap: 10, color: "#B6BAC2", fontSize: 15, lineHeight: 1.5 }}>
                <span style={{ color: "#33CFD6", flex: "none" }}>→</span>
                <span>{t(k)}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* scene 2 */}
        <Reveal delay={60} data-scene style={{ position: "relative", marginBottom: 44 }}>
          <Dot color="#33CFD6" />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
            <span dir="ltr" style={{ ...mono, fontSize: 12, letterSpacing: ".1em", color: "#33CFD6" }}>
              2020 — 2024
            </span>
            <span style={{ ...mono, fontSize: 11, color: "#6B7079" }}>SCENE 02</span>
          </div>
          <h3 style={{ margin: "0 0 6px", fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.6vw,28px)", color: "#F2EFE8" }}>
            {t("exp2_t")}
          </h3>
          <div style={{ fontSize: 14, color: "#8A8F98", marginBottom: 14 }}>{t("exp2_s")}</div>
          <p style={{ margin: 0, color: "#B6BAC2", fontSize: 15, lineHeight: 1.6, maxWidth: "60ch" }}>{t("exp2_b1")}</p>
        </Reveal>

        {/* scene 3 */}
        <Reveal delay={120} data-scene style={{ position: "relative" }}>
          <Dot color="#8A8F98" />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
            <span dir="ltr" style={{ ...mono, fontSize: 12, letterSpacing: ".1em", color: "#8A8F98" }}>
              ONGOING
            </span>
            <span style={{ ...mono, fontSize: 11, color: "#6B7079" }}>SCENE 03</span>
          </div>
          <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-archivo), sans-serif", fontWeight: 700, fontSize: "clamp(20px,2.6vw,28px)", color: "#F2EFE8" }}>
            {t("exp3_t")}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {courses.map((c) => (
              <span
                key={c}
                style={{
                  padding: "8px 14px",
                  background: "#0E1015",
                  border: "1px solid rgba(255,255,255,.12)",
                  borderRadius: 100,
                  fontSize: 13,
                  color: "#cfd3da",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
