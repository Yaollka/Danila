import { Product, CartItem, ContactForm, PCBuild, User, Order, OrderItem } from "@shared/schema";
import { query } from "./database";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  searchProducts(queryStr: string): Promise<Product[]>;
  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product>;
  updateProduct(id: number, product: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Contact
  submitContactForm(form: ContactForm): Promise<boolean>;
  
  // PC Builder
  getPCBuild(id: number): Promise<PCBuild | undefined>;
  savePCBuild(build: Omit<PCBuild, 'id'>, userId?: number): Promise<PCBuild>;
  
  // Orders
  createOrder(userId: number, items: CartItem[], shippingAddress: string, paymentMethod: string): Promise<Order>;
  getUserOrders(userId: number): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | null>;
  updateOrderStatus(id: number, status: Order['status']): Promise<boolean>;
  getAllOrders(): Promise<Order[]>;
  
  // Database initialization
  initializeDatabase(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async initializeDatabase(): Promise<void> {
    try {
      // Check if products table has data
      const existingProducts = await query('SELECT COUNT(*) FROM products');
      const count = parseInt(existingProducts.rows[0].count);
      
      if (count === 0) {
        // Insert sample products
        const sampleProducts = [
          {
            name: "Gaming Monitor 27\" 144Hz",
            category: "monitors",
            price: 25990,
            originalPrice: 35990,
            image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            description: "27 дюймов, 144Hz freq rate, IPS, QHD разрешение, AMD FreeSync Premium",
            specifications: ["27 дюймов", "2560x1440", "144Hz", "IPS", "AMD FreeSync"],
            inStock: true
          },
          {
            name: "Механическая клавиатура RGB",
            category: "keyboards",
            price: 8990,
            originalPrice: 12990,
            image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            description: "Cherry MX Blue, RGB подсветка, 104 клавиши, алюминиевый корпус",
            specifications: ["Cherry MX Blue", "RGB подсветка", "104 клавиши", "Алюминий"],
            inStock: true
          },
          {
            name: "Игровая мышь Pro",
            category: "mice",
            price: 4990,
            originalPrice: 6990,
            image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            description: "16000 DPI, эргономичный дизайн, программируемые кнопки",
            specifications: ["16000 DPI", "6 программируемых кнопок", "RGB подсветка"],
            inStock: true
          },
          {
            name: "NVIDIA GeForce RTX 4070",
            category: "graphics",
            price: 89990,
            image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            description: "12GB GDDR6X, Ray Tracing, DLSS 3.0, 4K Gaming Ready",
            specifications: ["12GB GDDR6X", "Ray Tracing", "DLSS 3.0", "4K Ready"],
            inStock: true
          },
          {
            name: "AMD Ryzen 7 7700X",
            category: "processors",
            price: 32990,
            originalPrice: 39990,
            image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            description: "8 ядер, 16 потоков, 4.5-5.4 GHz, Socket AM5",
            specifications: ["8 ядер", "16 потоков", "4.5-5.4 GHz", "Socket AM5"],
            inStock: true
          },
          {
            name: "Материнская плата ASUS B650",
            category: "motherboards",
            price: 18990,
            image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            description: "AMD B650, AM5, DDR5, PCIe 5.0",
            specifications: ["AMD B650", "Socket AM5", "DDR5", "PCIe 5.0"],
            inStock: true
          },
          {
            name: "Corsair Vengeance RGB Pro 32GB",
            category: "memory",
            price: 18990,
            image: "https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            description: "2x16GB DDR4-3600, CL18, RGB подсветка",
            specifications: ["32GB", "DDR4-3600", "CL18", "RGB"],
            inStock: true
          },
          {
            name: "Samsung 970 EVO Plus 2TB",
            category: "storage",
            price: 15990,
            originalPrice: 18990,
            image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
            description: "2TB NVMe SSD, 7000/6900 MB/s, M.2 2280",
            specifications: ["2TB", "NVMe", "7000/6900 MB/s", "M.2 2280"],
            inStock: true
          }
        ];

        for (const product of sampleProducts) {
          await query(
            `INSERT INTO products (name, category, price, original_price, image, description, specifications, in_stock)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              product.name,
              product.category,
              product.price,
              product.originalPrice || null,
              product.image,
              product.description,
              product.specifications,
              product.inStock
            ]
          );
        }
        console.log('Database initialized with sample products');
      }
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    const result = await query('SELECT * FROM products ORDER BY id');
    return result.rows.map(this.convertDbProduct);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (category === 'all') {
      return this.getAllProducts();
    }
    const result = await query('SELECT * FROM products WHERE category = $1 ORDER BY id', [category]);
    return result.rows.map(this.convertDbProduct);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    const result = await query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows.length > 0 ? this.convertDbProduct(result.rows[0]) : undefined;
  }

  async searchProducts(queryStr: string): Promise<Product[]> {
    const searchTerm = `%${queryStr.toLowerCase()}%`;
    const result = await query(
      `SELECT * FROM products 
       WHERE LOWER(name) LIKE $1 
       OR LOWER(description) LIKE $1 
       OR LOWER(category) LIKE $1
       ORDER BY id`,
      [searchTerm]
    );
    return result.rows.map(this.convertDbProduct);
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const result = await query(
      `INSERT INTO products (name, category, price, original_price, image, description, specifications, in_stock)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        product.name,
        product.category,
        product.price,
        product.originalPrice || null,
        product.image,
        product.description,
        product.specifications || [],
        product.inStock
      ]
    );
    return this.convertDbProduct(result.rows[0]);
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product | null> {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (product.name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(product.name);
    }
    if (product.category !== undefined) {
      fields.push(`category = $${paramIndex++}`);
      values.push(product.category);
    }
    if (product.price !== undefined) {
      fields.push(`price = $${paramIndex++}`);
      values.push(product.price);
    }
    if (product.originalPrice !== undefined) {
      fields.push(`original_price = $${paramIndex++}`);
      values.push(product.originalPrice);
    }
    if (product.image !== undefined) {
      fields.push(`image = $${paramIndex++}`);
      values.push(product.image);
    }
    if (product.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(product.description);
    }
    if (product.specifications !== undefined) {
      fields.push(`specifications = $${paramIndex++}`);
      values.push(product.specifications);
    }
    if (product.inStock !== undefined) {
      fields.push(`in_stock = $${paramIndex++}`);
      values.push(product.inStock);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const result = await query(
      `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    return result.rows.length > 0 ? this.convertDbProduct(result.rows[0]) : null;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await query('DELETE FROM products WHERE id = $1', [id]);
    return result.rowCount > 0;
  }

  async submitContactForm(form: ContactForm): Promise<boolean> {
    try {
      await query(
        'INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)',
        [form.name, form.email, form.subject || '', form.message]
      );
      return true;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return false;
    }
  }

  async getPCBuild(id: number): Promise<PCBuild | undefined> {
    const result = await query('SELECT * FROM pc_builds WHERE id = $1', [id]);
    if (result.rows.length === 0) return undefined;

    const build = result.rows[0];
    const components = build.components;
    return {
      id: build.id,
      motherboard: components.motherboard,
      processor: components.processor,
      graphics: components.graphics,
      memory: components.memory,
      storage: components.storage,
      case: components.case,
      total: build.total
    };
  }

  async savePCBuild(build: Omit<PCBuild, 'id'>, userId?: number): Promise<PCBuild> {
    const components = {
      motherboard: build.motherboard,
      processor: build.processor,
      graphics: build.graphics,
      memory: build.memory,
      storage: build.storage,
      case: build.case
    };

    const result = await query(
      'INSERT INTO pc_builds (user_id, components, total) VALUES ($1, $2, $3) RETURNING *',
      [userId || null, JSON.stringify(components), build.total]
    );

    return {
      id: result.rows[0].id,
      ...build
    };
  }

  async createOrder(userId: number, items: CartItem[], shippingAddress: string, paymentMethod: string): Promise<Order> {
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const orderResult = await query(
      `INSERT INTO orders (user_id, total_amount, shipping_address, payment_method) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, totalAmount, shippingAddress, paymentMethod]
    );

    const order = orderResult.rows[0];
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const itemResult = await query(
        `INSERT INTO order_items (order_id, product_id, product_name, product_image, quantity, price)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [order.id, item.id, item.name, item.image, item.quantity, item.price]
      );
      
      orderItems.push({
        id: itemResult.rows[0].id,
        orderId: order.id,
        productId: item.id,
        productName: item.name,
        productImage: item.image,
        quantity: item.quantity,
        price: item.price
      });
    }

    return {
      id: order.id,
      userId: order.user_id,
      items: orderItems,
      totalAmount: order.total_amount,
      status: order.status,
      shippingAddress: order.shipping_address,
      paymentMethod: order.payment_method,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    };
  }

  async getUserOrders(userId: number): Promise<Order[]> {
    const ordersResult = await query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    const orders: Order[] = [];
    for (const orderRow of ordersResult.rows) {
      const itemsResult = await query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [orderRow.id]
      );

      const items = itemsResult.rows.map(item => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        productName: item.product_name,
        productImage: item.product_image,
        quantity: item.quantity,
        price: item.price
      }));

      orders.push({
        id: orderRow.id,
        userId: orderRow.user_id,
        items,
        totalAmount: orderRow.total_amount,
        status: orderRow.status,
        shippingAddress: orderRow.shipping_address,
        paymentMethod: orderRow.payment_method,
        createdAt: orderRow.created_at,
        updatedAt: orderRow.updated_at
      });
    }

    return orders;
  }

  async getOrderById(id: number): Promise<Order | null> {
    const orderResult = await query('SELECT * FROM orders WHERE id = $1', [id]);
    if (orderResult.rows.length === 0) return null;

    const orderRow = orderResult.rows[0];
    const itemsResult = await query('SELECT * FROM order_items WHERE order_id = $1', [id]);

    const items = itemsResult.rows.map(item => ({
      id: item.id,
      orderId: item.order_id,
      productId: item.product_id,
      productName: item.product_name,
      productImage: item.product_image,
      quantity: item.quantity,
      price: item.price
    }));

    return {
      id: orderRow.id,
      userId: orderRow.user_id,
      items,
      totalAmount: orderRow.total_amount,
      status: orderRow.status,
      shippingAddress: orderRow.shipping_address,
      paymentMethod: orderRow.payment_method,
      createdAt: orderRow.created_at,
      updatedAt: orderRow.updated_at
    };
  }

  async updateOrderStatus(id: number, status: Order['status']): Promise<boolean> {
    const result = await query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2',
      [status, id]
    );
    return result.rowCount > 0;
  }

  async getAllOrders(): Promise<Order[]> {
    const ordersResult = await query('SELECT * FROM orders ORDER BY created_at DESC');
    
    const orders: Order[] = [];
    for (const orderRow of ordersResult.rows) {
      const itemsResult = await query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [orderRow.id]
      );

      const items = itemsResult.rows.map(item => ({
        id: item.id,
        orderId: item.order_id,
        productId: item.product_id,
        productName: item.product_name,
        productImage: item.product_image,
        quantity: item.quantity,
        price: item.price
      }));

      orders.push({
        id: orderRow.id,
        userId: orderRow.user_id,
        items,
        totalAmount: orderRow.total_amount,
        status: orderRow.status,
        shippingAddress: orderRow.shipping_address,
        paymentMethod: orderRow.payment_method,
        createdAt: orderRow.created_at,
        updatedAt: orderRow.updated_at
      });
    }

    return orders;
  }

  private convertDbProduct(dbProduct: any): Product {
    return {
      id: dbProduct.id,
      name: dbProduct.name,
      category: dbProduct.category,
      price: dbProduct.price,
      originalPrice: dbProduct.original_price,
      image: dbProduct.image,
      description: dbProduct.description,
      specifications: dbProduct.specifications || [],
      inStock: dbProduct.in_stock,
      createdAt: dbProduct.created_at
    };
  }
}

export const storage = new DatabaseStorage();