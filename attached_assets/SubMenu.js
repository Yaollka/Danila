"use client"

export default function SubMenu() {

    const menuItems = [
        { id: 1, name: 'На главную' },
        { id: 2, name: 'Сохраненные' },
        { id: 3, name: 'Мониторы' },
        { id: 4, name: 'Клавиатуры' },
        { id: 5, name: 'Мыши' },
        { id: 6, name: 'Видеокарты' },
        { id: 7, name: 'Материнские платы' },
        { id: 8, name: 'Процессоры' },
        { id: 9, name: 'Системные блоки' },
        { id: 10, name: 'Продано' },
    ]

    return (
        <>
            <div id="SubMenu" className="border-b">
                <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                    <ul 
                        id="TopMenuLeft"
                        className="
                            flex 
                            items-center 
                            text-[13px] 
                            text-[#333333]
                            px-2 
                            h-8
                        "
                    >
                        {menuItems.map(item => (
                            <li key={item.id} className="px-3 hover:underline cursor-pointer">
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}