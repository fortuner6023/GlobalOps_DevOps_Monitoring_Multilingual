"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getLanguageFromStorage, setLanguageInStorage } from "./utils";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState("en");
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    setLanguageState(getLanguageFromStorage());
  }, []);

  const setLanguage = (lang: string) => {
    if (lang === language) return;
    setLanguageInStorage(lang);
    setLanguageState(lang);
    setIsSwitching(true);
    // Brief delay so the overlay renders before reload
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
