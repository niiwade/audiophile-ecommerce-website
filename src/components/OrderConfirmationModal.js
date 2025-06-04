'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderConfirmationModal({ orderSummary, onClose }) {
  const modalRef = useRef(null);
  
  // Show only the first item and indicate if there are more
  const firstItem = orderSummary.items[0];
  const remainingItemsCount = orderSummary.items.length - 1;
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg p-6 md:p-8 max-w-lg w-full"
      >
        <div className="text-orange-500 mb-6">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="currentColor"/>
            <path d="M20.7539 33.3328L27.5054 40.0843L43.3085 24.2812" stroke="white" strokeWidth="4"/>
          </svg>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          THANK YOU<br />FOR YOUR ORDER
        </h2>
        
        <p className="text-gray-500 mb-6">
          You will receive an email confirmation shortly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-5 rounded-lg overflow-hidden mb-6">
          {/* Order items summary */}
          <div className="bg-gray-100 p-4 md:col-span-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-white rounded h-12 w-12 flex items-center justify-center mr-3 relative overflow-hidden">
                  {firstItem.image ? (
                    <Image 
                      src={firstItem.image} 
                      alt={firstItem.name} 
                      fill 
                      className="object-contain p-1" 
                      sizes="48px"
                    />
                  ) : (
                    <div className="text-xs text-gray-400">{firstItem.name.split(' ')[0]}</div>
                  )}
                </div>
                <div>
                  <p className="font-bold">{firstItem.name.split(' ').slice(0, 2).join(' ')}</p>
                  <p className="text-gray-500 text-sm">${firstItem.price.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-gray-500">x{firstItem.quantity}</p>
            </div>
            
            {remainingItemsCount > 0 && (
              <>
                <hr className="my-3" />
                <p className="text-center text-gray-500 text-sm font-bold">
                  and {remainingItemsCount} other item{remainingItemsCount > 1 ? 's' : ''}
                </p>
              </>
            )}
          </div>
          
          {/* Grand total */}
          <div className="bg-black text-white p-4 flex flex-col justify-center md:col-span-2">
            <p className="text-gray-400 mb-1">GRAND TOTAL</p>
            <p className="font-bold">${orderSummary.grandTotal.toLocaleString()}</p>
          </div>
        </div>
        
        <Link 
          href="/"
          className="bg-orange-500 text-white py-3 w-full block text-center hover:bg-orange-600 transition-colors"
          onClick={onClose}
        >
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
}
