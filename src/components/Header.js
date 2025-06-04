'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartProvider';
import CartModal from './CartModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, isCartOpen, getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  return (
    <header className="bg-[#141414] text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
              <g fill="#FFF" fillRule="evenodd">
                <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z"/>
              </g>
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.svg" 
              alt="audiophile logo" 
              width={143} 
              height={25} 
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/headphones" className="hover:text-orange-500 transition-colors">
                  HEADPHONES
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="hover:text-orange-500 transition-colors">
                  SPEAKERS
                </Link>
              </li>
              <li>
                <Link href="/earphones" className="hover:text-orange-500 transition-colors">
                  EARPHONES
                </Link>
              </li>
            </ul>
          </nav>

          {/* Cart button */}
          <button 
            className="relative focus:outline-none" 
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" 
                fill="#FFF" fillRule="nonzero"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link href="/" className="block py-2 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  HOME
                </Link>
              </li>
              <li>
                <Link href="/headphones" className="block py-2 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  HEADPHONES
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="block py-2 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  SPEAKERS
                </Link>
              </li>
              <li>
                <Link href="/earphones" className="block py-2 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
                  EARPHONES
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Cart Modal */}
      {isCartOpen && <CartModal />}
    </header>
  );
}
