import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Cpu, HardDrive, MemoryStick, Monitor, CircuitBoard, Box, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import type { Product } from '@/lib/types';

interface PCBuildState {
  motherboard?: Product;
  processor?: Product;
  graphics?: Product;
  memory?: Product;
  storage?: Product;
  case?: Product;
}

const componentCategories = [
  { id: 'motherboards', name: 'Материнская плата', icon: CircuitBoard, required: true },
  { id: 'processors', name: 'Процессор', icon: Cpu, required: true },
  { id: 'graphics', name: 'Видеокарта', icon: Monitor, required: true },
  { id: 'memory', name: 'Оперативная память', icon: MemoryStick, required: true },
  { id: 'storage', name: 'Накопитель', icon: HardDrive, required: true },
  { id: 'cases', name: 'Корпус', icon: Box, required: true },
];

export default function PCBuilder() {
  const [selectedCategory, setSelectedCategory] = useState('motherboards');
  const [build, setBuild] = useState<PCBuildState>({});
  const { addItem } = useCart();

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ['/api/products', selectedCategory],
  });

  const selectedComponent = build[selectedCategory as keyof PCBuildState];
  const availableProducts = products.filter(p => 
    p.category === selectedCategory && p.id !== selectedComponent?.id
  );

  const selectComponent = (product: Product) => {
    setBuild(prev => ({
      ...prev,
      [selectedCategory]: product
    }));
  };

  const removeComponent = (category: string) => {
    setBuild(prev => {
      const newBuild = { ...prev };
      delete newBuild[category as keyof PCBuildState];
      return newBuild;
    });
  };

  const clearBuild = () => {
    setBuild({});
  };

  const getTotalPrice = () => {
    return Object.values(build).reduce((sum, component) => sum + (component?.price || 0), 0);
  };

  const getSelectedComponentsCount = () => {
    return Object.values(build).filter(Boolean).length;
  };

  const isComplete = () => {
    return componentCategories.filter(c => c.required).every(category => 
      build[category.id as keyof PCBuildState]
    );
  };

  const addBuildToCart = () => {
    Object.values(build).forEach(component => {
      if (component) {
        addItem(component);
      }
    });
    alert('Сборка добавлена в корзину!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Конструктор компьютера</h2>
        <p className="text-gray-600">
          Соберите идеальный компьютер из совместимых компонентов. Выберите каждую деталь и получите готовую сборку.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Component Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Компоненты</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {componentCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  const hasComponent = build[category.id as keyof PCBuildState];
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded flex items-center space-x-3 transition-colors ${
                        isSelected 
                          ? 'bg-gray-900 text-white' 
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="flex-1">{category.name}</span>
                      {hasComponent && (
                        <Badge variant="secondary" className="ml-2">✓</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Component Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {componentCategories.find(c => c.id === selectedCategory)?.name}
              </CardTitle>
              <p className="text-sm text-gray-500">
                {availableProducts.length} товаров доступно
              </p>
            </CardHeader>
            <CardContent>
              {selectedComponent && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedComponent.image}
                        alt={selectedComponent.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold">{selectedComponent.name}</h4>
                        <p className="text-sm text-gray-600">{selectedComponent.description}</p>
                        <p className="font-bold text-green-600">
                          {selectedComponent.price.toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeComponent(selectedCategory)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {availableProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                        {product.specifications && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.specifications.slice(0, 3).map((spec, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg">
                              {product.price.toLocaleString()} ₽
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {product.originalPrice.toLocaleString()} ₽
                              </span>
                            )}
                          </div>
                          <Button
                            onClick={() => selectComponent(product)}
                            size="sm"
                            className="bg-gray-900 hover:bg-gray-800"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Выбрать
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Build Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Ваша сборка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {componentCategories.map((category) => {
                  const component = build[category.id as keyof PCBuildState];
                  return (
                    <div key={category.id} className="flex items-center justify-between">
                      <span className="text-sm">{category.name}</span>
                      {component ? (
                        <Badge variant="secondary" className="text-xs">
                          Выбрано
                        </Badge>
                      ) : (
                        <span className="text-sm text-blue-600">Не выбрано</span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Итого:</span>
                  <span>{getTotalPrice().toLocaleString()} ₽</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  Выбрано компонентов: {getSelectedComponentsCount()} из {componentCategories.length}
                </div>
                
                {!isComplete() && (
                  <p className="text-sm text-gray-600">
                    Выберите все обязательные компоненты для завершения сборки.
                  </p>
                )}
                
                <Button
                  onClick={addBuildToCart}
                  disabled={!isComplete()}
                  className="w-full"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Добавить в корзину
                </Button>
                
                <Button
                  onClick={clearBuild}
                  variant="outline"
                  className="w-full"
                  disabled={getSelectedComponentsCount() === 0}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Очистить
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
