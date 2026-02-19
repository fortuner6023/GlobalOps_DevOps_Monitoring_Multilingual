"use client";

// LingoProvider from @lingo.dev/compiler must be the outermost provider.
// The Lingo Compiler instruments ALL JSX text with useTranslation(),
// which requires LingoProvider to be present in the tree.
import { LingoProvider } from "@lingo.dev/compiler/react/next";
import { LanguageProvider } from "@/lib/language-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LingoProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </LingoProvider>
  );
}
