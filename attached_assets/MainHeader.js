"use client"

import Link from "next/link"
import { AiOutlineSearch } from 'react-icons/ai'
import { BiLoaderCircle } from 'react-icons/bi'

export default function MainHeader() {
    return (
        <>
            <div id="MainHeader" className="border-b">
                <div className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                    <div className="flex items-center w-full bg-white">
                        <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
                            <Link href="/">
                                <img width="120" src="/images/logo.svg" className="-mt-7"/>
                            </Link>

                            <div className="w-full">
                                <div className="relative">
                                    <div className="flex items-center">
                                        <div className="relative flex items-center border-2 border-gray-900 w-full p-2">

                                            <button className="flex items-center">
                                                <AiOutlineSearch size={22}/>
                                            </button>

                                            <input 
                                                className="
                                                    w-full
                                                    placeholder-gray-400
                                                    text-sm
                                                    pl-3
                                                    focus:outline-none
                                                "
                                                placeholder="искать на TechEmpire"
                                                type="text"
                                            />

                                        </div>

                                        <button className="flex items-center bg-neutral-900 text-sm font-semibold text-white p-[11px] ml-2 px-14">
                                            Найти
                                        </button>

                                        <div className="text-xs px-2 hover:text-blue-500 cursor-pointer">Продвинутый</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}