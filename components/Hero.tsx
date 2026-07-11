"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import { loaderSignal } from "@/lib/loaderSignal";

export function Hero() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Masked headline + hero chrome reveal (ported from revealHero()), gated on loader.
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reveal = () => {
      const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-line]"));
      lines.forEach((l, i) => {
        l.style.transitionDelay = i * 0.11 + "s";
        requestAnimationFrame(() => {
          l.style.transform = "translateY(0)";
        });
      });
      const fx = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-fx]"));
      fx.forEach((el, i) => {
        el.style.transition =
          "opacity 1s ease " +
          (0.35 + i * 0.09) +
          "s, transform 1s cubic-bezier(.16,1,.3,1) " +
          (0.35 + i * 0.09) +
          "s";
        el.style.transform = "translateY(14px)";
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    };
    if (loaderSignal.get()) reveal();
    const unsub = loaderSignal.subscribe(reveal);
    return () => unsub();
  }, []);

  // Particle field — ported verbatim from initParticles(). Paused off-screen.
  useEffect(() => {
    const cv = canvasRef.current;
    const root = sectionRef.current;
    if (!cv || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let w = 0,
      h = 0,
      dpr = 1;
    let parts: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      c: string;
    }[] = [];
    let raf: number | null = null;
    let active = true;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const N = Math.min(46, Math.floor(w / 26));
    for (let i = 0; i < N; i++) {
      parts.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.4 + 0.6,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -(Math.random() * 0.35 + 0.08),
        a: Math.random() * 0.5 + 0.15,
        c: Math.random() > 0.5 ? "255,106,44" : "51,207,214",
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, "rgba(" + p.c + "," + p.a + ")");
        g.addColorStop(1, "rgba(" + p.c + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      if (active) raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(
      (ents) => {
        ents.forEach((ent) => {
          active = ent.isIntersecting;
          if (active && !raf) draw();
          if (!active && raf) {
            cancelAnimationFrame(raf);
            raf = null;
          }
        });
      },
      { threshold: 0 }
    );
    io.observe(root);

    let onParallax: ((e: MouseEvent) => void) | null = null;
    if (window.matchMedia("(pointer: fine)").matches) {
      onParallax = (e: MouseEvent) => {
        const cx = e.clientX / innerWidth - 0.5;
        const cy = e.clientY / innerHeight - 0.5;
        cv.style.transform = `translate(${cx * 18}px,${cy * 18}px)`;
      };
      root.addEventListener("mousemove", onParallax);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
      if (onParallax) root.removeEventListener("mousemove", onParallax);
    };
  }, []);

  const mono = { fontFamily: "var(--font-mono), monospace" } as const;
  const lineBase: React.CSSProperties = {
    display: "block",
    transform: "translateY(110%)",
    transition: "transform 1.05s cubic-bezier(.16,1,.3,1)",
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px clamp(18px,5vw,64px) 90px",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        data-particles
        style={{ position: "absolute", inset: 0, zIndex: 0, width: "100%", height: "100%" }}
      />
      {/* radial glows */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "60vw",
          height: "60vw",
          maxWidth: 820,
          maxHeight: 820,
          zIndex: 0,
          background: "radial-gradient(circle,rgba(255,106,44,.16),transparent 62%)",
          filter: "blur(20px)",
          animation: "glowPulse 7s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: "52vw",
          height: "52vw",
          maxWidth: 720,
          maxHeight: 720,
          zIndex: 0,
          background: "radial-gradient(circle,rgba(51,207,214,.14),transparent 62%)",
          filter: "blur(20px)",
          animation: "glowPulse 9s ease-in-out infinite",
        }}
      />
      {/* grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 45%,#000,transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 45%,#000,transparent 78%)",
        }}
      />

      {/* letterbox bars */}
      <div
        data-hero-fx
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(28px,6vh,64px)",
          zIndex: 1,
          background: "linear-gradient(#000,transparent)",
          opacity: 0,
        }}
      />
      <div
        data-hero-fx
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "clamp(28px,6vh,64px)",
          zIndex: 1,
          background: "linear-gradient(transparent,#000)",
          opacity: 0,
        }}
      />

      {/* chrome corners */}
      <div
        data-hero-fx
        dir="ltr"
        style={{
          position: "absolute",
          top: 96,
          left: "clamp(18px,5vw,64px)",
          zIndex: 2,
          ...mono,
          fontSize: 11,
          letterSpacing: ".16em",
          color: "#6B7079",
          opacity: 0,
        }}
      >
        <span style={{ color: "#FF6A2C", animation: "blink 1.4s step-end infinite" }}>●</span> REC
        &nbsp; <span>00:00:14:22</span>
      </div>
      <div
        data-hero-fx
        dir="ltr"
        style={{
          position: "absolute",
          top: 96,
          right: "clamp(18px,5vw,64px)",
          zIndex: 2,
          ...mono,
          fontSize: 11,
          letterSpacing: ".16em",
          color: "#6B7079",
          textAlign: "right",
          opacity: 0,
        }}
      >
        SHOWREEL / 2025 &nbsp;·&nbsp; ISO 800 &nbsp;·&nbsp; 24FPS
      </div>

      {/* content */}
      <div style={{ position: "relative", zIndex: 3, maxWidth: 1320, width: "100%", margin: "0 auto" }}>
        <div
          data-hero-fx
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 26,
            opacity: 0,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 14px",
              border: "1px solid rgba(74,222,128,.3)",
              borderRadius: 100,
              background: "rgba(74,222,128,.06)",
              ...mono,
              fontSize: 11,
              letterSpacing: ".1em",
              color: "#9be8b4",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 100,
                background: "#4ade80",
                animation: "pulseDot 2.4s infinite",
              }}
            />
            <span>{t("hero_avail")}</span>
          </span>
          <span
            style={{
              ...mono,
              fontSize: 12,
              letterSpacing: ".14em",
              color: "#8A8F98",
              textTransform: "uppercase",
            }}
          >
            {t("hero_role")}
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-anton), sans-serif",
            fontWeight: 400,
            lineHeight: 0.88,
            letterSpacing: "-.02em",
            fontSize: "clamp(50px,11.2vw,196px)",
            textTransform: "uppercase",
            color: "#F2EFE8",
          }}
        >
          <span style={{ display: "block", overflow: "hidden", paddingBottom: ".05em" }}>
            <span data-hero-line style={lineBase}>
              {t("hero_l1")}
            </span>
          </span>
          <span style={{ display: "block", overflow: "hidden", paddingBottom: ".05em" }}>
            <span data-hero-line style={lineBase}>
              {t("hero_l2")}
            </span>
          </span>
          <span style={{ display: "block", overflow: "hidden", paddingBottom: ".05em" }}>
            <span
              data-hero-line
              style={{
                ...lineBase,
                background: "linear-gradient(100deg,#FF6A2C,#FFB07A 42%,#33CFD6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t("hero_l3")}
            </span>
          </span>
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 36,
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <p
            data-hero-fx
            style={{
              maxWidth: 520,
              margin: 0,
              fontSize: "clamp(15px,1.5vw,18px)",
              lineHeight: 1.65,
              color: "#B6BAC2",
              opacity: 0,
            }}
          >
            {t("hero_sub")}
          </p>
          <div data-hero-fx style={{ display: "flex", flexWrap: "wrap", gap: 14, opacity: 0 }}>
            <a
              href="#work"
              data-magnetic
              data-cursor="watch"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "16px 26px",
                background: "#FF6A2C",
                color: "#08090C",
                borderRadius: 100,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: ".01em",
                boxShadow: "0 10px 40px rgba(255,106,44,.3)",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  width: 22,
                  height: 22,
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#08090C",
                  borderRadius: 100,
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1 0.5L8 4.5L1 8.5V0.5Z" fill="#FF6A2C" />
                </svg>
              </span>
              <span>{t("btn_reel")}</span>
            </a>
            <a
              href="#contact"
              data-magnetic
              data-cursor="hire"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "16px 26px",
                border: "1px solid rgba(255,255,255,.22)",
                borderRadius: 100,
                color: "#F2EFE8",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              {t("btn_hire")}
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        data-hero-fx
        style={{
          position: "absolute",
          bottom: 26,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          opacity: 0,
        }}
      >
        <span
          style={{
            ...mono,
            fontSize: 10,
            letterSpacing: ".28em",
            color: "#6B7079",
            textTransform: "uppercase",
          }}
        >
          {t("scroll")}
        </span>
        <span
          style={{
            position: "relative",
            width: 1,
            height: 46,
            background: "rgba(255,255,255,.14)",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "40%",
              background: "#FF6A2C",
              animation: "scan 1.8s cubic-bezier(.6,0,.4,1) infinite",
            }}
          />
        </span>
      </div>
    </section>
  );
}
