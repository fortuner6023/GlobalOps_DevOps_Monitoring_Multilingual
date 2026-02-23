"use client";

// LingoProvider from @lingo.dev/compiler must be the outermost provider.
// The Lingo Compiler instruments ALL JSX text with useTranslation(),
// which requires LingoProvider to be present in the tree.
//
// initialLocale is read server-side from the 'locale' cookie (in layout.tsx)
// and passed to both LingoProvider (Compiler UI text) and LanguageProvider
// (dynamic API fetch language) — so server + client render agree from the
// start, with no hydration mismatch and no double API fetch.
import { LingoProvider } from "@lingo.dev/compiler/react/next";
import type { LocaleCode } from "lingo.dev/spec";
import { LanguageProvider } from "@/lib/language-context";

interface ProvidersProps {
  children: React.ReactNode;
  initialLocale: string;
}

export function Providers({ children, initialLocale }: ProvidersProps) {
  return (
    <LingoProvider initialLocale={initialLocale as LocaleCode}>
      <LanguageProvider initialLocale={initialLocale}>
        {children}
      </LanguageProvider>
    </LingoProvider>
  );
}