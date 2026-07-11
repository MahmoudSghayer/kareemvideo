"use client";

import { useLang } from "@/providers/LangProvider";
import { Reveal } from "@/components/util/Reveal";
import { SectionTag } from "@/components/util/SectionTag";
import { services } from "@/lib/skills";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;
const anton = "var(--font-anton), sans-serif";

export function Services() {
  const { t } = useLang();
  return (
    <section
      id="services"
      style={{
        position: "relative",
        padding: "clamp(80px,12vh,150px) clamp(18px,5vw,64px)",
        background: "#0A0B0F",
        borderTop: "1px solid rgba(255,255,255,.06)",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionTag num="05" labelKey="sec_services" />
        <Reveal
          as="h2"
          style={{
            margin: "0 0 56px",
            fontFamily: anton,
            fontWeight: 400,
            fontSize: "clamp(34px,6vw,84px)",
            lineHeight: 0.95,
            letterSpacing: "-.01em",
            textTransform: "uppercase",
            color: "#F2EFE8",
          }}
        >
          {t("services_h")}
        </Reveal>

        <div
          data-services-grid
          style={{
            display: "grid",
            gap: 1,
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {services.map((s) => (
            <Reveal key={s.no} delay={s.rd} data-svc style={{ background: "#0B0D11", padding: "clamp(24px,3vw,38px)" }}>
              <div style={{ ...mono, fontSize: 12, color: "#FF6A2C", marginBottom: 22 }}>{s.no}</div>
              <h3
                style={{
                  margin: "0 0 10px",
                  fontFamily: anton,
                  fontWeight: 400,
                  fontSize: "clamp(20px,2.3vw,28px)",
                  textTransform: "uppercase",
                  color: "#F2EFE8",
                }}
              >
                {t(s.titleKey)}
              </h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#9AA0AA" }}>{t(s.bodyKey)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
