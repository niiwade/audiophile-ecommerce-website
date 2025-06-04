'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import CategoryNav from '../../components/CategoryNav';
import { getProductsByCategory } from '../../data/products';
import Image from "next/image";

export default function EarphonesPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Get earphones products
    const earphonesProducts = getProductsByCategory('earphones');
    setProducts(earphonesProducts);
  }, []);

  return (
    <>
      {/* Category Header */}
      <div className="bg-black text-white py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">EARPHONES</h1>
        </div>
      </div>

      {/* Products List */}
      <div className="container mx-auto px-6 py-16">
        <div className="space-y-24">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      {/* Category Navigation */}
      <CategoryNav />

     {/* About Section */}
           <section className="py-16 md:py-24">
             <div className="container mx-auto px-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
                 <div className="order-2 md:order-1 max-w-xl">
                   <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 uppercase leading-tight">Bringing you the <span className="text-orange-500">best</span> audio gear</h2>
                   <p className="text-gray-500 leading-relaxed">
                     Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
                   </p>
                 </div>
                 <div className="order-1 md:order-2 relative rounded-lg overflow-hidden h-64 md:h-[500px]">
                   <Image 
                     src="/images/image-best-gear.jpg" 
                     alt="Man wearing premium headphones"
                     fill  
                     className="object-cover rounded-lg"
                     priority
                   />
                 </div>
               </div>
             </div>
           </section>
    </>
  );
}
