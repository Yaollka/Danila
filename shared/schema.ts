// TypeScript types for the application
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  specifications?: string[];
  inStock: boolean;
  createdAt?: Date;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PCBuild {
  id: number;
  motherboard?: Product;
  processor?: Product;
  graphics?: Product;
  memory?: Product;
  storage?: Product;
  case?: Product;
  total: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthCode {
  id: number;
  email: string;
  code: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface LoginRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

export type ProductCategory = 'all' | 'monitors' | 'keyboards' | 'mice' | 'processors' | 'graphics' | 'motherboards' | 'memory' | 'storage' | 'cases';
