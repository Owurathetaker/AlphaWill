import { useState, useEffect } from "react";
import { FAVORITES_STORAGE_KEY } from "@/lib/quotes";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = (quoteId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(quoteId)) {
        next.delete(quoteId);
      } else {
        next.add(quoteId);
      }
      return next;
    });
  };

  const isFavorite = (quoteId: string) => favorites.has(quoteId);

  return { favorites, toggleFavorite, isFavorite };
}
