import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import SimpleLayout from '@/components/layout/HomeLayout';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
// Simple product interface
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  specs: string;
}
import { Monitor, Keyboard, Mouse, Cpu, HardDrive, Settings, ShoppingCart, Trash2, Plus } from 'lucide-react';

interface PCBuild {
  motherboard?: Product;
  processor?: Product;
  graphics?: Product;
  memory?: Product;
  storage?: Product;
  case?: Product;
  monitor?: Product;
  keyboard?: Product;
  mouse?: Product;
}

const componentCategories = [
  { key: 'motherboards', name: 'Материнская плата', icon: Settings, required: true },
  { key: 'processors', name: 'Процессор', icon: Cpu, required: true },
  { key: 'graphics', name: 'Видеокарта', icon: Monitor, required: true },
  { key: 'memory', name: 'Оперативная память', icon: HardDrive, required: true },
  { key: 'storage', name: 'Накопитель', icon: HardDrive, required: true },
  { key: 'cases', name: 'Корпус', icon: Settings, required: true },
  { key: 'monitors', name: 'Монитор', icon: Monitor, required: false },
  { key: 'keyboards', name: 'Клавиатура', icon: Keyboard, required: false },
  { key: 'mice', name: 'Мышь', icon: Mouse, required: false },
];

export default function PCBuilder() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedBuild, setSelectedBuild] = useState<PCBuild>({});
  const [activeCategory, setActiveCategory] = useState<string>('motherboards');

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const selectComponent = (category: string, product: Product) => {
    setSelectedBuild(prev => ({
      ...prev,
      [category]: product
    }));
    
    toast({
      title: "Компонент добавлен",
      description: `${product.name} добавлен в сборку`,
    });
  };

  const removeComponent = (category: string) => {
    setSelectedBuild(prev => {
      const newBuild = { ...prev };
      delete newBuild[category as keyof PCBuild];
      return newBuild;
    });
  };

  const getTotalPrice = () => {
    return Object.values(selectedBuild).reduce((total, component) => {
      return total + (component?.price || 0);
    }, 0);
  };

  const getSelectedComponents = () => {
    return Object.entries(selectedBuild).filter(([_, component]) => component);
  };

  const addBuildToCart = () => {
    const components = getSelectedComponents();
    if (components.length === 0) {
      toast({
        title: "Сборка пуста",
        description: "Добавьте компоненты в сборку перед добавлением в корзину",
        variant: "destructive",
      });
      return;
    }

    components.forEach(([_, component]) => {
      if (component) {
        addToCart(component);
      }
    });

    toast({
      title: "Сборка добавлена в корзину",
      description: `${components.length} компонентов добавлено в корзину`,
    });
  };

  const clearBuild = () => {
    setSelectedBuild({});
    toast({
      title: "Сборка очищена",
      description: "Все компоненты удалены из сборки",
    });
  };

  const getRequiredComponents = () => {
    return componentCategories.filter(cat => cat.required);
  };

  const getOptionalComponents = () => {
    return componentCategories.filter(cat => !cat.required);
  };

  const isRequiredBuildComplete = () => {
    const requiredCategories = getRequiredComponents().map(cat => cat.key);
    return requiredCategories.every(category => selectedBuild[category as keyof PCBuild]);
  };

  return (
    <SimpleLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Конструктор компьютера</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Соберите идеальный компьютер из совместимых компонентов. Выберите каждую деталь и получите готовую сборку.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Component Categories */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-primary mb-4">Компоненты</h2>
            
            <div className="space-y-2 mb-6">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Обязательные</h3>
              {getRequiredComponents().map((category) => {
                const Icon = category.icon;
                const isSelected = selectedBuild[category.key as keyof PCBuild];
                const isActive = activeCategory === category.key;
                
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span className="text-sm font-medium">{category.name}</span>
                      {isSelected && (
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Дополнительные</h3>
              {getOptionalComponents().map((category) => {
                const Icon = category.icon;
                const isSelected = selectedBuild[category.key as keyof PCBuild];
                const isActive = activeCategory === category.key;
                
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'bg-white hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} />
                      <span className="text-sm font-medium">{category.name}</span>
                      {isSelected && (
                        <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Selection */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">
                {componentCategories.find(cat => cat.key === activeCategory)?.name}
              </h2>
              <span className="text-sm text-gray-500">
                {getProductsByCategory(activeCategory).length} товаров
              </span>
            </div>

            <div className="grid gap-4">
              {getProductsByCategory(activeCategory).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.specs}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          {product.price.toLocaleString()} ₽
                        </span>
                        <button
                          onClick={() => selectComponent(activeCategory, product)}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-gray-800 transition-colors"
                        >
                          <Plus size={16} />
                          Выбрать
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Build */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-primary mb-4">Ваша сборка</h2>

              <div className="space-y-3 mb-6">
                {componentCategories.map((category) => {
                  const selectedComponent = selectedBuild[category.key as keyof PCBuild];
                  const Icon = category.icon;
                  
                  return (
                    <div key={category.key} className="border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={14} />
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                        {category.required && <span className="text-red-500 text-xs">*</span>}
                      </div>
                      
                      {selectedComponent ? (
                        <div className="bg-gray-50 rounded p-2">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-gray-900 truncate">
                                {selectedComponent.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {selectedComponent.price.toLocaleString()} ₽
                              </p>
                            </div>
                            <button
                              onClick={() => removeComponent(category.key)}
                              className="text-red-500 hover:text-red-700 ml-2"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400">Не выбрано</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-700">Итого:</span>
                  <span className="text-xl font-bold text-primary">
                    {getTotalPrice().toLocaleString()} ₽
                  </span>
                </div>

                {!isRequiredBuildComplete() && (
                  <p className="text-xs text-amber-600 mb-4">
                    Выберите все обязательные компоненты для завершения сборки
                  </p>
                )}

                <div className="space-y-2">
                  <button
                    onClick={addBuildToCart}
                    disabled={getSelectedComponents().length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={16} />
                    Добавить в корзину
                  </button>
                  
                  <button
                    onClick={clearBuild}
                    disabled={getSelectedComponents().length === 0}
                    className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={16} />
                    Очистить
                  </button>
                </div>
              </div>

              {isRequiredBuildComplete() && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-800 font-medium">
                    ✓ Сборка готова!
                  </p>
                  <p className="text-xs text-green-600">
                    Все обязательные компоненты выбраны
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Build Recommendations */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-primary mb-4">Рекомендации по сборке</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded p-4">
              <h4 className="font-semibold mb-2">🎮 Игровая сборка</h4>
              <p className="text-gray-600">
                Мощная видеокарта, быстрый процессор и достаточно RAM для современных игр
              </p>
            </div>
            <div className="bg-white rounded p-4">
              <h4 className="font-semibold mb-2">💼 Офисная сборка</h4>
              <p className="text-gray-600">
                Экономичное решение для работы с документами и интернет-серфинга
              </p>
            </div>
            <div className="bg-white rounded p-4">
              <h4 className="font-semibold mb-2">🎨 Для творчества</h4>
              <p className="text-gray-600">
                Мощный процессор и много RAM для видеомонтажа и графического дизайна
              </p>
            </div>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
}