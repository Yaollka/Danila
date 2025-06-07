export type { Product, CartItem, ContactForm, PCBuild, ProductCategory } from "@shared/schema";

export interface CartContextType {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
