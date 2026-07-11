import { SITE_URL, social } from "./site";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kareem Anis",
  jobTitle: "Video Editor",
  url: SITE_URL,
  description:
    "Cairo-based video editor, colorist and motion designer with 4+ years turning footage into cinematic stories for automotive, food, medical and creator brands across the MENA region.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  email: `mailto:${social.email}`,
  knowsAbout: [
    "Video Editing",
    "Color Grading",
    "Motion Graphics",
    "Cinematic Editing",
    "AI Video Production",
  ],
  sameAs: [social.behance, social.instagram, social.tiktok, social.linkedin],
};
