'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, index }) {
  // Format price as currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  // Alternate layout based on index
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center py-12`}>
      <div className="w-full md:w-1/2 bg-gray-100 rounded-lg p-8 flex items-center justify-center">
        {product.image && (
          <div className="relative w-full aspect-square max-w-md">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 text-center md:text-left">
        {product.new && (
          <p className="text-orange-500 tracking-widest uppercase mb-4">New Product</p>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{product.name}</h2>
        <p className="text-gray-500 mb-8">{product.description}</p>
        <p className="font-bold text-lg mb-8">{formatPrice(product.price)}</p>
        <Link 
          href={`/products/${product.slug}`}
          className="bg-orange-500 text-white px-8 py-3 inline-block hover:bg-orange-600 transition-colors"
        >
          SEE PRODUCT
        </Link>
      </div>
    </div>
  );
}
