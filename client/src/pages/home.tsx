import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600")'
          }}
        />
        <div className="relative z-10 text-center text-gray-900 max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">
            Лучшие цены на компьютерную технику
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Более 5000 товаров в наличии с быстрой доставкой
          </p>
          <Button
            onClick={() => setLocation('/catalog')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Перейти к каталогу
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Качество</h3>
            <p className="text-gray-600">
              Мы предлагаем только оригинальную продукцию от проверенных производителей с полной гарантией качества.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Скорость</h3>
            <p className="text-gray-600">
              Быстрая обработка заказов и доставка по всей России. Большинство товаров доставляется в течение 1-3 дней.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Сервис</h3>
            <p className="text-gray-600">
              Профессиональная поддержка клиентов, консультации по выбору товаров и полноценное послепродажное обслуживание.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-center mb-8">TechEmpire в цифрах</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">50,000+</div>
              <div className="text-gray-600">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">5,000+</div>
              <div className="text-gray-600">Товаров в каталоге</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">15</div>
              <div className="text-gray-600">Городов присутствия</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600">Положительных отзывов</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
