import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { CartModal } from './CartModal';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
}

export function Header({ onSearch, onCategoryChange }: HeaderProps) {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { totalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    if (location !== '/catalog') {
      setLocation('/catalog');
    }
  };

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'monitors', name: 'Мониторы' },
    { id: 'keyboards', name: 'Клавиатуры' },
    { id: 'mice', name: 'Мыши' },
    { id: 'processors', name: 'Процессоры' },
    { id: 'graphics', name: 'Видеокарты' },
    { id: 'motherboards', name: 'Материнские платы' },
    { id: 'memory', name: 'Память' }
  ];

  return (
    <>
      <header className="bg-gray-900 text-white">
        {/* Top bar */}
        <div className="bg-gray-800 text-sm py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex space-x-6">
              <span>Бесплатная доставка от 5000 ₽</span>
              <span className="hidden sm:inline">Гарантия качества</span>
              <span className="hidden sm:inline">Тех. поддержка 24/7</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="hover:text-blue-400">О нас</Link>
              <Link href="/contact" className="hover:text-blue-400">Помощь</Link>
              <Link href="/pc-builder" className="hover:text-blue-400">Конструктор ПК</Link>
            </div>
          </div>
        </div>
        
        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold mr-4">TechEmpire</h1>
              <p className="text-gray-300 text-sm hidden sm:block">
                Электроника и<br />технологии
              </p>
            </Link>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8 hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Искать на TechEmpire"
                  className="w-full text-gray-900 bg-white border-gray-300 rounded-l"
                />
                <Button
                  type="submit"
                  className="absolute right-0 top-0 h-full px-4 bg-gray-700 text-white rounded-r hover:bg-gray-600"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
            
            {/* Cart and mobile menu */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowCart(true)}
                variant="secondary"
                className="relative bg-gray-700 hover:bg-gray-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Корзина</span>
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              
              <Button
                className="md:hidden"
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
          
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mt-4 md:hidden">
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Искать на TechEmpire"
                className="w-full text-gray-900 bg-white"
              />
              <Button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-gray-700 hover:bg-gray-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
        
        {/* Navigation */}
        <nav className={`bg-gray-700 ${showMobileMenu ? 'block' : 'hidden md:block'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:space-x-8 py-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setShowMobileMenu(false);
                    if (location !== '/catalog') {
                      setLocation('/catalog');
                    }
                  }}
                  className="text-gray-300 hover:text-white py-2 px-2 md:px-0 text-left"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <CartModal open={showCart} onOpenChange={setShowCart} />
    </>
  );
}
