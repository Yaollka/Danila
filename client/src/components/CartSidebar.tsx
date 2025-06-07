import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export default function CartSidebar() {
  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    clearCart 
  } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте товары в корзину перед оформлением заказа",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Заказ оформлен!",
      description: `Заказ на сумму ${getTotalPrice().toLocaleString()} ₽ оформлен! Спасибо за покупку!`,
    });
    
    clearCart();
    toggleCart();
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleCart}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Корзина</h3>
            <button 
              onClick={toggleCart}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <ShoppingCart size={64} className="mx-auto mb-4" />
                <p>Корзина пуста</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3 py-3 border-b">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded" 
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.price.toLocaleString()} ₽</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm hover:bg-gray-300"
                        >
                          <Minus size={12} />
                        </button>
                        
                        <span className="text-sm font-medium">{item.quantity}</span>
                        
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm hover:bg-gray-300"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Итого:</span>
              <span className="font-bold text-lg">{getTotalPrice().toLocaleString()} ₽</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
