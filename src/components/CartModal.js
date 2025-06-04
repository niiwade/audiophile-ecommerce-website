'use client';

import { useEffect, useRef, useCallback } from 'react';
import { formatPrice } from '../formatPrice';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from './CartProvider';



export default function CartModal() {
  const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, clearCart, getCartTotal, closeCart, setIsCartOpen: rawSetIsCartOpen } = useCart();
  // Note: We are still destructuring setIsCartOpen as rawSetIsCartOpen for the handleClickOutside, 
  // but the primary closeCart function used for Escape key and focus trap will be from context.
  // The context's closeCart is already stable. If handleClickOutside needs a stable toggleCart, that's also from context.
  // For now, let's assume toggleCart is what was intended for handleClickOutside, or use the context's closeCart. 
  // The original code used toggleCart in handleClickOutside, let's stick to that for now.
  // The main issue was the local closeCart redefinition causing problems with useEffect dependencies and the TypeError.

  const modalRef = useRef(null);
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleCart();
      }
    };
    
    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);
  
  // Accessibility: focus trap and Escape key close
  useEffect(() => {
    if (!isCartOpen) return;
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = modalRef.current;
    const firstFocusable = modal?.querySelectorAll(focusableElements)[0];
    const focusEls = modal?.querySelectorAll(focusableElements);
    const lastFocusable = focusEls?.[focusEls.length - 1];
    if (firstFocusable) firstFocusable.focus();

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        closeCart();
      }
      if (e.key === 'Tab' && focusEls && focusEls.length > 0) {
        // Focus trap
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;
  
  const cartTotal = getCartTotal();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        tabIndex={-1}
        className="fixed z-50 bg-white rounded-lg p-6 sm:p-8 w-full max-w-md mx-4 shadow-lg focus:outline-none
          top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          md:top-8 md:right-8 md:left-auto md:translate-x-0 md:translate-y-0"

      >


        
        <div className="flex justify-between items-center mb-8">

        <div className="flex justify-between items-end mb-6">
              <span className="text-gray-700 font-bold">CART<span className="text-sm font-semibold text-gray-700">({itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'})</span></span>
              <span className="font-bold text-lg">{formatPrice(getCartTotal())}</span>
            </div>
          <h2 className="text-lg font-bold">CART ({itemCount})</h2>
          {cartItems.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-gray-500 hover:text-orange-500 hover:underline"
            >
              Remove all
            </button>
          )}
        </div>
        
        {cartItems.length === 0 ? (
          <p className="text-center py-8 text-gray-500">Your cart is empty</p>
        ) : (
          <>
            <ul className="space-y-6 mb-6 max-h-80 overflow-y-auto">
              {cartItems.map(item => (
                <li key={item.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-100 rounded-lg h-16 w-16 flex items-center justify-center mr-4 relative overflow-hidden">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-contain p-1" 
                        sizes="64px"
                      />
                    ) : (
                      <div className="text-xs text-gray-500">{item.name.split(' ')[0]}</div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-black text-sm">{item.name.split(' ').slice(0, 2).join(' ')}</p>
                    <p className="text-gray-500 text-sm">${item.price.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center bg-gray-100 px-2 py-1 mr-3">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 text-gray-500 hover:text-orange-500 font-bold"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 text-gray-500 hover:text-orange-500 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </li>
              ))}
            </ul>

           

            <Link 
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-orange-500 text-white text-center py-3 rounded-md hover:bg-orange-600 transition-colors"
            >
              CHECKOUT
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
