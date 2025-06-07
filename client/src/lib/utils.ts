import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' ₽';
}

export function formatNumber(num: number): string {
  return num.toLocaleString('ru-RU');
}
