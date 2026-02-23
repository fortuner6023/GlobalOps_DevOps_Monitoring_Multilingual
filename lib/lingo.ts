// Lingo SDK (Tool #3) - Runtime translation of dynamic content
import { LingoDotDevEngine } from "lingo.dev/sdk";
import { supabase } from "./supabase";
import type { Log, Alert } from "./supabase";
import { getMockTranslation } from "./mock-translations";

const lingoDotDev = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY!,
});

// --- Module-level in-memory cache (content-based key, not ID-based) ---------
// Shared across requests within the same server process.
// Key: `${targetLocale}:${text}`  Value: translated text
// This prevents the same string from being re-translated on every request
// even when Supabase translation_cache is unavailable.
const memCache = new Map<string, string>();

function memKey(text: string, locale: string): string {
  return `${locale}:${text}`;
}

// --- Supabase Translation Cache ---------------------------------------------

async function getCachedTranslation(
  contentId: string,
  contentType: string,
  targetLanguage: string
): Promise<string | null> {
  try {
    const { data } = await supabase
      .from("translation_cache")
      .select("translated_text")
      .eq("content_id", contentId)
      .eq("content_type", contentType)
      .eq("target_language", targetLanguage)
      .single();
    return data?.translated_text ?? null;
  } catch {
    return null;
  }
}

async function setCachedTranslation(
  contentId: string,
  contentType: string,
  sourceLanguage: string,
  targetLanguage: string,
  originalText: string,
  translatedText: string
): Promise<void> {
  try {
    await supabase.from("translation_cache").upsert(
      {
        content_id: contentId,
        content_type: contentType,
        source_language: sourceLanguage,
        target_language: targetLanguage,
        original_text: originalText,
        translated_text: translatedText,
      },
      { onConflict: "content_id,source_language,target_language,content_type" }
    );
  } catch {
    // Cache write failures are non-critical
  }
}

// --- Core Translation -------------------------------------------------------

export async function translateText(
  text: string,
  targetLocale: string,
  sourceLocale: string = "en"
): Promise<string> {
  if (targetLocale === sourceLocale) return text;

  // 1. Pre-translated mock table (zero API calls, zero quota usage)
  const mock = getMockTranslation(text, targetLocale);
  if (mock) return mock;

  // 2. Module-level in-memory cache (same process, instant)
  const key = memKey(text, targetLocale);
  if (memCache.has(key)) return memCache.get(key)!;

  // 3. Call Lingo SDK — gracefully fall back to English on quota errors
  try {
    const result = await lingoDotDev.localizeObject(
      { text },
      { sourceLocale, targetLocale }
    );
    memCache.set(key, result.text);
    return result.text;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("free plan") || msg.includes("quota") || msg.includes("limit reached")) {
      // Quota exhausted — return English silently so the app keeps working
      memCache.set(key, text); // cache the fallback so we don't spam the API
      return text;
    }
    console.error("Translation error:", error);
    return text;
  }
}

export async function translateLog(
  log: Log,
  targetLocale: string,
  sourceLocale: string = "en"
): Promise<Log> {
  if (targetLocale === sourceLocale) return log;

  // 1. Pre-translated mock table
  const mock = getMockTranslation(log.message, targetLocale);
  if (mock) return { ...log, message: mock };

  // 2. Module-level in-memory cache (keyed by content, not by ID)
  const key = memKey(log.message, targetLocale);
  if (memCache.has(key)) return { ...log, message: memCache.get(key)! };

  // 3. Supabase translation_cache (for real persisted log IDs)
  const cached = await getCachedTranslation(log.id, "log", targetLocale);
  if (cached) {
    memCache.set(key, cached);
    return { ...log, message: cached };
  }

  // 4. Lingo SDK
  try {
    const result = await lingoDotDev.localizeObject(
      { message: log.message },
      { sourceLocale, targetLocale }
    );
    memCache.set(key, result.message);
    setCachedTranslation(log.id, "log", sourceLocale, targetLocale, log.message, result.message);
    return { ...log, message: result.message };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("free plan") || msg.includes("quota") || msg.includes("limit reached")) {
      memCache.set(key, log.message);
      return log;
    }
    console.error("Log translation error:", error);
    return log;
  }
}

export async function translateAlert(
  alert: Alert,
  targetLocale: string,
  sourceLocale: string = "en"
): Promise<Alert> {
  if (targetLocale === sourceLocale) return alert;

  // 1. Pre-translated mock table (checks title and description separately)
  const mockTitle = getMockTranslation(alert.title, targetLocale);
  const mockDesc = getMockTranslation(alert.description, targetLocale);
  if (mockTitle && mockDesc) {
    return { ...alert, title: mockTitle, description: mockDesc };
  }

  // 2. Module-level in-memory cache (compound key)
  const titleKey = memKey(alert.title, targetLocale);
  const descKey = memKey(alert.description, targetLocale);
  if (memCache.has(titleKey) && memCache.has(descKey)) {
    return { ...alert, title: memCache.get(titleKey)!, description: memCache.get(descKey)! };
  }

  // 3. Supabase cache
  const cached = await getCachedTranslation(alert.id, "alert", targetLocale);
  if (cached) {
    const parts = JSON.parse(cached);
    memCache.set(titleKey, parts.title);
    memCache.set(descKey, parts.description);
    return { ...alert, title: parts.title, description: parts.description };
  }

  // 4. Lingo SDK
  try {
    const result = await lingoDotDev.localizeObject(
      { title: alert.title, description: alert.description },
      { sourceLocale, targetLocale }
    );
    memCache.set(titleKey, result.title);
    memCache.set(descKey, result.description);
    setCachedTranslation(
      alert.id, "alert", sourceLocale, targetLocale,
      JSON.stringify({ title: alert.title, description: alert.description }),
      JSON.stringify({ title: result.title, description: result.description })
    );
    return { ...alert, title: result.title, description: result.description };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    if (msg.includes("free plan") || msg.includes("quota") || msg.includes("limit reached")) {
      memCache.set(titleKey, alert.title);
      memCache.set(descKey, alert.description);
      return alert;
    }
    console.error("Alert translation error:", error);
    return alert;
  }
}

export async function batchTranslate(
  items: { text: string }[],
  targetLocale: string,
  sourceLocale: string = "en"
): Promise<{ text: string }[]> {
  if (targetLocale === sourceLocale) return items;

  try {
    const translated = await Promise.all(
      items.map(async (item) => {
        const result = await translateText(item.text, targetLocale, sourceLocale);
        return { text: result };
      })
    );
    return translated;
  } catch (error) {
    console.error("Batch translation error:", error);
    return items;
  }
}