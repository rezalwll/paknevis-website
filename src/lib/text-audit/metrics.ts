import type { TextAuditMetrics } from "./types";

const WORDS_PER_MINUTE = 180;

export function calculateTextMetrics(text: string): TextAuditMetrics {
  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/u).filter(Boolean).length : 0;
  const sentences = trimmed
    ? trimmed.split(/[.!؟]+(?:\s|$)/u).filter((part) => part.trim().length > 0).length
    : 0;
  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/u).filter((part) => part.trim().length > 0).length
    : 0;

  return {
    characters: text.length,
    charactersWithoutSpaces: text.replace(/\s/gu, "").length,
    words,
    sentences,
    paragraphs,
    readingMinutes: words === 0 ? 0 : Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
  };
}
