import { prisma } from "./db";
import type { Product } from "@prisma/client";

// Интерфейс оставляем как есть
export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
}

export class PrismaStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return prisma.product.findMany();
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return prisma.product.findUnique({
      where: { id },
    }) ?? undefined;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: { category },
    });
  }

  async searchProducts(query: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { specs: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  }
}

// экспортируем готовый экземпляр
export const storage = new PrismaStorage();