"use client";

import { createContext, useContext, useState } from "react";
import { setLanguageInStorage } from "./utils";

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isSwitching: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  isSwitching: false,
});

interface LanguageProviderProps {
  children: React.ReactNode;
  /** Initial locale read server-side from the 'locale' cookie by layout.tsx.
   *  Passed through Providers so the state is correct from the very first
   *  render — no useEffect flash, no double API fetch. */
  initialLocale?: string;
}

export function LanguageProvider({
  children,
  initialLocale = "en",
}: LanguageProviderProps) {
  // Initialize directly from the server-supplied locale — no useEffect needed.
  const [language, setLanguageState] = useState(initialLocale);
  const [isSwitching, setIsSwitching] = useState(false);

  const setLanguage = (lang: string) => {
    if (lang === language) return;
    // Persist to both localStorage and the 'locale' cookie (for LingoProvider).
    setLanguageInStorage(lang);
    setLanguageState(lang);
    setIsSwitching(true);
    // Brief delay so the overlay renders before the page reload.
    setTimeout(() => window.location.reload(), 350);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isSwitching }}>
      {isSwitching && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Switching language…</p>
          </div>
        </div>
      )}
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}