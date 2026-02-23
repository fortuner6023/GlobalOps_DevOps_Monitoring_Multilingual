import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLanguageFromStorage(): string {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("globalops-language") || "en";
}

export function setLanguageInStorage(language: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("globalops-language", language);
  // Also set the 'locale' cookie that LingoProvider's getClientLocale() reads
  document.cookie = `locale=${language}; path=/; max-age=31536000; SameSite=Lax`;
}

export type LogLevel = "ERROR" | "WARNING" | "INFO" | "DEBUG";
export type AlertSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type BadgeVariant = "destructive" | "warning" | "default" | "secondary" | "success";

export function getLevelColor(level: LogLevel): BadgeVariant {
  const map: Record<LogLevel, BadgeVariant> = {
    ERROR: "destructive",
    WARNING: "warning",
    INFO: "default",
    DEBUG: "secondary",
  };
  return map[level] || "default";
}

export function getSeverityColor(severity: AlertSeverity): BadgeVariant {
  const map: Record<AlertSeverity, BadgeVariant> = {
    CRITICAL: "destructive",
    HIGH: "warning",
    MEDIUM: "default",
    LOW: "secondary",
  };
  return map[severity] || "default";
}

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
] as const;
