import { NextResponse } from "next/server";
import { social } from "@/lib/site";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const type = String(body.type || "").trim();
  const message = String(body.message || "").trim();
  const honeypot = String(body.company || "").trim(); // hidden anti-spam field

  // Bot filled the honeypot — pretend success, send nothing.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please fill in all fields correctly." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "Email service not configured." }, { status: 500 });
  }

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">New project brief — kareem.video</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(type || "—")}</p>
      <p><strong>Brief:</strong></p>
      <p style="white-space:pre-wrap;border-left:3px solid #FF6A2C;padding-left:12px">${escapeHtml(message)}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:18px 0" />
      <p style="font-size:12px;color:#888">Sent from the contact form at kareem.video · reply to answer ${escapeHtml(name)} directly.</p>
    </div>`;

  const text =
    `New project brief — kareem.video\n\n` +
    `Name: ${name}\nEmail: ${email}\nProject type: ${type || "—"}\n\nBrief:\n${message}\n`;

  const subject = `New brief — ${name}${type ? ` (${type})` : ""}`;
  const sendFrom = (from: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [social.inbox], reply_to: email, subject, html, text }),
    });

  try {
    // Preferred: branded sender on the verified domain.
    let res = await sendFrom("Kareem.video <contact@kareem.video>");
    // Fallback until the domain finishes verifying — Resend's shared sender can
    // still deliver to the account's own inbox, so briefs never get lost.
    if (!res.ok) {
      const firstDetail = await res.text().catch(() => "");
      console.warn("Resend primary send failed, falling back", res.status, firstDetail);
      res = await sendFrom("Kareem.video Contact <onboarding@resend.dev>");
    }

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend error", res.status, detail);
      return NextResponse.json({ ok: false, error: "Could not send right now. Please email me directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact route error", e);
    return NextResponse.json({ ok: false, error: "Could not send right now. Please email me directly." }, { status: 500 });
  }
}
