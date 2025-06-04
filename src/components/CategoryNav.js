'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CategoryNav() {
  const categories = [
    { name: 'Headphones', image: '/images/category-headphones.png', link: '/headphones' },
    { name: 'Speakers', image: '/images/category-speakers.png', link: '/speakers' },
    { name: 'Earphones', image: '/images/category-earphones.png', link: '/earphones' }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.name}
              className="bg-gray-100 rounded-lg p-6 text-center relative pt-20 uppercase  hover:shadow-lg transition-shadow"
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-32 h-32">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
              <h3 className="font-bold text-lg mb-4">{category.name}</h3>
              <Link 
                href={category.link}
                className="inline-flex items-center text-gray-500 hover:text-orange-500 transition-colors"
              >
                <span className="mr-2">SHOP</span>
                <svg width="8" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.322 1l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
