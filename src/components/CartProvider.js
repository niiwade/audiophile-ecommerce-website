'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    console.log('[CartProvider] Attempting to load cart from localStorage...');
    const savedCart = localStorage.getItem('audiophileCart');
    if (savedCart) {
      console.log('[CartProvider] Found savedCart in localStorage:', savedCart);
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
        console.log('[CartProvider] Successfully parsed and set cartItems:', parsedCart);
      } catch (error) {
        console.error('[CartProvider] Failed to parse saved cart:', error);
        localStorage.removeItem('audiophileCart');
      }
    } else {
      console.log('[CartProvider] No savedCart found in localStorage.');
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log('[CartProvider] Attempting to save cart to localStorage. Current cartItems:', cartItems);
    try {
      const stringifiedCart = JSON.stringify(cartItems);
      localStorage.setItem('audiophileCart', stringifiedCart);
      console.log('[CartProvider] Successfully saved cartItems to localStorage:', stringifiedCart);
    } catch (error) {
      console.error('[CartProvider] Failed to stringify or save cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    console.log('[CartProvider] addToCart called with product:', product, 'quantity:', quantity);
    setCartItems(prevItems => {
      console.log('[CartProvider] addToCart - prevItems:', prevItems);
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
      // Log new items after update
      const newItems = existingItem 
        ? prevItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...prevItems, { ...product, quantity }];
      console.log('[CartProvider] addToCart - newItems:', newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    console.log('[CartProvider] removeFromCart called with productId:', productId);
    setCartItems(prevItems => {
      console.log('[CartProvider] removeFromCart - prevItems:', prevItems);
      const newItems = prevItems.filter(item => item.id !== productId);
      console.log('[CartProvider] removeFromCart - newItems:', newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      console.log('[CartProvider] updateQuantity - prevItems:', prevItems);
      const newItems = prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      );
      console.log('[CartProvider] updateQuantity - newItems:', newItems);
      return newItems;
    }
    );
  };

  const clearCart = () => {
    console.log('[CartProvider] clearCart called. Current cartItems:', cartItems);
    setCartItems([]);
    console.log('[CartProvider] cartItems after clearCart:', []);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Calculate order summary
  const getOrderSummary = () => {
    const subtotal = getCartTotal();
    const shipping = cartItems.length > 0 ? 50 : 0; // $50 fixed shipping
    const vat = Math.round(subtotal * 0.2); // 20% VAT
    const total = subtotal + shipping;
    
    return {
      subtotal,
      shipping,
      vat,
      total
    };
  };

  console.log('[CartProvider] Providing value - cartItems:', cartItems);
  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    getCartTotal,
    getCartItemCount,
    getOrderSummary
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
