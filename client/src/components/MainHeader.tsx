import { Search } from 'lucide-react';
import { useState } from 'react';

interface MainHeaderProps {
  onSearch: (query: string) => void;
}

export default function MainHeader({ onSearch }: MainHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div id="MainHeader" className="border-b bg-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <div className="flex items-center w-full bg-white">
          <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
            <div className="cursor-pointer">
              <div className="text-2xl font-bold text-primary"><a href="/">TechEmpire</a></div>
              <div className="text-xs text-gray-500">Электроника и технологии</div>
            </div>

            <div className="w-full">
              <div className="relative">
                <div className="flex items-center">
                  <div className="relative flex items-center border-2 border-gray-900 w-full p-2">
                    <button className="flex items-center" onClick={handleSearch}>
                      <Search size={22} />
                    </button>

                    <input 
                      className="w-full placeholder-gray-400 text-sm pl-3 focus:outline-none"
                      placeholder="искать на TechEmpire"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  

                  <button 
                    className="flex items-center bg-neutral-900 text-sm font-semibold text-white p-[11px] ml-2 px-14 hover:bg-neutral-800 transition-colors"
                    onClick={handleSearch}
                  >
                    Найти
                  </button>
                  <button
                    onClick={onShowCart}
                    className="relative flex items-center text-gray-700 hover:text-blue-600"
                    aria-label="Открыть корзину"
                  >
                    <ShoppingCart className="w-6 h-6" />

                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
                        {totalItems}
                      </span>
                    )}
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
