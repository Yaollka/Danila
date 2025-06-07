'use client'

export default function Footer() {
    return (
        <>
            <div id="Footer" className="border-t mt-20 px-2">
                <div className="flex items-baseline justify-between w-full mx-auto max-w-[1200px] py-10">
                    <ul className="text-gray-700">
                        <li className="font-bold text-lg">Покупка</li>
                        <li className="mt-2 py-1 text-xs hover:underline cursor-pointer">Регистрация</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Помощь с покупкой</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Магазины</li>
                    </ul>


                    <ul className="text-gray-700">
                        <li className="font-bold text-lg">О Нас</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Новости</li>
                        <li className="py-1 text-xs hover:underline cursor-pointer">Информация о компании </li>

                    </ul>

                </div>
            </div>
        </>
    )
  }