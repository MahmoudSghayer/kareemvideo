"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import { Reveal } from "@/components/util/Reveal";
import { SectionTag } from "@/components/util/SectionTag";
import { meters, craftKeys, aiTools } from "@/lib/skills";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;
const anton = "var(--font-anton), sans-serif";

export function Skills() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement | null>(null);
  const eqRef = useRef<HTMLDivElement | null>(null);

  // initMeters() — animate width on view.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-meter]"));
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((ent) => {
          if (ent.isIntersecting) {
            const el = ent.target as HTMLElement;
            el.style.width = el.getAttribute("data-meter") + "%";
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // initEq() — 42 bars, barPulse.
  useEffect(() => {
    const wrap = eqRef.current;
    if (!wrap || wrap.childElementCount > 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const n = 42;
    for (let i = 0; i < n; i++) {
      const b = document.createElement("span");
      const c = i % 3 === 0 ? "#FF6A2C" : i % 3 === 1 ? "#33CFD6" : "#4a4e57";
      b.style.cssText =
        "flex:1;min-width:2px;background:" +
        c +
        ";border-radius:2px;transform-origin:bottom;height:100%;transform:scaleY(" +
        (0.15 + Math.random() * 0.85) +
        ");";
      if (!reduced)
        b.style.animation =
          "barPulse " + (0.6 + Math.random() * 1.1) + "s ease-in-out " + Math.random() * 1 + "s infinite";
      wrap.appendChild(b);
    }
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "clamp(80px,12vh,150px) clamp(18px,5vw,64px)",
        background: "#0A0B0F",
        borderTop: "1px solid rgba(255,255,255,.06)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionTag num="03" labelKey="sec_skills" />
        <Reveal
          as="h2"
          style={{
            margin: "0 0 60px",
            fontFamily: anton,
            fontWeight: 400,
            fontSize: "clamp(34px,6vw,84px)",
            lineHeight: 0.95,
            letterSpacing: "-.01em",
            textTransform: "uppercase",
            color: "#F2EFE8",
            maxWidth: "16ch",
          }}
        >
          {t("skills_h")}
        </Reveal>

        <div data-skills-grid style={{ display: "grid", gap: "clamp(30px,4vw,56px)" }}>
          {/* software meters */}
          <div>
            <div
              style={{ ...mono, fontSize: 12, letterSpacing: ".16em", color: "#33CFD6", marginBottom: 26, textTransform: "uppercase" }}
            >
              {t("skills_sw")}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              {meters.map((m) => (
                <Reveal key={m.name} delay={m.rd}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>{m.name}</span>
                    <span style={{ ...mono, fontSize: 12, color: "#8A8F98" }}>{m.value}</span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,.08)", borderRadius: 100, overflow: "hidden" }}>
                    <div
                      data-meter={m.value}
                      style={{
                        height: "100%",
                        width: 0,
                        background: m.gradient,
                        borderRadius: 100,
                        transition: "width 1.4s cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* craft */}
          <Reveal>
            <div
              style={{ ...mono, fontSize: 12, letterSpacing: ".16em", color: "#33CFD6", marginBottom: 26, textTransform: "uppercase" }}
            >
              {t("skills_craft")}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {craftKeys.map((k) => (
                <span
                  key={k}
                  data-craft-chip
                  style={{
                    padding: "11px 18px",
                    border: "1px solid rgba(255,255,255,.14)",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 500,
                    background: "#0E1015",
                  }}
                >
                  {t(k)}
                </span>
              ))}
            </div>

            {/* audio EQ deco */}
            <div
              style={{
                marginTop: 34,
                display: "flex",
                gap: 16,
                alignItems: "flex-end",
                height: 76,
                padding: "16px 18px",
                background: "#0E1015",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  ...mono,
                  fontSize: 10,
                  letterSpacing: ".14em",
                  color: "#6B7079",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                AUDIO
              </span>
              <div ref={eqRef} data-eq style={{ flex: 1, display: "flex", gap: 3, alignItems: "flex-end", height: "100%" }} />
            </div>
          </Reveal>

          {/* AI */}
          <Reveal>
            <div
              style={{ ...mono, fontSize: 12, letterSpacing: ".16em", color: "#33CFD6", marginBottom: 12, textTransform: "uppercase" }}
            >
              {t("skills_ai")}
            </div>
            <p style={{ margin: "0 0 22px", color: "#9AA0AA", fontSize: 14, lineHeight: 1.6, maxWidth: "60ch" }}>
              {t("skills_ai_p")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {aiTools.map((a) => (
                <span
                  key={a}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 18px",
                    border: "1px solid rgba(255,106,44,.3)",
                    borderRadius: 100,
                    fontSize: 14,
                    fontWeight: 600,
                    background: "rgba(255,106,44,.06)",
                    color: "#ffcbab",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: 100, background: "#FF6A2C" }} />
                  {a}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
