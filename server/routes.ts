import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ContactForm, LoginRequest, VerifyCodeRequest, AuthResponse, User } from "@shared/schema";
import { sendAuthCode, verifyAuthCode, generateToken, verifyToken, getUserById } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let products;
      const searchStr = typeof search === 'string' ? search : '';
      const categoryStr = typeof category === 'string' ? category : '';
      
      if (searchStr && searchStr.trim()) {
        // If there's a search query, search regardless of category
        products = await storage.searchProducts(searchStr);
        // Then filter by category if specified and not 'all'
        if (categoryStr && categoryStr !== 'all') {
          products = products.filter(p => p.category === categoryStr);
        }
      } else if (categoryStr && categoryStr !== 'all') {
        // Just filter by category
        products = await storage.getProductsByCategory(categoryStr);
      } else {
        // Get all products
        products = await storage.getAllProducts();
      }
      
      res.json(products);
    } catch (error) {
      console.error('Error loading products:', error);
      res.status(500).json({ message: "Ошибка при загрузке товаров" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при загрузке товара" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({ message: "Заполните все обязательные поля" });
      }
      
      const contactForm: ContactForm = { name, email, subject, message };
      const success = await storage.submitContactForm(contactForm);
      
      if (success) {
        res.json({ message: "Сообщение отправлено успешно" });
      } else {
        res.status(500).json({ message: "Ошибка при отправке сообщения" });
      }
    } catch (error) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });

  // PC Builder endpoints
  app.get("/api/pc-builder/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const build = await storage.getPCBuild(id);
      
      if (!build) {
        return res.status(404).json({ message: "Сборка не найдена" });
      }
      
      res.json(build);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при загрузке сборки" });
    }
  });

  app.post("/api/pc-builder", async (req, res) => {
    try {
      const build = req.body;
      const savedBuild = await storage.savePCBuild(build);
      res.json(savedBuild);
    } catch (error) {
      res.status(500).json({ message: "Ошибка при сохранении сборки" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
