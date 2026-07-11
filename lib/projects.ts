// 8 featured work cards — exact values ported from the reference markup.
// Cards are pure CSS "posters" (no image assets).

export const BEHANCE_PROFILE = "https://www.behance.net/kareemanis1";

export type ProjVariant = "feature" | "medium" | "small";

export interface Project {
  id: string;
  href: string;
  cursor: string;
  colSpan: 12 | 6 | 4;
  aspect: string; // e.g. "21 / 9"
  bg: string; // card background gradient
  grade: string; // data-proj-grade background
  variant: ProjVariant;
  rd: number; // reveal stagger delay (ms)
  // chip
  chip: string;
  chipBadge?: boolean; // orange badge style (100K+ views)
  featuredChips?: string[]; // feature card only
  metaColor: string;
  meta: string;
  title: string;
  index: string;
  cta: boolean; // shows "Watch on Behance" reveal-on-hover
}

export const projects: Project[] = [
  {
    id: "bmw",
    href: "https://www.behance.net/gallery/245557631/EGYPT-Master-Key-Automotive-BMW-M4",
    cursor: "view reel",
    colSpan: 12,
    aspect: "21 / 9",
    bg: "linear-gradient(125deg,#070c11,#0f2028 55%,#1a2a30)",
    grade:
      "radial-gradient(120% 120% at 78% 20%,rgba(51,207,214,.28),transparent 55%),radial-gradient(90% 90% at 10% 95%,rgba(255,106,44,.32),transparent 50%)",
    variant: "feature",
    rd: 0,
    chip: "",
    featuredChips: ["Automotive", "Cinematic Edit", "Color Grade"],
    metaColor: "#33CFD6",
    meta: "EGYPT · MASTER KEY AUTOMOTIVE",
    title: "BMW M4",
    index: "01 / 08",
    cta: true,
  },
  {
    id: "gwm",
    href: "https://www.behance.net/gallery/252239343/Kuwait-MAKFM-Automotive-GWM-TANK-700",
    cursor: "view reel",
    colSpan: 6,
    aspect: "16 / 11",
    bg: "linear-gradient(135deg,#0a0d12,#161b23)",
    grade:
      "radial-gradient(120% 120% at 80% 15%,rgba(160,180,200,.22),transparent 55%),radial-gradient(90% 90% at 15% 100%,rgba(255,140,60,.3),transparent 55%)",
    variant: "medium",
    rd: 60,
    chip: "Automotive · Ad",
    metaColor: "#f2a25a",
    meta: "KUWAIT · MAKFM AUTOMOTIVE",
    title: "GWM Tank 700",
    index: "02 / 08",
    cta: true,
  },
  {
    id: "jazora",
    href: "https://www.behance.net/gallery/252406361/Kuwait-jazorakw-Food-Blogger-Editing-Coloring",
    cursor: "view reel",
    colSpan: 6,
    aspect: "16 / 11",
    bg: "linear-gradient(135deg,#140a06,#2a1509)",
    grade:
      "radial-gradient(120% 120% at 78% 18%,rgba(255,180,80,.3),transparent 55%),radial-gradient(90% 90% at 12% 100%,rgba(210,50,30,.34),transparent 55%)",
    variant: "medium",
    rd: 120,
    chip: "Food · Reels",
    metaColor: "#ffb765",
    meta: "KUWAIT · JAZORAKW",
    title: "Food Blogger Edit",
    index: "03 / 08",
    cta: true,
  },
  {
    id: "viral",
    href: "https://www.behance.net/gallery/247601747/Viral-Short-Form-Edit-For-Content-Creator",
    cursor: "view reel",
    colSpan: 4,
    aspect: "3 / 4",
    bg: "linear-gradient(160deg,#12071c,#25103a)",
    grade:
      "radial-gradient(120% 120% at 75% 15%,rgba(190,80,255,.32),transparent 55%),radial-gradient(90% 90% at 15% 100%,rgba(255,60,150,.3),transparent 55%)",
    variant: "small",
    rd: 0,
    chip: "Short-Form",
    metaColor: "#d79bff",
    meta: "CONTENT CREATOR",
    title: "Viral Edit",
    index: "04",
    cta: false,
  },
  {
    id: "wans",
    href: "https://www.behance.net/gallery/249892759/Saudi-Arabia-WANS-Cafe-Restaurant",
    cursor: "view reel",
    colSpan: 4,
    aspect: "3 / 4",
    bg: "linear-gradient(160deg,#150d06,#2a1a0a)",
    grade:
      "radial-gradient(120% 120% at 78% 15%,rgba(224,162,74,.32),transparent 55%),radial-gradient(90% 90% at 15% 100%,rgba(120,60,20,.4),transparent 55%)",
    variant: "small",
    rd: 60,
    chip: "F&B · Promo",
    metaColor: "#e6b46a",
    meta: "SAUDI ARABIA",
    title: "WANS Café",
    index: "05",
    cta: false,
  },
  {
    id: "damsel",
    href: "https://www.behance.net/gallery/241987755/100K-Views-Damsel-(Elodie)-Tiktok-Edit-Style",
    cursor: "view reel",
    colSpan: 4,
    aspect: "3 / 4",
    bg: "linear-gradient(160deg,#0a0f16,#141d28)",
    grade:
      "radial-gradient(120% 120% at 76% 15%,rgba(90,150,220,.3),transparent 55%),radial-gradient(90% 90% at 15% 100%,rgba(255,120,50,.28),transparent 55%)",
    variant: "small",
    rd: 120,
    chip: "100K+ VIEWS",
    chipBadge: true,
    metaColor: "#8fb8e6",
    meta: "TIKTOK · EDIT STYLE",
    title: "Damsel — Elodie",
    index: "06",
    cta: false,
  },
  {
    id: "allcare",
    href: "https://www.behance.net/gallery/244581903/Saudi-Arabia-AllCare24-Medical-Center",
    cursor: "view reel",
    colSpan: 6,
    aspect: "16 / 9",
    bg: "linear-gradient(135deg,#05101a,#0a2236)",
    grade:
      "radial-gradient(120% 120% at 80% 15%,rgba(67,199,255,.3),transparent 55%),radial-gradient(90% 90% at 12% 100%,rgba(30,120,200,.34),transparent 55%)",
    variant: "medium",
    rd: 0,
    chip: "Healthcare · Brand",
    metaColor: "#66cfff",
    meta: "SAUDI ARABIA · ALLCARE24",
    title: "AllCare24 Medical",
    index: "07 / 08",
    cta: true,
  },
  {
    id: "animated",
    href: "https://www.behance.net/gallery/244581137/Saudi-Arabia-Medical-Centers-Animated-Posts",
    cursor: "view reel",
    colSpan: 6,
    aspect: "16 / 9",
    bg: "linear-gradient(135deg,#04121a,#0a2630)",
    grade:
      "radial-gradient(120% 120% at 78% 15%,rgba(51,207,214,.32),transparent 55%),radial-gradient(90% 90% at 12% 100%,rgba(40,180,160,.3),transparent 55%)",
    variant: "medium",
    rd: 60,
    chip: "Motion Graphics",
    metaColor: "#5fe0e6",
    meta: "SAUDI ARABIA · MEDICAL CENTERS",
    title: "Animated Posts",
    index: "08 / 08",
    cta: true,
  },
];
