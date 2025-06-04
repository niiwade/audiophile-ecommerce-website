'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductBySlug, getAllProducts } from '../../../data/products';
import { useCart } from '../../../components/CartProvider';
import CategoryNav from '../../../components/CategoryNav';
import QuantitySelector from '../../../components/QuantitySelector';

export default function ProductDetailPage({ params }) {
  const { slug } = params;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // Get product details
    const productData = getProductBySlug(slug);
    if (!productData) {
      router.push('/');
      return;
    }
    setProduct(productData);

    // Get related products based on category and ensure uniqueness
    const allProducts = getAllProducts();
    
    // First try to get products from the same category
    let sameCategory = allProducts.filter(p => 
      p.id !== productData.id && p.category === productData.category
    );
    
    // If we don't have enough from the same category, get others
    let others = allProducts.filter(p => 
      p.id !== productData.id && p.category !== productData.category
    );
    
    // Create a unique set of related products for this specific product
    let related;
    
    // Use a deterministic approach based on product ID to ensure consistency
    // This ensures each product always shows the same related products
    switch(productData.slug) {
      case 'xx99-mark-ii-headphones':
        // For flagship headphones, show other headphones and the top speaker
        related = allProducts.filter(p => [
          'xx99-mark-i-headphones', 'xx59-headphones', 'zx9-speaker'
        ].includes(p.slug));
        break;
        
      case 'xx99-mark-i-headphones':
        related = allProducts.filter(p => [
          'xx99-mark-ii-headphones', 'xx59-headphones', 'zx7-speaker'
        ].includes(p.slug));
        break;
        
      case 'xx59-headphones':
        related = allProducts.filter(p => [
          'xx99-mark-ii-headphones', 'xx99-mark-i-headphones', 'yx1-earphones'
        ].includes(p.slug));
        break;
        
      case 'zx9-speaker':
        related = allProducts.filter(p => [
          'zx7-speaker', 'xx99-mark-i-headphones', 'xx59-headphones'
        ].includes(p.slug));
        break;
        
      case 'zx7-speaker':
        related = allProducts.filter(p => [
          'zx9-speaker', 'xx99-mark-ii-headphones', 'yx1-earphones'
        ].includes(p.slug));
        break;
        
      case 'yx1-earphones':
        related = allProducts.filter(p => [
          'xx99-mark-i-headphones', 'xx59-headphones', 'zx9-speaker'
        ].includes(p.slug));
        break;
        
      default:
        // Fallback to a mix of same category and others
        related = [...sameCategory, ...others]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
    }
    
    // Ensure we only have 3 products
    related = related.slice(0, 3);
    
    setRelatedProducts(related);
  }, [slug, router]);

  if (!product) {
    return <div className="container mx-auto px-6 py-16">Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <>
      {/* Product Header */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <Link href="javascript:history.back()" className="flex items-center text-gray-500 hover:text-orange-500 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center relative aspect-square">
            {product.image && (
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>

          {/* Product Info */}
          <div>
            {product.new && (
              <p className="text-orange-500 tracking-[0.5em] text-sm uppercase mb-6 font-medium">NEW PRODUCT</p>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 uppercase tracking-wider leading-tight">{product.name}</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">{product.description}</p>
            <p className="text-xl font-bold mb-8">${product.price.toLocaleString()}</p>

            <div className="flex items-center">
              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-100 mr-4">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-500 hover:text-orange-500 font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-3 font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-500 hover:text-orange-500 font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="bg-orange-500 text-white px-8 py-3 hover:bg-orange-600 transition-colors uppercase text-sm font-bold tracking-wider"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features and In The Box */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase">FEATURES</h2>
            <div className="space-y-6">
              {product.features.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-500 leading-relaxed">{paragraph}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 uppercase">IN THE BOX</h2>
            <ul className="space-y-3">
              {product.inBox.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-orange-500 font-bold mr-6">{item.quantity}x</span>
                  <span className="text-gray-500">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left column with two images */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Top left image */}
            <div className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
              {product.gallery && product.gallery[0] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src={product.gallery[0]} 
                    alt={product.name + ' gallery 1'} 
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              )}
            </div>
            {/* Bottom left image */}
            <div className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
              {product.gallery && product.gallery[1] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src={product.gallery[1]} 
                    alt={product.name + ' gallery 2'} 
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              )}
            </div>
          </div>
          {/* Right large image (spans full height) */}
          <div className="md:col-span-7 relative aspect-square md:aspect-auto md:h-full bg-gray-900 rounded-lg overflow-hidden">
            {product.gallery && product.gallery[2] && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image 
                  src={product.gallery[2]} 
                  alt={product.name + ' gallery 3'} 
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="container mx-auto px-6 pt-2 pb-16 md:pt-4 md:pb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center uppercase tracking-wider py-12">YOU MAY ALSO LIKE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map(related => (
            <div key={related.id} className="flex flex-col items-center">
              <div className="bg-gray-100 rounded-lg h-48 md:h-64 w-full mb-8 relative">
                {related.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
              </div>
              <h3 className="text-base md:text-lg font-bold mb-8 uppercase tracking-wide text-center">
                {related.category === 'headphones' && related.name.includes('XX') ? 
                  related.name.replace('Headphones', '').trim() : 
                  related.name.replace('Speaker', '').replace('Earphones', '').trim()}
              </h3>
              <Link
                href={`/products/${related.slug}`}
                className="bg-orange-500 text-white px-8 py-3 hover:bg-orange-600 transition-colors uppercase text-xs font-bold tracking-widest"
              >
                SEE PRODUCT
              </Link>
            </div>
          ))}
        </div>
      </section>

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
