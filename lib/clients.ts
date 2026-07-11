// 9-client logo wall — exact values from the reference markup.
// NOTE: industries for Yazan / Reveera / VIP Gate are inferred from their
// logos (flagged for client confirmation). `symbol.png` is marquee-only.

export interface Client {
  logo: string; // filename in /assets/logos
  alt: string;
  name: string;
  industry: string;
  href?: string; // linked clients open Behance
  maxHeight: number; // px
  rd: number; // reveal stagger (ms)
  inferred?: boolean;
}

export const clients: Client[] = [
  {
    logo: "masterkey",
    alt: "Master Key Automotive",
    name: "Master Key Automotive",
    industry: "AUTOMOTIVE · EGYPT",
    href: "https://www.behance.net/gallery/245557631/EGYPT-Master-Key-Automotive-BMW-M4",
    maxHeight: 54,
    rd: 0,
  },
  {
    logo: "makfm",
    alt: "MAKFM Automotive",
    name: "MAKFM Automotive",
    industry: "AUTOMOTIVE · KUWAIT",
    href: "https://www.behance.net/gallery/252239343/Kuwait-MAKFM-Automotive-GWM-TANK-700",
    maxHeight: 44,
    rd: 40,
  },
  {
    logo: "wans",
    alt: "WANS Café",
    name: "WANS Café",
    industry: "CAFÉ & RESTAURANT · KSA",
    href: "https://www.behance.net/gallery/249892759/Saudi-Arabia-WANS-Cafe-Restaurant",
    maxHeight: 52,
    rd: 80,
  },
  {
    logo: "jazorakw",
    alt: "JazoraKW",
    name: "JazoraKW",
    industry: "FOOD CREATOR · KUWAIT",
    href: "https://www.behance.net/gallery/252406361/Kuwait-jazorakw-Food-Blogger-Editing-Coloring",
    maxHeight: 56,
    rd: 0,
  },
  {
    logo: "almutamyz",
    alt: "Almutamyz",
    name: "Almutamyz",
    industry: "DENTAL & MEDICAL · KSA",
    href: "https://www.behance.net/gallery/244581137/Saudi-Arabia-Medical-Centers-Animated-Posts",
    maxHeight: 58,
    rd: 40,
  },
  {
    logo: "manis",
    alt: "Mohamed Anis",
    name: "Mohamed Anis",
    industry: "YOUTUBE CREATOR",
    maxHeight: 56,
    rd: 80,
  },
  {
    logo: "yazan",
    alt: "Yazan Dental Clinic",
    name: "Yazan Dental Clinic",
    industry: "DENTAL CLINIC",
    maxHeight: 46,
    rd: 0,
    inferred: true,
  },
  {
    logo: "reveera",
    alt: "Reveera",
    name: "Reveera",
    industry: "HEALTH & WELLNESS",
    maxHeight: 52,
    rd: 40,
    inferred: true,
  },
  {
    logo: "vipgate",
    alt: "VIP Gate",
    name: "VIP Gate",
    industry: "TRAVEL & AVIATION",
    maxHeight: 58,
    rd: 80,
    inferred: true,
  },
];

// Marquee logos (10, includes the unnamed `symbol` mark) with reference heights.
export interface MarqueeLogo {
  logo: string;
  alt: string;
  height: number;
}

export const marqueeLogos: MarqueeLogo[] = [
  { logo: "masterkey", alt: "Master Key Automotive", height: 44 },
  { logo: "makfm", alt: "MAKFM Automotive", height: 34 },
  { logo: "wans", alt: "WANS Café", height: 40 },
  { logo: "jazorakw", alt: "JazoraKW", height: 48 },
  { logo: "manis", alt: "Mohamed Anis", height: 46 },
  { logo: "almutamyz", alt: "Almutamyz", height: 50 },
  { logo: "yazan", alt: "Yazan Dental Clinic", height: 36 },
  { logo: "reveera", alt: "Reveera", height: 44 },
  { logo: "vipgate", alt: "VIP Gate", height: 50 },
  { logo: "symbol", alt: "Client mark", height: 46 },
];
