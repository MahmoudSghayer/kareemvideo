"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/providers/LangProvider";
import { Reveal } from "@/components/util/Reveal";
import { SectionTag } from "@/components/util/SectionTag";
import { social } from "@/lib/site";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;
const anton = "var(--font-anton), sans-serif";

const labelStyle: React.CSSProperties = {
  ...mono,
  fontSize: 11,
  letterSpacing: ".12em",
  color: "#8A8F98",
  textTransform: "uppercase",
};
const inputStyle: React.CSSProperties = {
  background: "#0E1015",
  border: "1px solid rgba(255,255,255,.14)",
  borderRadius: 8,
  padding: "15px 16px",
  color: "#F2EFE8",
  fontSize: 15,
  outline: "none",
};
const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
  padding: "20px 22px",
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 10,
  background: "#0B0D11",
};
const socialStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "16px 18px",
  border: "1px solid rgba(255,255,255,.12)",
  borderRadius: 10,
  background: "#0B0D11",
  fontWeight: 600,
  fontSize: 14,
  color: "#F2EFE8",
};

export function Contact() {
  const { t } = useLang();
  const formRef = useRef<HTMLFormElement | null>(null);

  // initForm() — focus/blur border, required + email regex validation, success state.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const success = form.querySelector<HTMLElement>("[data-form-success]");
    const inputs = Array.from(form.querySelectorAll<HTMLElement>("[data-input]"));
    const onFocus = (e: Event) => ((e.target as HTMLElement).style.borderColor = "#FF6A2C");
    const onBlur = (e: Event) =>
      ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,.14)");
    inputs.forEach((i) => {
      i.addEventListener("focus", onFocus);
      i.addEventListener("blur", onBlur);
    });

    const errorEl = form.querySelector<HTMLElement>("[data-form-error]");
    const btn = form.querySelector<HTMLButtonElement>("button[type=submit]");
    const btnLabel = form.querySelector<HTMLElement>("[data-form-btn-label]");
    const defaultLabel = btnLabel?.textContent || "";

    const onSubmit = async (e: SubmitEvent) => {
      e.preventDefault();
      if (errorEl) errorEl.style.display = "none";
      let ok = true;
      const name = form.querySelector<HTMLInputElement>("[name=name]");
      const email = form.querySelector<HTMLInputElement>("[name=email]");
      const type = form.querySelector<HTMLSelectElement>("[name=type]");
      const msg = form.querySelector<HTMLTextAreaElement>("[name=message]");
      const honeypot = form.querySelector<HTMLInputElement>("[name=company]");
      [name, email, msg].forEach((f) => {
        if (!f) return;
        const bad =
          !f.value.trim() ||
          ((f as HTMLInputElement).type === "email" &&
            !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
        f.style.borderColor = bad ? "#ff4d4d" : "rgba(255,255,255,.14)";
        if (bad) ok = false;
      });
      if (!ok) return;

      // sending state
      if (btn) {
        btn.disabled = true;
        btn.style.opacity = "0.75";
      }
      if (btnLabel) btnLabel.textContent = "Sending…";

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name?.value ?? "",
            email: email?.value ?? "",
            type: type?.value ?? "",
            message: msg?.value ?? "",
            company: honeypot?.value ?? "",
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
        if (res.ok && data.ok) {
          form.querySelectorAll<HTMLElement>("[data-field]").forEach((f) => {
            f.style.transition = "opacity .4s, height .4s";
            f.style.opacity = ".4";
          });
          if (btn) btn.style.display = "none";
          if (success) success.style.display = "flex";
        } else {
          throw new Error(data.error || "Could not send. Please try again.");
        }
      } catch (err) {
        if (errorEl) {
          errorEl.textContent = err instanceof Error ? err.message : "Could not send. Please try again.";
          errorEl.style.display = "flex";
        }
        if (btn) {
          btn.disabled = false;
          btn.style.opacity = "1";
        }
        if (btnLabel) btnLabel.textContent = defaultLabel;
      }
    };
    form.addEventListener("submit", onSubmit);

    return () => {
      inputs.forEach((i) => {
        i.removeEventListener("focus", onFocus);
        i.removeEventListener("blur", onBlur);
      });
      form.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "clamp(80px,12vh,150px) clamp(18px,5vw,64px)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90vw",
          height: "60vh",
          background: "radial-gradient(ellipse at center,rgba(255,106,44,.1),transparent 65%)",
          filter: "blur(10px)",
        }}
      />
      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <SectionTag num="07" labelKey="sec_contact" center />
        <Reveal
          as="h2"
          style={{
            margin: "0 0 20px",
            textAlign: "center",
            fontFamily: anton,
            fontWeight: 400,
            fontSize: "clamp(38px,8vw,120px)",
            lineHeight: 0.92,
            letterSpacing: "-.01em",
            textTransform: "uppercase",
            color: "#F2EFE8",
          }}
        >
          {t("contact_h1")}
          <br />
          <span
            style={{
              background: "linear-gradient(100deg,#FF6A2C,#FFB07A 45%,#33CFD6)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t("contact_h2")}
          </span>
        </Reveal>
        <Reveal style={{ display: "flex", justifyContent: "center", marginBottom: 56 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 18px",
              border: "1px solid rgba(74,222,128,.3)",
              borderRadius: 100,
              background: "rgba(74,222,128,.06)",
              ...mono,
              fontSize: 12,
              letterSpacing: ".08em",
              color: "#9be8b4",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 100, background: "#4ade80", animation: "pulseDot 2.4s infinite" }} />
            {t("contact_avail")}
          </span>
        </Reveal>

        <div data-contact-grid style={{ display: "grid", gap: "clamp(30px,4vw,56px)", alignItems: "start" }}>
          {/* form */}
          <Reveal as="form" ref={formRef} data-form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div data-field style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={labelStyle}>{t("form_name")}</label>
              <input data-input name="name" type="text" placeholder="e.g. Layla Hassan" style={inputStyle} />
            </div>
            <div data-field style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={labelStyle}>{t("form_email")}</label>
              <input data-input name="email" type="email" placeholder="you@studio.com" style={inputStyle} />
            </div>
            <div data-field style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={labelStyle}>{t("form_type")}</label>
              <select data-input name="type" style={inputStyle}>
                <option>Commercial / Brand Film</option>
                <option>Short-Form / Reels</option>
                <option>YouTube / Long-Form</option>
                <option>Color Grading</option>
                <option>Motion Graphics</option>
                <option>AI Video Campaign</option>
                <option>Other</option>
              </select>
            </div>
            <div data-field style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label style={labelStyle}>{t("form_msg")}</label>
              <textarea
                data-input
                name="message"
                rows={4}
                placeholder="Tell me about the footage, the vibe, the deadline…"
                style={{ ...inputStyle, resize: "vertical", fontFamily: "var(--font-archivo), sans-serif" }}
              />
            </div>
            {/* honeypot — hidden from users, catches bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />
            <button
              type="submit"
              data-magnetic
              data-cursor="send"
              style={{
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 11,
                padding: "17px 26px",
                background: "#FF6A2C",
                color: "#08090C",
                border: "none",
                borderRadius: 100,
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: ".01em",
                boxShadow: "0 10px 40px rgba(255,106,44,.28)",
              }}
            >
              <span data-form-btn-label>{t("form_send")}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="#08090C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              data-form-success
              style={{
                display: "none",
                alignItems: "center",
                gap: 10,
                padding: 16,
                background: "rgba(74,222,128,.08)",
                border: "1px solid rgba(74,222,128,.3)",
                borderRadius: 8,
                color: "#9be8b4",
                fontSize: 14,
              }}
            >
              <span style={{ fontSize: 18 }}>✓</span>
              <span>{t("form_ok")}</span>
            </div>
            <div
              data-form-error
              style={{
                display: "none",
                alignItems: "center",
                gap: 10,
                padding: 16,
                background: "rgba(255,77,77,.08)",
                border: "1px solid rgba(255,77,77,.35)",
                borderRadius: 8,
                color: "#ff9b9b",
                fontSize: 14,
              }}
            />
          </Reveal>

          {/* direct */}
          <Reveal delay={80} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <a href={`mailto:${social.email}`} data-contact-row data-cursor="email" style={rowStyle}>
              <div>
                <div style={{ ...mono, fontSize: 11, color: "#8A8F98", letterSpacing: ".1em", marginBottom: 5 }}>EMAIL</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#F2EFE8" }}>{social.email}</div>
              </div>
              <span style={{ color: "#FF6A2C", fontSize: 18 }}>↗</span>
            </a>
            <a href={social.whatsapp} target="_blank" rel="noopener" data-contact-row data-cursor="whatsapp" style={rowStyle}>
              <div>
                <div style={{ ...mono, fontSize: 11, color: "#8A8F98", letterSpacing: ".1em", marginBottom: 5 }}>WHATSAPP</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#F2EFE8" }}>{social.whatsappDisplay}</div>
              </div>
              <span style={{ color: "#FF6A2C", fontSize: 18 }}>↗</span>
            </a>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14, marginTop: 6 }}>
              <a href={social.behance} target="_blank" rel="noopener" data-contact-row data-cursor="behance" style={socialStyle}>
                Behance
              </a>
              <a href={social.instagram} target="_blank" rel="noopener" data-contact-row data-cursor="instagram" style={socialStyle}>
                Instagram
              </a>
              <a href={social.tiktok} target="_blank" rel="noopener" data-contact-row data-cursor="tiktok" style={socialStyle}>
                TikTok
              </a>
              <a href={social.linkedin} target="_blank" rel="noopener" data-contact-row data-cursor="linkedin" style={socialStyle}>
                LinkedIn
              </a>
            </div>
            <div style={{ marginTop: 8, padding: "20px 22px", border: "1px dashed rgba(255,255,255,.14)", borderRadius: 10 }}>
              <div style={{ ...mono, fontSize: 11, color: "#8A8F98", letterSpacing: ".1em", marginBottom: 6 }}>BASED IN</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#F2EFE8" }}>
                Cairo, Egypt · <span style={{ color: "#8A8F98" }}>available worldwide, remote</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
