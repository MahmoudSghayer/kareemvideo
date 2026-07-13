"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import { useSmoothScroll } from "@/providers/LenisProvider";
import { tc } from "@/lib/timecode";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;

export function Footer() {
  const { t } = useLang();
  const smooth = useSmoothScroll();
  const tcRef = useRef<HTMLSpanElement | null>(null);
  const year = new Date().getFullYear();

  // Runtime timecode — footTc = tc(p * 252) on scroll (from initNav/initMisc).
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - innerHeight;
      const p = h > 0 ? y / h : 0;
      if (tcRef.current) tcRef.current.textContent = tc(p * 252);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    if (smooth) smooth.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,.08)",
        padding: "clamp(50px,7vw,80px) clamp(18px,5vw,64px) 40px",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 30,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-anton), sans-serif",
              fontSize: "clamp(52px,12vw,180px)",
              lineHeight: 0.82,
              letterSpacing: "-.02em",
              textTransform: "uppercase",
              color: "#F2EFE8",
            }}
          >
            KAREEM
            <br />
            <span style={{ color: "#1c1f26", WebkitTextStroke: "1px #33363e" }}>ANIS</span>
          </div>
          <button
            data-totop
            data-magnetic
            data-cursor="rewind"
            onClick={toTop}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 22px",
              border: "1px solid rgba(255,255,255,.2)",
              borderRadius: 100,
              background: "none",
              color: "#F2EFE8",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            <span style={mono}>◀◀</span> <span>{t("foot_top")}</span>
          </button>
        </div>
        <div
          data-foot-meta
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 16,
            paddingTop: 26,
            borderTop: "1px solid rgba(255,255,255,.07)",
            ...mono,
            fontSize: 12,
            letterSpacing: ".06em",
            color: "#6B7079",
          }}
        >
          <span>© {year} KAREEM ANIS · VIDEO EDITOR</span>
          <span>{t("foot_made")}</span>
          <span dir="ltr">
            RUNTIME <span ref={tcRef}>00:00:00:00</span>
          </span>
        </div>
        <div
          dir="ltr"
          style={{
            marginTop: 28,
            textAlign: "center",
            ...mono,
            fontSize: 13,
            letterSpacing: ".06em",
            color: "#9AA0AA",
          }}
        >
          Website made by{" "}
          <a href="https://devora.design" target="_blank" rel="noopener noreferrer">
            Devora.design
          </a>
        </div>
      </div>
    </footer>
  );
}
