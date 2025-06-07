import SimpleLayout from '@/components/layout/HomeLayout';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const supportPhone = '+7 (495) 123-45-67';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Сообщение отправлено",
      description: "Мы получили ваше сообщение и свяжемся с вами в ближайшее время",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <SimpleLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Помощь и контакты</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Нужна помощь? Мы готовы ответить на все ваши вопросы и помочь с выбором
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Как с нами связаться</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Телефон поддержки</h3>
                  <p className="text-gray-600 mb-1">{supportPhone}</p>
                  <p className="text-sm text-gray-500">Бесплатно по России</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-gray-600 mb-1">support@techempire.ru</p>
                  <p className="text-sm text-gray-500">Ответим в течение 2 часов</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Офис</h3>
                  <p className="text-gray-600 mb-1">г. Москва, ул. Тверская, д. 15, стр. 1</p>
                  <p className="text-sm text-gray-500">БЦ "Технопарк", 5 этаж</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Время работы</h3>
                  <p className="text-gray-600 mb-1">Пн-Пт: 9:00 - 21:00</p>
                  <p className="text-gray-600 mb-1">Сб-Вс: 10:00 - 18:00</p>
                  <p className="text-sm text-gray-500">Московское время</p>
                </div>
              </div>
            </div>

            {/* How to Place Order */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4">Как сделать заказ</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                  <p>Выберите товары и добавьте их в корзину.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                  <p>Перейдите в раздел <strong>Корзина</strong> и нажмите <strong>Перейти к оформлению</strong>.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                  <p>Укажите ваши данные. Если вы не авторизованы, авторизуйтесь с помощью номера телефона или почты.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">4</span>
                  <p>Выберите способ доставки и укажите адрес. Если вы заказываете крупногабаритный товар, убедитесь, что такие товары доставляются в ваш регион.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">5</span>
                  <p>Выберите способ оплаты и нажмите <strong>Оплатить онлайн</strong>.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">6</span>
                  <p>Оплатите заказ.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-primary mb-6">Написать нам</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Имя *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="ваш@email.ru"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Тема обращения
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Выберите тему</option>
                  <option value="order">Вопрос по заказу</option>
                  <option value="product">Консультация по товару</option>
                  <option value="delivery">Доставка</option>
                  <option value="warranty">Гарантия и сервис</option>
                  <option value="other">Другое</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Сообщение *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Опишите ваш вопрос или проблему..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5 inline mr-2" />
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Как нас найти</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.7486265432867!2d37.60457531592895!3d55.76415698055657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5046ee9fff%3A0xd1794c5b3b43efc6!2z0KLQstC10YDRgdC60LDRjyDRg9C7LiwgMTUsINCc0L7RgdC60LLQsCwg0KDQvtGB0YHQuNGPLCAxMjUwMDk!5e0!3m2!1sru!2sru!4v1649876543210!5m2!1sru!2sru"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта офиса TechEmpire"
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                <strong>Адрес:</strong> г. Москва, ул. Тверская, д. 15, стр. 1, БЦ "Технопарк", 5 этаж
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Ближайшее метро:</strong> Тверская, Пушкинская (5 минут пешком)
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-16 bg-white border rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-4">Способы оплаты</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Банковская карта</h4>
              <p className="text-sm text-gray-600 mb-3">
                Чтобы оплатить заказ банковской картой, при оформлении заказа в разделе 
                <strong> Способ оплаты</strong> выберите сохранённую карту или нажмите <strong>Новой картой</strong>.
              </p>
              <p className="text-sm text-gray-600 mb-3">
                К оплате принимаются банковские карты, у которых 16, 18, 19 цифр в номере:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• VISA, MasterCard, МИР, China UnionPay, JCB и American Express;</li>
                <li>• VISA Electron/Plus, Cirrus/Maestro, если у них есть код CVC2 и CVV2;</li>
                <li>• Халва;</li>
                <li>• Совесть;</li>
              </ul>
              <p className="text-sm text-gray-600 mt-3">
                <strong>Минимальная сумма оплаты —</strong> 1 рубль.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-gray-100 rounded-lg p-4 w-full max-w-sm">
                <div className="flex justify-center space-x-2 mb-4">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                  <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                  <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">МИР</div>
                </div>
                <div className="bg-white rounded p-3 text-center">
                  <div className="text-lg font-mono text-gray-800">•••• •••• •••• 1234</div>
                  <div className="text-sm text-gray-500 mt-2">Безопасная оплата</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimpleLayout>
  );
}