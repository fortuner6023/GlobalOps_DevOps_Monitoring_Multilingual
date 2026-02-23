import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "GlobalOps - DevOps Monitoring In Every Language",
  description:
    "Real-time DevOps monitoring dashboard with multi-language support powered by Lingo.dev",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read the locale cookie server-side so LingoProvider gets the correct
  // initialLocale on both server and client render — no hydration mismatch.
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      {/* suppressHydrationWarning on body prevents warnings from browser
          extensions (e.g. Grammarly) that inject attributes into <body>. */}
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <Providers initialLocale={locale}>{children}</Providers>
      </body>
    </html>
  );
}