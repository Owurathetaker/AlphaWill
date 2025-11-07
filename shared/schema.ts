import { z } from "zod";

export const categories = ["Discipline", "Goals", "Faith", "Integrity", "Strength", "Purpose"] as const;

export type Category = typeof categories[number];

export interface Quote {
  id: string;
  text: string;
  author?: string;
  category: Category;
  biblicalReference?: string;
  isFavorite?: boolean;
}

export const quoteSchema = z.object({
  id: z.string(),
  text: z.string().min(10),
  author: z.string().optional(),
  category: z.enum(categories),
  biblicalReference: z.string().optional(),
  isFavorite: z.boolean().optional(),
});

export type QuoteInput = Omit<Quote, 'id'>;
