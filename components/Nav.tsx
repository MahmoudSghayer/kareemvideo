"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/providers/LangProvider";
import type { I18nKey } from "@/lib/i18n";

const LINKS: { id: string; key: I18nKey }[] = [
  { id: "about", key: "nav_about" },
  { id: "work", key: "nav_work" },
  { id: "skills", key: "nav_skills" },
  { id: "experience", key: "nav_exp" },
  { id: "services", key: "nav_services" },
];

export function Nav() {
  const { t, lang, toggle } = useLang();
  const navRef = useRef<HTMLElement | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  // scrub width + nav blur (imperative — high frequency)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - innerHeight;
      const p = h > 0 ? y / h : 0;
      if (scrubRef.current) scrubRef.current.style.width = p * 100 + "%";
      const nav = navRef.current;
      if (nav) {
        if (y > 40) {
          nav.style.background = "rgba(8,9,12,.72)";
          nav.style.backdropFilter = "blur(14px)";
          (nav.style as CSSStyleDeclaration).setProperty("-webkit-backdrop-filter", "blur(14px)");
          nav.style.borderBottomColor = "rgba(255,255,255,.08)";
          nav.style.paddingTop = "12px";
          nav.style.paddingBottom = "12px";
        } else {
          nav.style.background = "transparent";
          nav.style.backdropFilter = "none";
          nav.style.borderBottomColor = "transparent";
          nav.style.paddingTop = "18px";
          nav.style.paddingBottom = "18px";
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((ent) => {
          if (ent.isIntersecting) setActive(ent.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const mono = { fontFamily: "var(--font-mono), monospace" } as const;

  return (
    <>
      {/* scroll scrubber */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          zIndex: 9995,
          background: "rgba(255,255,255,.06)",
        }}
      >
        <div
          ref={scrubRef}
          style={{
            height: "100%",
            width: "0%",
            background: "linear-gradient(90deg,#FF6A2C,#33CFD6)",
            boxShadow: "0 0 14px rgba(51,207,214,.6)",
            transition: "width .1s linear",
          }}
        />
      </div>

      {/* nav */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px clamp(18px,5vw,64px)",
          transition: "background .4s,backdrop-filter .4s,border-color .4s,padding .4s",
          borderBottom: "1px solid transparent",
        }}
      >
        <a href="#home" data-magnetic style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: "var(--font-anton), sans-serif",
              fontSize: 22,
              letterSpacing: ".02em",
              color: "#F2EFE8",
              textTransform: "uppercase",
            }}
          >
            KA
          </span>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: 100,
              background: "#FF6A2C",
              boxShadow: "0 0 10px #FF6A2C",
            }}
          />
        </a>

        <div data-navlinks style={{ alignItems: "center", gap: 30 }}>
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-navlink
              style={{
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: ".04em",
                color: active === l.id ? "#F2EFE8" : "#9AA0AA",
                transition: "color .3s",
              }}
            >
              {t(l.key)}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            data-lang-toggle
            onClick={toggle}
            aria-label="Toggle language"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "none",
              border: "1px solid rgba(255,255,255,.16)",
              borderRadius: 100,
              padding: "7px 12px",
              color: "#F2EFE8",
              ...mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".08em",
              transition: "border-color .3s,color .3s",
            }}
          >
            <span style={{ color: lang === "ar" ? "#6B7079" : "#F2EFE8" }}>EN</span>
            <span style={{ color: "#3a3d44" }}>/</span>
            <span style={{ color: lang === "ar" ? "#F2EFE8" : "#6B7079" }}>ع</span>
          </button>

          <a
            href="#contact"
            data-magnetic
            data-cursor="say hi"
            data-navcta
            style={{
              padding: "10px 20px",
              background: "#F2EFE8",
              color: "#08090C",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: ".02em",
            }}
          >
            {t("cta_talk")}
          </a>

          <button
            data-burger
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{
              flexDirection: "column",
              gap: 5,
              background: "none",
              border: "none",
              padding: 6,
            }}
          >
            <span style={{ width: 24, height: 2, background: "#F2EFE8", display: "block" }} />
            <span style={{ width: 24, height: 2, background: "#F2EFE8", display: "block" }} />
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <div
        data-mobilemenu
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 8999,
          background: "rgba(8,9,12,.98)",
          backdropFilter: "blur(8px)",
          display: menuOpen ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-anton), sans-serif",
              fontSize: 38,
              textTransform: "uppercase",
              color: "#F2EFE8",
            }}
          >
            {t(l.key)}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "var(--font-anton), sans-serif",
            fontSize: 38,
            textTransform: "uppercase",
            color: "#FF6A2C",
          }}
        >
          {t("nav_contact")}
        </a>
      </div>
    </>
  );
}
