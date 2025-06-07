"use client"

import { Carousel } from 'react-responsive-carousel'
import MainLayout from './layouts/MainLayout'
import CarouselComp from './components/CarouselComp'
import Product from './components/Product';
export default function Home() {
  return (
    <MainLayout>
      <CarouselComp />
      <div className="max-w-[1200px] mx-auto">
        <div className="text-2xl font-bold mt-4 mb-6 px-4">Products</div>

           <div className="grid grid-cols-5 gap-4">
          
        </div>
      </div>
    </MainLayout>
  )
}

