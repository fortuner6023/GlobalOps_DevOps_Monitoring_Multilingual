// Lingo SDK (Tool #3) - Runtime translation of dynamic content
import { LingoDotDevEngine } from "lingo.dev/sdk";
import { supabase } from "./supabase";
import type { Log, Alert } from "./supabase";

const lingoDotDev = new LingoDotDevEngine({
  apiKey: process.env.LINGODOTDEV_API_KEY!,
});

// --- Translation Cache ---

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

// --- Translation Functions ---

export async function translateText(
  text: string,
  targetLocale: string,
  sourceLocale: string = "en"
): Promise<string> {
  if (targetLocale === sourceLocale) return text;

  try {
    const result = await lingoDotDev.localizeObject(
      { text },
      { sourceLocale, targetLocale }
    );
    return result.text;
  } catch (error) {
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

  try {
    // Check cache first
    const cached = await getCachedTranslation(log.id, "log", targetLocale);
    if (cached) {
      return { ...log, message: cached };
    }

    const result = await lingoDotDev.localizeObject(
      { message: log.message },
      { sourceLocale, targetLocale }
    );

    // Store in cache (non-blocking)
    setCachedTranslation(log.id, "log", sourceLocale, targetLocale, log.message, result.message);

    return { ...log, message: result.message };
  } catch (error) {
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

  try {
    // Check cache first
    const cached = await getCachedTranslation(alert.id, "alert", targetLocale);
    if (cached) {
      const parts = JSON.parse(cached);
      return { ...alert, title: parts.title, description: parts.description };
    }

    const result = await lingoDotDev.localizeObject(
      { title: alert.title, description: alert.description },
      { sourceLocale, targetLocale }
    );

    // Store in cache (non-blocking)
    setCachedTranslation(
      alert.id,
      "alert",
      sourceLocale,
      targetLocale,
      JSON.stringify({ title: alert.title, description: alert.description }),
      JSON.stringify({ title: result.title, description: result.description })
    );

    return { ...alert, title: result.title, description: result.description };
  } catch (error) {
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
        const result = await lingoDotDev.localizeObject(
          { text: item.text },
          { sourceLocale, targetLocale }
        );
        return { text: result.text };
      })
    );
    return translated;
  } catch (error) {
    console.error("Batch translation error:", error);
    return items;
  }
}
