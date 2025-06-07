export default function Footer() {
  return (
    <footer className="border-t mt-20 px-2 bg-white">
      <div className="max-w-[1200px] mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Покупка */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Покупка</h3>
            <ul className="space-y-2">
              <li>
                <a href="/api/login" className="text-sm text-gray-600 hover:text-primary hover:underline">
                  Регистрация
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-600 hover:text-primary hover:underline">
                  Помощь с покупкой
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-gray-600 hover:text-primary hover:underline">
                  Каталог товаров
                </a>
              </li>
              <li>
                <a href="/pc-builder" className="text-sm text-gray-600 hover:text-primary hover:underline">
                  Конструктор ПК
                </a>
              </li>
            </ul>
          </div>

          {/* О компании */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">О компании</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-gray-600 hover:text-primary hover:underline">
                  О нас
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-gray-600 hover:text-primary hover:underline">
                  Контакты
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-600">Новости</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Вакансии</span>
              </li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Поддержка</h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-sm text-gray-600 hover:text-primary hover:underline">
                  Помощь и контакты
                </a>
              </li>
              <li>
                <span className="text-sm text-gray-600">Доставка и оплата</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Возврат товара</span>
              </li>
              <li>
                <span className="text-sm text-gray-600">Гарантия</span>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">Контакты</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Телефон:</strong><br />
                +7 (495) 123-45-67
              </p>
              <p className="text-sm text-gray-600">
                <strong>Email:</strong><br />
                support@techempire.ru
              </p>
              <p className="text-sm text-gray-600">
                <strong>Адрес:</strong><br />
                г. Москва, ул. Тверская, 15
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2024 TechEmpire. Все права защищены.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">Политика конфиденциальности</span>
              <span className="text-sm text-gray-500">Условия использования</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
