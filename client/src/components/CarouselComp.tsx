import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CarouselComp() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      alt: 'Игровые мониторы и периферия'
    },
    {
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400',
      alt: 'Механические клавиатуры'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => prev === 0 ? slides.length - 1 : prev - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto mt-4">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <div 
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img 
                src={slide.image} 
                alt={slide.alt} 
                className="w-full h-[400px] object-cover" 
              />
            </div>
          ))}
        </div>
        
        <button 
          onClick={previousSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          <ChevronLeft size={20} />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
