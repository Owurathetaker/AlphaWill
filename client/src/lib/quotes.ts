import { Quote, Category } from "@shared/schema";

export const categoryIcons: Record<Category, string> = {
  Discipline: "⚔️",
  Goals: "🎯",
  Faith: "✝️",
  Integrity: "⚖️",
  Strength: "💪",
  Purpose: "🧭"
};

export const categoryDescriptions: Record<Category, string> = {
  Discipline: "Master your habits and forge your character",
  Goals: "Lock in and achieve what you were meant to",
  Faith: "Draw strength from the Almighty",
  Integrity: "Walk with honor in all you do",
  Strength: "Build resilience in body and mind",
  Purpose: "Discover and fulfill your calling"
};

export const QUOTES_STORAGE_KEY = "alpha-gents-quotes";
export const FAVORITES_STORAGE_KEY = "alpha-gents-favorites";
export const DAILY_QUOTE_KEY = "alpha-gents-daily-quote";
export const DAILY_QUOTE_DATE_KEY = "alpha-gents-daily-quote-date";
