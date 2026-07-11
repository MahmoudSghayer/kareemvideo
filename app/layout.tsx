import type { Metadata, Viewport } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/providers/LangProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import { personJsonLd } from "@/lib/jsonld";
import { SITE_URL, social } from "@/lib/site";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const archivo = Archivo({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});
const mono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Kareem Anis — Cairo-based video editor, colorist and motion designer. 4+ years turning footage into cinematic stories for automotive, food, medical and creator brands.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Kareem Anis — Video Editor & Colorist",
  description,
  applicationName: "Kareem Anis Portfolio",
  authors: [{ name: "Kareem Anis" }],
  creator: "Kareem Anis",
  keywords: [
    "Kareem Anis",
    "video editor",
    "colorist",
    "motion designer",
    "Cairo",
    "Premiere Pro",
    "After Effects",
    "color grading",
    "MENA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Kareem Anis — Video Editor & Colorist",
    description,
    siteName: "Kareem Anis",
    locale: "en_US",
    images: [
      {
        url: "/assets/kareem.png",
        width: 1200,
        height: 1500,
        alt: "Kareem Anis — Video Editor & Colorist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Anis — Video Editor & Colorist",
    description,
    images: ["/assets/kareem.png"],
  },
  other: {
    "contact:email": social.email,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${anton.variable} ${archivo.variable} ${mono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LangProvider>
          <LenisProvider>{children}</LenisProvider>
        </LangProvider>
      </body>
    </html>
  );
}
