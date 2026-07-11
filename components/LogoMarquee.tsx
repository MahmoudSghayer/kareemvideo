"use client";

import { marqueeLogos } from "@/lib/clients";

function Group({ hidden }: { hidden?: boolean }) {
  return (
    <div
      data-marq-group
      aria-hidden={hidden || undefined}
      style={{ display: "flex", alignItems: "center", gap: 60, paddingRight: 60 }}
    >
      {marqueeLogos.map((l, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${l.logo}-${i}`}
          src={`/assets/logos/${l.logo}.png`}
          alt={hidden ? "" : l.alt}
          data-marq-logo
          style={{ height: l.height, width: "auto", opacity: 0.46 }}
        />
      ))}
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div
      style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,.07)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        padding: "26px 0",
        overflow: "hidden",
        background: "#0A0B0F",
      }}
    >
      <div
        data-marquee
        style={{ display: "flex", width: "max-content", animation: "marq 36s linear infinite" }}
      >
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
