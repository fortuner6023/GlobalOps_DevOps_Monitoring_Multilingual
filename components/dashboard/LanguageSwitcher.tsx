"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LANGUAGES } from "@/lib/utils";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleSelect = (code: string) => {
    setOpen(false);
    setLanguage(code);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent transition-colors"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.name}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-card shadow-lg animate-slide-in">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent ${
                  lang.code === language ? "bg-accent text-foreground" : "text-muted-foreground"
                } first:rounded-t-lg last:rounded-b-lg`}
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
                {lang.code === language && (
                  <span className="ml-auto text-primary">&#10003;</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
