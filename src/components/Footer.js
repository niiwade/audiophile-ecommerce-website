'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12 pb-8">
      <div className="container mx-auto px-6">
        {/* Content wrapper with responsive layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start max-w-6xl mx-auto">
          {/* Left column for mobile (becomes left section in desktop) */}
          <div className="flex flex-col items-center md:items-start md:max-w-sm">
            {/* Orange line at top of footer */}
            <div className="w-24 h-1 bg-orange-500 mb-10 md:mb-8"></div>
            
            {/* Logo */}
            <div className="mb-10 md:mb-8">
              <Link href="/" className="text-2xl font-bold inline-block">
                audiophile
              </Link>
            </div>
            
            {/* Description - Moves to left column on desktop */}
            <div className="mb-12 md:mb-0">
              <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left">
                Audiophile is an all in one stop to fulfill your audio needs. We&apos;re a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we&apos;re open 7 days a week.
              </p>
            </div>
          </div>
          
          {/* Middle column for desktop navigation */}
          <div className="md:self-start md:mt-16">
            {/* Navigation - Stacked in mobile, horizontal in desktop */}
            <nav className="mb-12 md:mb-0">
              <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 items-center md:items-start">
                <li>
                  <Link href="/" className="hover:text-orange-500 transition-colors text-sm tracking-widest">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link href="/headphones" className="hover:text-orange-500 transition-colors text-sm tracking-widest">
                    HEADPHONES
                  </Link>
                </li>
                <li>
                  <Link href="/speakers" className="hover:text-orange-500 transition-colors text-sm tracking-widest">
                    SPEAKERS
                  </Link>
                </li>
                <li>
                  <Link href="/earphones" className="hover:text-orange-500 transition-colors text-sm tracking-widest">
                    EARPHONES
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Right column for desktop */}
          <div className="md:self-end md:flex md:flex-col md:items-end">
            {/* Social Media Icons - Bottom in mobile, right in desktop */}
            <div className="flex justify-center md:justify-end space-x-4 mb-8 md:mb-0">
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Facebook">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" 
                    fill="currentColor" fillRule="nonzero"/>
                </svg>
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Twitter">
                <svg width="24" height="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z" 
                    fill="currentColor" fillRule="nonzero"/>
                </svg>
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Instagram">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" 
                    fill="currentColor" fillRule="nonzero"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright - Always at bottom */}
        <div className="mt-8 text-gray-400 text-sm text-center md:text-left max-w-6xl mx-auto">
          <p>Copyright 2021. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
