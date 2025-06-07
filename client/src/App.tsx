import { useState } from 'react';
import { Switch, Route } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Header } from './components/Header';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import Contact from '@/pages/Contact';
import About from '@/pages/About';
import PCBuilder from '@/pages/PCBuilder';
import NotFound from '@/pages/not-found';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Покупка</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Как заказать</a></li>
              <li><a href="#" className="hover:text-white">Способы оплаты</a></li>
              <li><a href="#" className="hover:text-white">Доставка</a></li>
              <li><a href="#" className="hover:text-white">Гарантия</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">О компании</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white">О TechEmpire</a></li>
              <li><a href="#" className="hover:text-white">Вакансии</a></li>
              <li><a href="#" className="hover:text-white">Новости</a></li>
              <li><a href="#" className="hover:text-white">Партнерам</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/contact" className="hover:text-white">Контакты</a></li>
              <li><a href="#" className="hover:text-white">Помощь</a></li>
              <li><a href="#" className="hover:text-white">Возврат и обмен</a></li>
              <li><a href="#" className="hover:text-white">Сервисные центры</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-gray-300">
              <p>+7 (495) 123-45-67</p>
              <p>support@techempire.ru</p>
              <p>г. Москва, ул. Тверская, д. 15</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-telegram"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-vk"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TechEmpire. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

function Router() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery(''); // Clear search when changing category
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSearch={handleSearch} onCategoryChange={handleCategoryChange} />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/catalog">
            <Catalog searchQuery={searchQuery} category={selectedCategory} />
          </Route>
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/pc-builder" component={PCBuilder} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
