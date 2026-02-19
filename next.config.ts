import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

// Lingo Compiler (Tool #1) - Translates entire Next.js UI at build time
let finalConfig: NextConfig = nextConfig;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { withLingo } = require("@lingo.dev/compiler/next");
  finalConfig = withLingo(nextConfig, {
    sourceRoot: "./app",
    sourceLocale: "en",
    targetLocales: ["es", "fr", "de", "ja", "zh"],
    models: "lingo.dev",
  });
} catch {
  // @lingo.dev/compiler may not be available in all environments.
  // Works correctly on Vercel deployment. Skipping locally if unavailable.
}

export default finalConfig;
