// Simple product interface for in-memory storage
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  specs: string;
}

// Interface for storage operations
export interface IStorage {
  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
}

export class MemStorage implements IStorage {
  private products: Product[] = [];
  private nextId = 1;

  constructor() {
    this.initializeProducts();
  }

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.find(p => p.id === id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.specs.toLowerCase().includes(lowerQuery)
    );
  }

  private initializeProducts() {
    const initialProducts: Product[] = [
      {
        id: this.nextId++,
        name: "Gaming Monitor 27\" 144Hz",
        price: 25990,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        category: "monitors",
        specs: "27 дюймов, 144Hz, 1ms, IPS, QHD 2560x1440"
      },
      {
        id: this.nextId++,
        name: "Механическая клавиатура RGB",
        price: 8990,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
        category: "keyboards",
        specs: "Cherry MX Blue, RGB подсветка, USB"
      },
      {
        id: this.nextId++,
        name: "Игровая мышь Pro",
        price: 4990,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        category: "mice",
        specs: "16000 DPI, RGB, программируемые кнопки"
      },
      {
        id: this.nextId++,
        name: "NVIDIA GeForce RTX 4070",
        price: 89990,
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400",
        category: "graphics",
        specs: "12GB GDDR6X, Ray Tracing, DLSS 3.0"
      },
      {
        id: this.nextId++,
        name: "AMD Ryzen 7 7700X",
        price: 32990,
        image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400",
        category: "processors",
        specs: "8 ядер, 16 потоков, 4.5-5.4 GHz, AM5"
      },
      {
        id: this.nextId++,
        name: "Материнская плата ASUS B650",
        price: 18990,
        image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400",
        category: "motherboards",
        specs: "AMD B650, AM5, DDR5, PCIe 5.0"
      },
      {
        id: this.nextId++,
        name: "Корпус Fractal Design",
        price: 12990,
        image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=400",
        category: "cases",
        specs: "ATX, закаленное стекло, RGB подсветка"
      },
      {
        id: this.nextId++,
        name: "32GB DDR5-5600 Kit",
        price: 16990,
        image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
        category: "memory",
        specs: "2x16GB, DDR5-5600, CL36, RGB"
      },
      {
        id: this.nextId++,
        name: "NVMe SSD 1TB PCIe 4.0",
        price: 8990,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400",
        category: "storage",
        specs: "1TB, PCIe 4.0, 7000/6000 MB/s"
      },
      {
        id: this.nextId++,
        name: "Ultrawide Monitor 34\"",
        price: 45990,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        category: "monitors",
        specs: "34\", 3440x1440, 100Hz, IPS, HDR"
      }
    ];

    this.products = initialProducts;
  }
}

export const storage = new MemStorage();