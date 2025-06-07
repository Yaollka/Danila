import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { isUnauthorizedError } from '@/lib/authUtils';
import { apiRequest, queryClient } from '@/lib/queryClient';
import type { Product, InsertProduct } from '@shared/schema';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function AdminPanel() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<InsertProduct>({
    name: '',
    price: 0,
    category: '',
    image: '',
    specs: ''
  });

  // Redirect to home if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      toast({
        title: "Доступ запрещен",
        description: "У вас нет прав для доступа к админ панели",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const createMutation = useMutation({
    mutationFn: async (productData: InsertProduct) => {
      await apiRequest('/api/admin/products', {
        method: 'POST',
        body: JSON.stringify(productData),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsCreating(false);
      setFormData({ name: '', price: 0, category: '', image: '', specs: '' });
      toast({
        title: "Товар создан",
        description: "Новый товар успешно добавлен в каталог",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Доступ запрещен",
          description: "Авторизуйтесь снова...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Ошибка",
        description: "Не удалось создать товар",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertProduct> }) => {
      await apiRequest(`/api/admin/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setEditingProduct(null);
      toast({
        title: "Товар обновлен",
        description: "Изменения успешно сохранены",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Доступ запрещен",
          description: "Авторизуйтесь снова...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Ошибка",
        description: "Не удалось обновить товар",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest(`/api/admin/products/${id}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: "Товар удален",
        description: "Товар успешно удален из каталога",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Доступ запрещен",
          description: "Авторизуйтесь снова...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Ошибка",
        description: "Не удалось удалить товар",
        variant: "destructive",
      });
    },
  });

  const handleCreate = () => {
    if (!formData.name || !formData.category || !formData.image || formData.price <= 0) {
      toast({
        title: "Ошибка валидации",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleUpdate = () => {
    if (!editingProduct) return;
    updateMutation.mutate({ 
      id: editingProduct.id, 
      data: {
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        image: editingProduct.image,
        specs: editingProduct.specs
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Доступ запрещен</h1>
          <p className="text-gray-600">У вас нет прав для доступа к этой странице</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Админ панель</h1>
          <div className="flex gap-4">
            <a 
              href="/" 
              className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50"
            >
              На главную
            </a>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-gray-800"
            >
              <Plus size={16} />
              Добавить товар
            </button>
          </div>
        </div>

        {/* Create Product Form */}
        {isCreating && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Создать новый товар</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Название товара"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="number"
                placeholder="Цена"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Выберите категорию</option>
                <option value="monitors">Мониторы</option>
                <option value="keyboards">Клавиатуры</option>
                <option value="mice">Мыши</option>
                <option value="graphics">Видеокарты</option>
                <option value="motherboards">Материнские платы</option>
                <option value="processors">Процессоры</option>
                <option value="cases">Системные блоки</option>
              </select>
              <input
                type="url"
                placeholder="URL изображения"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2"
              />
              <textarea
                placeholder="Характеристики"
                value={formData.specs}
                onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 md:col-span-2"
                rows={3}
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleCreate}
                disabled={createMutation.isPending}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                <Save size={16} />
                {createMutation.isPending ? 'Создание...' : 'Создать'}
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setFormData({ name: '', price: 0, category: '', image: '', specs: '' });
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                <X size={16} />
                Отмена
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Товар
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Цена
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">
                    Загрузка товаров...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    Товары не найдены
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="ml-4">
                          {editingProduct?.id === product.id ? (
                            <input
                              type="text"
                              value={editingProduct.name}
                              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                              className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
                            />
                          ) : (
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          )}
                          <div className="text-sm text-gray-500">{product.specs}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingProduct?.id === product.id ? (
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                          className="border border-gray-300 rounded px-2 py-1 text-sm w-24"
                        />
                      ) : (
                        <div className="text-sm text-gray-900">{product.price.toLocaleString()} ₽</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingProduct?.id === product.id ? (
                        <select
                          value={editingProduct.category}
                          onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                        >
                          <option value="monitors">Мониторы</option>
                          <option value="keyboards">Клавиатуры</option>
                          <option value="mice">Мыши</option>
                          <option value="graphics">Видеокарты</option>
                          <option value="motherboards">Материнские платы</option>
                          <option value="processors">Процессоры</option>
                          <option value="cases">Системные блоки</option>
                        </select>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingProduct?.id === product.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleUpdate}
                            disabled={updateMutation.isPending}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deleteMutation.isPending}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}