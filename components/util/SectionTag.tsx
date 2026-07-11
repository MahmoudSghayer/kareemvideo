"use client";

import { useLang } from "@/providers/LangProvider";
import { Reveal } from "./Reveal";
import type { I18nKey } from "@/lib/i18n";

const mono = { fontFamily: "var(--font-mono), monospace" } as const;

// The "NN — Label" section eyebrow. `center` mirrors the Contact section.
export function SectionTag({
  num,
  labelKey,
  center,
  marginBottom = 22,
}: {
  num: string;
  labelKey: I18nKey;
  center?: boolean;
  marginBottom?: number;
}) {
  const { t } = useLang();
  return (
    <Reveal
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom,
        justifyContent: center ? "center" : undefined,
      }}
    >
      <span style={{ ...mono, fontSize: 12, color: "#FF6A2C", letterSpacing: ".1em" }}>{num}</span>
      <span style={{ width: 34, height: 1, background: "rgba(255,255,255,.2)" }} />
      <span
        style={{
          ...mono,
          fontSize: 12,
          letterSpacing: ".24em",
          color: "#8A8F98",
          textTransform: "uppercase",
        }}
      >
        {t(labelKey)}
      </span>
    </Reveal>
  );
}
