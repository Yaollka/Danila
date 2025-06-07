import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Zap, Headphones } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">О компании TechEmpire</h2>
          <p className="text-xl text-gray-600">
            Мы - ведущий поставщик высококачественной электроники и компьютерных комплектующих в России
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Наша история</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                TechEmpire была основана в 2018 году группой энтузиастов технологий, которые стремились 
                предоставить российским потребителям доступ к самым современным и качественным электронным 
                устройствам по справедливым ценам.
              </p>
              <p>
                За годы работы мы выстроили прочные партнерские отношения с ведущими мировыми производителями 
                электроники, что позволяет нам предлагать только оригинальную продукцию с официальной гарантией.
              </p>
              <p>
                Сегодня TechEmpire - это команда из более чем 200 специалистов, работающих в 15 городах России, 
                и тысячи довольных клиентов по всей стране.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="TechEmpire office" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
        
        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center mb-12">Наши ценности</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="text-center p-6">
                <div className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Качество</h4>
                <p className="text-gray-600">
                  Мы предлагаем только оригинальную продукцию от проверенных производителей с полной гарантией качества.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center p-6">
                <div className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Скорость</h4>
                <p className="text-gray-600">
                  Быстрая обработка заказов и доставка по всей России. Большинство товаров доставляется в течение 1-3 дней.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="text-center p-6">
                <div className="bg-gray-900 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-semibold mb-3">Сервис</h4>
                <p className="text-gray-600">
                  Профессиональная поддержка клиентов, консультации по выбору товаров и полноценное послепродажное обслуживание.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Stats Section */}
        <Card>
          <CardContent className="p-8">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
