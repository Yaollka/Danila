import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import CarouselComp from '@/components/CarouselComp';
import Product from '@/components/Product';
// Simple product interface
interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  specs: string;
}

export default function Home() {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const { data: products = [], isLoading, error } = useQuery<ProductType[]>({
    queryKey: ['/api/products'],
  });

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter(product => product.category === activeCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.specs.toLowerCase().includes(lowerQuery)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(result);
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
    setSearchQuery(''); // Clear search when changing category
  };

  // Initialize with 'all' category

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory('all'); // Reset category when searching
  };

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="text-center text-red-500">
            Ошибка загрузки товаров. Пожалуйста, попробуйте позже.
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout 
      onSearch={handleSearch}
      onCategoryFilter={handleCategoryFilter}
      activeCategory={activeCategory}
    >
      <CarouselComp />
      
      <div className="max-w-[1200px] mx-auto mt-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary">
            {searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Товары'}
          </h2>
          <div className="flex gap-2">
            <select 
              className="border border-gray-300 rounded px-3 py-1 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Сортировать</option>
              <option value="price-low">Цена: по возрастанию</option>
              <option value="price-high">Цена: по убыванию</option>
              <option value="name">По названию</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-md animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <Product key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-8">
                {searchQuery ? 
                  `Товары по запросу "${searchQuery}" не найдены` : 
                  'Товары в данной категории не найдены'
                }
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
