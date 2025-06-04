interface SubMenuProps {
  onCategoryFilter: (category: string) => void;
  activeCategory: string;
}

export default function SubMenu({ onCategoryFilter, activeCategory }: SubMenuProps) {
  const menuItems = [
    { id: 'all', name: 'Все категории' },
    { id: 'monitors', name: 'Мониторы' },
    { id: 'keyboards', name: 'Клавиатуры' },
    { id: 'mice', name: 'Мыши' },
    { id: 'graphics', name: 'Видеокарты' },
    { id: 'motherboards', name: 'Материнские платы' },
    { id: 'processors', name: 'Процессоры' },
    { id: 'cases', name: 'Системные блоки' },
  ];

  return (
    <div id="SubMenu" className="border-b bg-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
        <ul className="flex items-center text-[13px] text-[#333333] px-2 h-8 overflow-x-auto">
          {menuItems.map(item => (
            <li 
              key={item.id} 
              className={`px-3 hover:underline cursor-pointer whitespace-nowrap ${
                activeCategory === item.id ? 'font-bold text-black' : ''
              }`}
              onClick={() => onCategoryFilter(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
