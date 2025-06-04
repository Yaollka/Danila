import SimpleLayout from '@/components/layout/HomeLayout';

export default function About() {
  return (
    <SimpleLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">О компании TechEmpire</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Мы - ведущий поставщик высококачественной электроники и компьютерных комплектующих в России
          </p>
        </div>

        {/* Company Story */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Наша история</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                TechEmpire была основана в 2018 году группой энтузиастов технологий, которые стремились 
                предоставить российским потребителям доступ к самым современным и качественным 
                электронным устройствам по справедливым ценам.
              </p>
              <p>
                За годы работы мы выстроили прочные партнерские отношения с ведущими мировыми 
                производителями электроники, что позволяет нам предлагать только оригинальную 
                продукцию с официальной гарантией.
              </p>
              <p>
                Сегодня TechEmpire - это команда из более чем 200 специалистов, работающих 
                в 15 городах России, и тысячи довольных клиентов по всей стране.
              </p>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
              alt="Команда TechEmpire" 
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">Наши ценности</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Качество</h3>
              <p className="text-gray-600">
                Мы предлагаем только оригинальную продукцию от проверенных производителей 
                с полной гарантией качества.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Скорость</h3>
              <p className="text-gray-600">
                Быстрая обработка заказов и доставка по всей России. 
                Большинство товаров доставляется в течение 1-3 дней.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Сервис</h3>
              <p className="text-gray-600">
                Профессиональная поддержка клиентов, консультации по выбору товаров 
                и полноценное послепродажное обслуживание.
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">TechEmpire в цифрах</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
              <div className="text-gray-600">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-gray-600">Товаров в каталоге</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-gray-600">Городов присутствия</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Положительных отзывов</div>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-6">Наша миссия</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Делать современные технологии доступными для каждого, предоставляя качественные 
            продукты, профессиональные консультации и надежный сервис. Мы верим, что правильно 
            подобранная техника способна улучшить жизнь людей и помочь им достичь своих целей.
          </p>
        </div>
      </div>
    </SimpleLayout>
  );
}