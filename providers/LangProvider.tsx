"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translate, type I18nKey, type Lang } from "@/lib/i18n";

interface LangCtx {
  lang: Lang;
  toggle: () => void;
  t: (key: I18nKey) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    // Mirror the reference: dir + font family on the #site root; lang on <html>.
    const site = document.getElementById("site");
    if (site) site.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), []);
  const t = useCallback((key: I18nKey) => translate(lang, key), [lang]);

  const value = useMemo(() => ({ lang, toggle, t }), [lang, toggle, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
