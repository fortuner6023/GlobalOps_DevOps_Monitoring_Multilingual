#!/usr/bin/env node
// Loads .env.local then runs `lingo.dev run`.
// Needed on Windows because .env.local is Next.js-only — the Lingo CLI
// doesn't read it automatically.

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const envFile = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envFile)) {
  const lines = fs.readFileSync(envFile, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (key) process.env[key] = val;
  }
  console.log("✓ Loaded .env.local");
} else {
  console.warn("⚠ No .env.local found — LINGODOTDEV_API_KEY must already be set");
}

const bin = path.join(__dirname, "..", "node_modules", ".bin", "lingo.dev.cmd");
try {
  execSync(`"${bin}" run`, { stdio: "inherit", env: process.env });
} catch {
  process.exit(1);
}
