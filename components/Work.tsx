"use client";

import { useLang } from "@/providers/LangProvider";
import { Reveal } from "@/components/util/Reveal";
import { SectionTag } from "@/components/util/SectionTag";
import { projects, BEHANCE_PROFILE, type Project } from "@/lib/projects";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;
const anton = "var(--font-anton), sans-serif";

function Layers({ p }: { p: Project }) {
  return (
    <>
      <div
        aria-hidden="true"
        data-proj-grade
        style={{ position: "absolute", inset: 0, background: p.grade, backgroundSize: "180% 180%" }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg,transparent 0 2px,rgba(0,0,0,.16) 2px 3px)",
          opacity: 0.5,
        }}
      />
      <div
        aria-hidden="true"
        data-proj-sheen
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "40%",
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,.09),transparent)",
          transform: "translateX(-140%) skewX(-18deg)",
        }}
      />
    </>
  );
}

function chipStyle(p: Project): React.CSSProperties {
  const small = p.variant === "small";
  if (p.chipBadge) {
    return {
      padding: "5px 10px",
      background: "rgba(255,106,44,.16)",
      border: "1px solid rgba(255,106,44,.4)",
      borderRadius: 100,
      fontSize: 10,
      fontWeight: 700,
      color: "#ffb98c",
    };
  }
  return {
    padding: small ? "5px 10px" : "6px 12px",
    background: "rgba(8,9,12,.5)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 100,
    fontSize: small ? 10 : 11,
    fontWeight: 600,
    color: "#cfd3da",
  };
}

function FeatureCard({ p }: { p: Project }) {
  return (
    <Reveal
      as="a"
      href={p.href}
      target="_blank"
      rel="noopener"
      data-proj
      data-cursor={p.cursor}
      style={{
        ["--proj-col" as string]: `span ${p.colSpan}`,
        gridColumn: `span ${p.colSpan}`,
        position: "relative",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.09)",
        aspectRatio: p.aspect,
        background: p.bg,
        display: "block",
      }}
    >
      <Layers p={p} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(22px,3vw,42px)",
        }}
      >
        <div
          aria-hidden="true"
          data-proj-play
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: 1,
            width: 78,
            height: 78,
            borderRadius: 100,
            border: "1px solid rgba(255,255,255,.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(8,9,12,.32)",
            backdropFilter: "blur(3px)",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: -1,
              borderRadius: 100,
              border: "1px solid rgba(255,106,44,.55)",
              animation: "pulseRing 2.4s ease-out infinite",
            }}
          />
          <svg width="20" height="23" viewBox="0 0 20 23" fill="none">
            <path d="M1 1.5L19 11.5L1 21.5V1.5Z" fill="#F2EFE8" />
          </svg>
        </div>
        <div
          dir="ltr"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 18 }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 13px",
              background: "rgba(8,9,12,.55)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: 100,
              ...mono,
              fontSize: 11,
              letterSpacing: ".1em",
              color: "#F2EFE8",
            }}
          >
            <span style={{ color: "#FF6A2C" }}>●</span> FEATURED · SHOWREEL
          </span>
          <span style={{ ...mono, fontSize: 11, letterSpacing: ".1em", color: "rgba(242,239,232,.7)" }}>
            {p.index}
          </span>
        </div>
        <div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {p.featuredChips?.map((c) => (
              <span
                key={c}
                style={{
                  padding: "6px 12px",
                  background: "rgba(8,9,12,.5)",
                  border: "1px solid rgba(255,255,255,.14)",
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: ".04em",
                  color: "#cfd3da",
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div style={{ ...mono, fontSize: 12, letterSpacing: ".14em", color: p.metaColor, marginBottom: 8 }}>
                {p.meta}
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: anton,
                  fontWeight: 400,
                  fontSize: "clamp(30px,5.4vw,72px)",
                  lineHeight: 0.92,
                  textTransform: "uppercase",
                  color: "#F2EFE8",
                }}
              >
                {p.title}
              </h3>
            </div>
            <span
              data-proj-cta
              style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 700, color: "#F2EFE8", opacity: 0.85 }}
            >
              Watch on Behance{" "}
              <span
                style={{
                  display: "inline-flex",
                  width: 34,
                  height: 34,
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,.3)",
                  borderRadius: 100,
                }}
              >
                ↗
              </span>
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function StandardCard({ p }: { p: Project }) {
  const small = p.variant === "small";
  const pad = small ? "clamp(18px,2vw,26px)" : "clamp(20px,2.4vw,32px)";
  return (
    <Reveal
      as="a"
      href={p.href}
      target="_blank"
      rel="noopener"
      delay={p.rd}
      data-proj
      data-cursor={p.cursor}
      style={{
        ["--proj-col" as string]: `span ${p.colSpan}`,
        gridColumn: `span ${p.colSpan}`,
        position: "relative",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.09)",
        aspectRatio: p.aspect,
        background: p.bg,
        display: "block",
      }}
    >
      <Layers p={p} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: pad,
        }}
      >
        <div dir="ltr" style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={chipStyle(p)}>{p.chip}</span>
          <span style={{ ...mono, fontSize: small ? 10 : 11, color: "rgba(242,239,232,.6)" }}>{p.index}</span>
        </div>
        <div>
          <div
            style={{
              ...mono,
              fontSize: small ? 10 : 11,
              letterSpacing: small ? ".12em" : ".14em",
              color: p.metaColor,
              marginBottom: 6,
            }}
          >
            {p.meta}
          </div>
          <h3
            style={{
              margin: p.cta ? "0 0 8px" : 0,
              fontFamily: anton,
              fontWeight: 400,
              fontSize: small ? "clamp(22px,2.4vw,32px)" : "clamp(24px,3.2vw,42px)",
              lineHeight: 0.94,
              textTransform: "uppercase",
              color: "#F2EFE8",
            }}
          >
            {p.title}
          </h3>
          {p.cta ? (
            <span
              data-proj-cta
              style={{ fontSize: 13, fontWeight: 700, color: "#F2EFE8", opacity: 0, transition: "opacity .3s" }}
            >
              Watch on Behance ↗
            </span>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <section
      id="work"
      style={{
        position: "relative",
        padding: "clamp(80px,12vh,150px) clamp(18px,5vw,64px)",
        maxWidth: 1400,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          marginBottom: 56,
        }}
      >
        <div>
          <SectionTag num="02" labelKey="sec_work" />
          <Reveal
            as="h2"
            style={{
              margin: 0,
              fontFamily: anton,
              fontWeight: 400,
              fontSize: "clamp(34px,6vw,84px)",
              lineHeight: 0.95,
              letterSpacing: "-.01em",
              textTransform: "uppercase",
              color: "#F2EFE8",
            }}
          >
            {t("work_h")}
          </Reveal>
        </div>
        <Reveal
          as="a"
          href={BEHANCE_PROFILE}
          target="_blank"
          rel="noopener"
          data-magnetic
          data-cursor="behance"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "13px 22px",
            border: "1px solid rgba(255,255,255,.2)",
            borderRadius: 100,
            color: "#F2EFE8",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {t("work_all")}
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "clamp(16px,2vw,26px)" }}>
        {projects.map((p) =>
          p.variant === "feature" ? <FeatureCard key={p.id} p={p} /> : <StandardCard key={p.id} p={p} />
        )}
      </div>
    </section>
  );
}
