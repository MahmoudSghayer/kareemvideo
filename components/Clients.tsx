"use client";

import Image from "next/image";
import { useLang } from "@/providers/LangProvider";
import { Reveal } from "@/components/util/Reveal";
import { SectionTag } from "@/components/util/SectionTag";
import { clients, type Client } from "@/lib/clients";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;
const anton = "var(--font-anton), sans-serif";

const cellStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  padding: "clamp(26px,2.8vw,36px) 18px",
  border: "1px solid rgba(255,255,255,.1)",
  borderRadius: 10,
  background: "#0B0D11",
};

function CellInner({ c }: { c: Client }) {
  return (
    <>
      <div style={{ height: 58, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Image
          src={`/assets/logos/${c.logo}.png`}
          alt={c.alt}
          width={0}
          height={0}
          sizes="160px"
          style={{ maxHeight: c.maxHeight, maxWidth: "86%", width: "auto", height: "auto", opacity: 0.7 }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#F2EFE8" }}>{c.name}</div>
        <div style={{ ...mono, fontSize: 10.5, letterSpacing: ".08em", color: "#8A8F98", marginTop: 6 }}>
          {c.industry}
        </div>
      </div>
    </>
  );
}

export function Clients() {
  const { t } = useLang();
  return (
    <section
      id="clients"
      style={{
        position: "relative",
        padding: "clamp(80px,12vh,150px) clamp(18px,5vw,64px)",
        maxWidth: 1320,
        margin: "0 auto",
      }}
    >
      <SectionTag num="06" labelKey="sec_clients" />
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
          maxWidth: "18ch",
        }}
      >
        {t("clients_h")}
      </Reveal>

      <div data-clients-grid style={{ display: "grid", gap: "clamp(14px,2vw,22px)" }}>
        {clients.map((c) =>
          c.href ? (
            <Reveal
              key={c.logo}
              as="a"
              href={c.href}
              target="_blank"
              rel="noopener"
              delay={c.rd}
              data-client
              data-cursor="view"
              style={cellStyle}
            >
              <CellInner c={c} />
            </Reveal>
          ) : (
            <Reveal key={c.logo} delay={c.rd} data-client style={cellStyle}>
              <CellInner c={c} />
            </Reveal>
          )
        )}
      </div>
    </section>
  );
}
