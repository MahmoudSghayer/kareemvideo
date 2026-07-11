"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import { Reveal } from "@/components/util/Reveal";
import { SectionTag } from "@/components/util/SectionTag";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;

const counters = [
  { count: 4, suffix: "+", color: "#FF6A2C", labelKey: "stat_years", rd: 0 },
  { count: 8, suffix: "", color: "#33CFD6", labelKey: "stat_projects", rd: 60 },
  { count: 1, suffix: "M+", color: "#F2EFE8", labelKey: "stat_views", rd: 120 },
  { count: 10, suffix: "", color: "#F2EFE8", labelKey: "stat_brands", rd: 180 },
] as const;

export function About() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Tilt (initTilt) — pointer-fine, reduced-motion skip.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    )
      return;
    const el = root.querySelector<HTMLElement>("[data-tilt]");
    if (!el) return;
    el.style.transition = "transform .3s cubic-bezier(.16,1,.3,1)";
    el.style.transformStyle = "preserve-3d";
    const p = el.parentElement;
    if (!p) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - (r.top + r.height / 2)) / r.height) * -8;
      const ry = ((e.clientX - (r.left + r.width / 2)) / r.width) * 8;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    };
    p.addEventListener("mousemove", onMove);
    p.addEventListener("mouseleave", onLeave);
    return () => {
      p.removeEventListener("mousemove", onMove);
      p.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Counters (initCounters) — IO 0.6, ease ~1.6s, then final. Reduced → final now.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      els.forEach((el) => (el.textContent = el.getAttribute("data-count") || ""));
      return;
    }
    const run = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute("data-count") || "0");
      const dur = 1600;
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * e));
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = String(target);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((ent) => {
          if (ent.isIntersecting) {
            run(ent.target as HTMLElement);
            io.unobserve(ent.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "clamp(80px,12vh,150px) clamp(18px,5vw,64px)",
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      <SectionTag num="01" labelKey="sec_about" marginBottom={56} />

      <div
        data-about-grid
        style={{ display: "grid", gap: "clamp(40px,6vw,84px)", alignItems: "start" }}
      >
        {/* portrait */}
        <Reveal style={{ position: "relative" }}>
          <div
            data-tilt
            style={{
              position: "relative",
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.1)",
              aspectRatio: "4 / 5",
              background: "#111",
            }}
          >
            <Image
              src="/assets/kareem.png"
              alt="Kareem Anis, video editor"
              fill
              sizes="(max-width: 900px) 90vw, 40vw"
              priority
              style={{
                objectFit: "cover",
                objectPosition: "50% 20%",
                filter: "contrast(1.08) saturate(1.05)",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg,transparent 40%,rgba(8,9,12,.7))",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(115deg,rgba(255,106,44,.12),transparent 45%,rgba(51,207,214,.14))",
                mixBlendMode: "overlay",
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(0deg,transparent 0 3px,rgba(0,0,0,.14) 3px 4px)",
                opacity: 0.5,
              }}
            />
            <div
              dir="ltr"
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                right: 14,
                display: "flex",
                justifyContent: "space-between",
                ...mono,
                fontSize: 10,
                letterSpacing: ".14em",
                color: "rgba(242,239,232,.85)",
              }}
            >
              <span>
                <span style={{ color: "#FF6A2C" }}>●</span> A-CAM
              </span>
              <span>50mm · f1.8</span>
            </div>
            <div
              dir="ltr"
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                ...mono,
                fontSize: 10,
                letterSpacing: ".14em",
                color: "rgba(242,239,232,.85)",
              }}
            >
              CAIRO, EG · 30.04°N
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 64,
                height: 64,
                transform: "translate(-50%,-50%)",
                border: "1px solid rgba(255,255,255,.35)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -18,
              right: -10,
              background: "#08090C",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 100,
              padding: "10px 18px",
              display: "flex",
              alignItems: "center",
              gap: 9,
              boxShadow: "0 12px 40px rgba(0,0,0,.6)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 100,
                background: "#4ade80",
                animation: "pulseDot 2.4s infinite",
              }}
            />
            <span style={{ ...mono, fontSize: 11, letterSpacing: ".08em", color: "#cfd3da" }}>
              {t("about_open")}
            </span>
          </div>
        </Reveal>

        {/* bio */}
        <div>
          <Reveal
            as="h2"
            style={{
              margin: "0 0 28px",
              fontFamily: "var(--font-anton), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(30px,4.4vw,62px)",
              lineHeight: 1.02,
              letterSpacing: "-.01em",
              textTransform: "uppercase",
              color: "#F2EFE8",
            }}
          >
            {t("about_h1")}
            <br />
            <span style={{ color: "#6B7079" }}>{t("about_h2")}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={80}
            style={{ margin: "0 0 20px", fontSize: 16, lineHeight: 1.75, color: "#B6BAC2", maxWidth: "56ch" }}
          >
            {t("about_p1")}
          </Reveal>
          <Reveal
            as="p"
            delay={140}
            style={{ margin: "0 0 36px", fontSize: 16, lineHeight: 1.75, color: "#B6BAC2", maxWidth: "56ch" }}
          >
            {t("about_p2")}
          </Reveal>

          <Reveal
            delay={180}
            style={{ borderLeft: "2px solid #FF6A2C", padding: "4px 0 4px 20px", marginBottom: 44 }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-archivo), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(17px,2vw,22px)",
                lineHeight: 1.4,
                color: "#F2EFE8",
                fontStyle: "italic",
              }}
            >
              {t("about_quote")}
            </p>
          </Reveal>

          {/* counters */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 1,
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            {counters.map((c) => (
              <Reveal key={c.labelKey} delay={c.rd} style={{ background: "#0B0D11", padding: 24 }}>
                <div
                  style={{
                    fontFamily: "var(--font-anton), sans-serif",
                    fontSize: "clamp(34px,5vw,54px)",
                    color: c.color,
                    lineHeight: 1,
                  }}
                >
                  <span data-count={c.count}>0</span>
                  {c.suffix ? <span>{c.suffix}</span> : null}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: 11,
                    letterSpacing: ".12em",
                    color: "#8A8F98",
                    marginTop: 8,
                    textTransform: "uppercase",
                  }}
                >
                  {t(c.labelKey)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
