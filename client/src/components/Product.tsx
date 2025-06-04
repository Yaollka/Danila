// Simple product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  specs: string;
}
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductProps {
  product: Product;
}

export default function Product({ product }: ProductProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Товар добавлен в корзину",
      description: `"${product.name}" добавлен в вашу корзину`,
    });
  };

  return (
    <div className="product-card bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="aspect-square mb-3 overflow-hidden rounded-lg">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      
      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
      <p className="text-xs text-gray-500 mb-2">{product.specs}</p>
      
      <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-lg">{product.price.toLocaleString()} ₽</span>
        <span className="text-xs text-gray-400 line-through">
          {Math.round(product.price * 1.2).toLocaleString()} ₽
        </span>
      </div>
      
      <button 
        onClick={handleAddToCart}
        className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
      >
        В корзину
      </button>
    </div>
  );
}
