import Image from "next/image";
import Link from "next/link";
import CategoryNav from "../components/CategoryNav";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#141414] text-white relative">
        <div className="container mx-auto px-6 py-0 md:py-0 lg:py-0">
          {/* Mobile version */}
          <div className="md:hidden relative h-[600px] overflow-hidden">
            <Image
              src="/images/hero-mark-ii-headphones.png"
              alt="XX99 Mark II Headphones"
              fill
              className="object-contain z-10"
              priority
            />
            <div className="absolute inset-0 bg-black opacity-90 z-0"></div>
            
            {/* Content overlay for mobile */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pt-12">
              <p className="text-gray-400 tracking-[0.50em] uppercase text-sm mb-4">N E W  P R O D U C T</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-6 uppercase">XX99 MARK II<br />HEADPHONES</h1>
              <p className="text-gray-400 mb-8 text-base max-w-xs">
                Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
              </p>
              <Link 
                href="/products/xx99-mark-ii-headphones"
                className="bg-orange-500 text-white px-8 py-3 inline-block hover:bg-orange-600 transition-colors uppercase tracking-wider"
              >
                See Product
              </Link>
            </div>
          </div>
          
          {/* Desktop version */}
          <div className="hidden md:flex h-[632px]  relative overflow-hidden">
            {/* Left content */}
            <div className="w-1/2 flex flex-col justify-center items-start pr-8">
              <p className="text-gray-400 tracking-[0.50em] uppercase text-sm mb-6">N E W  P R O D U C T</p>
              <h1 className="text-5xl lg:text-6xl font-bold mb-8 uppercase leading-tight">XX99 MARK II<br />HEADPHONES</h1>
              <p className="text-gray-400 mb-10 text-base max-w-md">
                Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
              </p>
              <Link 
                href="/products/xx99-mark-ii-headphones"
                className="bg-orange-500 text-white px-8 py-4 inline-block hover:bg-orange-600 transition-colors uppercase tracking-wider"
              >
                See Product
              </Link>
            </div>
            
            {/* Right image */}
            <div className="w-1/2 relative">
              <Image
                src="/images/hero-mark-ii-headphones.png"
                alt="XX99 Mark II Headphones"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-16"> 
        <CategoryNav />
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {/* ZX9 Speaker Feature */}
          <div className="bg-orange-500 text-white rounded-lg overflow-hidden mb-12 relative">
            {/* Background Pattern - Circles */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center">
              <Image 
                src="/images/pattern-circles.svg"
                alt="Background Pattern"
                width={1000}
                height={1000}
                className="opacity-90"
                priority
              />
            </div>
            
            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col items-center text-center p-10 pb-12 relative z-10">
              <div className="relative h-52 w-52 mb-8">
                <Image 
                  src="/images/zx9-speaker.png"
                  alt="ZX9 Speaker"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h2 className="text-4xl font-bold mb-6 uppercase">ZX9<br/>SPEAKER</h2>
              <p className="mb-8 text-sm max-w-xs">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <Link 
                href="/products/zx9-speaker"
                className="bg-black text-white px-8 py-3 inline-block hover:bg-gray-800 transition-colors uppercase tracking-wider"
              >
                See Product
              </Link>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-2 gap-12 items-center p-12 lg:p-24 relative z-10">
              <div className="relative h-[420px] lg:h-[400px] top-28">
                <Image 
                  src="/images/zx9-speaker.png"
                  alt="ZX9 Speaker"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="max-w-md">
                <h2 className="text-4xl lg:text-5xl font-bold mb-8 uppercase">ZX9<br/>SPEAKER</h2>
                <p className="mb-10 text-base">
                  Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                </p>
                <Link 
                  href="/products/zx9-speaker"
                  className="bg-black text-white px-8 py-4 inline-block hover:bg-gray-800 transition-colors uppercase tracking-wider"
                >
                  See Product
                </Link>
              </div>
            </div>
          </div>

          {/* ZX7 Speaker Feature */}
          <div className="rounded-lg mb-12 relative h-80 md:h-96 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <Image 
                src="/images/image-speaker-zx7.jpg"
                alt="ZX7 Speaker Background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="relative z-10 h-full flex items-center p-8 md:p-16">
              <div className="max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">ZX7 SPEAKER</h2>
                <Link 
                  href="/products/zx7-speaker"
                  className="border border-black bg-transparent px-8 py-3 inline-block hover:bg-black hover:text-white transition-colors"
                >
                  SEE PRODUCT
                </Link>
              </div>
            </div>
          </div>

          {/* YX1 Earphones Feature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg h-64 md:h-80 relative overflow-hidden">
              {/* Earphone image container */}
              <Image 
                src="/images/image-earphones-yx1.jpg"
                alt="YX1 Earphones"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="bg-gray-100 rounded-lg p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">YX1 EARPHONES</h2>
              <Link 
                href="/products/yx1-earphones"
                className="border border-black px-8 py-3 inline-block w-max hover:bg-black hover:text-white transition-colors"
              >
                SEE PRODUCT
              </Link>
            </div>
          </div>
        </div>
      </section>

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
