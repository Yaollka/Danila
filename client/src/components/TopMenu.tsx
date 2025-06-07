import { Link } from 'wouter';

export default function TopMenu() {
  return (
    <div className="bg-primary text-white px-4 py-2">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center text-sm">
        <div className="flex items-center space-x-6">
          <span>Бесплатная доставка от 5000 ₽</span>
          <span>Гарантия качества</span>
          <span>Тех. поддержка 24/7</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/about" className="hover:text-blue-200">О нас</Link>
          <Link href="/contact" className="hover:text-blue-200">Помощь</Link>
          <Link href="/pc-builder" className="hover:text-blue-200">Конструктор ПК</Link>
        </div>
      </div>
    </div>
  );
}