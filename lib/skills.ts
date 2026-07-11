import type { I18nKey } from "./i18n";

// Software meters — exact values / gradients from the reference.
export interface Meter {
  name: string;
  value: number;
  gradient: string; // bar fill
  rd: number;
}

export const meters: Meter[] = [
  {
    name: "Adobe Premiere Pro",
    value: 95,
    gradient: "linear-gradient(90deg,#FF6A2C,#FFB07A)",
    rd: 0,
  },
  {
    name: "After Effects",
    value: 88,
    gradient: "linear-gradient(90deg,#FF6A2C,#FFB07A)",
    rd: 60,
  },
  {
    name: "CapCut",
    value: 92,
    gradient: "linear-gradient(90deg,#33CFD6,#8fe8ec)",
    rd: 120,
  },
  {
    name: "Topaz AI (Enhance)",
    value: 85,
    gradient: "linear-gradient(90deg,#33CFD6,#8fe8ec)",
    rd: 180,
  },
];

// Craft chips reference i18n keys (craft_1 … craft_8).
export const craftKeys: I18nKey[] = [
  "craft_1",
  "craft_2",
  "craft_3",
  "craft_4",
  "craft_5",
  "craft_6",
  "craft_7",
  "craft_8",
];

// AI-tool pills.
export const aiTools = ["Veo 3", "Grok", "Gemini", "Whisk", "Nano Banana"];

// Services (S01–S06) — title/blurb via i18n keys.
export interface Service {
  no: string;
  titleKey: I18nKey;
  bodyKey: I18nKey;
  rd: number;
}

export const services: Service[] = [
  { no: "S01", titleKey: "svc1_t", bodyKey: "svc1_p", rd: 0 },
  { no: "S02", titleKey: "svc2_t", bodyKey: "svc2_p", rd: 40 },
  { no: "S03", titleKey: "svc3_t", bodyKey: "svc3_p", rd: 80 },
  { no: "S04", titleKey: "svc4_t", bodyKey: "svc4_p", rd: 0 },
  { no: "S05", titleKey: "svc5_t", bodyKey: "svc5_p", rd: 40 },
  { no: "S06", titleKey: "svc6_t", bodyKey: "svc6_p", rd: 80 },
];

// Ongoing courses (Scene 03).
export const courses = [
  "Premiere Pro & After Effects — CreativeLive / Udemy",
  "Video Post-Production Workshop",
  "Editing & Filmmaking Masterclass — Coursera",
  "Content Creation for TikTok, YouTube, IG & FB — Coursera",
  "CapCut Video Editing — Udemy",
];
