import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { categories, Category } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/quotes", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes" });
    }
  });

  app.get("/api/quotes/daily", async (req, res) => {
    try {
      const quote = await storage.getDailyQuote();
      res.json(quote);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch daily quote" });
    }
  });

  app.get("/api/quotes/category/:category", async (req, res) => {
    try {
      const category = req.params.category as string;
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      
      if (!categories.includes(categoryName as Category)) {
        return res.status(400).json({ error: "Invalid category" });
      }

      const quotes = await storage.getQuotesByCategory(categoryName as Category);
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quotes by category" });
    }
  });

  app.get("/api/quotes/random", async (req, res) => {
    try {
      const quote = await storage.getRandomQuote();
      res.json(quote);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch random quote" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
