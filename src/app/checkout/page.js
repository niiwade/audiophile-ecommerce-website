'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../../components/CartProvider';
import OrderConfirmationModal from '../../components/OrderConfirmationModal';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    paymentMethod: 'e-money',
    eMoneyNumber: '',
    eMoneyPin: ''
  });

  const [errors, setErrors] = useState({});

  const cartTotal = getCartTotal();
  const shipping = cartItems.length > 0 ? 50 : 0;
  const vat = Math.round(cartTotal * 0.2);
  const grandTotal = cartTotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['name', 'email', 'phone', 'address', 'zipCode', 'city', 'country'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Wrong format';
    }
    if (formData.phone && !/^\+?\d{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Must be a valid phone number';
    }
    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Must be a valid ZIP code';
    }
    if (formData.paymentMethod === 'e-money') {
      if (!formData.eMoneyNumber || !/^\d{9}$/.test(formData.eMoneyNumber)) {
        newErrors.eMoneyNumber = 'Must be 9 digits';
      }
      if (!formData.eMoneyPin || !/^\d{4}$/.test(formData.eMoneyPin)) {
        newErrors.eMoneyPin = 'Must be 4 digits';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to the first error field if needed
      const firstErrorKey = Object.keys(errors).find(key => errors[key]);
      if (firstErrorKey) {
        const errorElement = document.getElementById(firstErrorKey);
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    if (cartItems.length === 0) {
      router.push('/');
      return;
    }
    setOrderSummary({
      items: cartItems,
      total: cartTotal,
      shipping,
      vat,
      grandTotal
    });
    setShowConfirmation(true);
  };

  const handleCompleteOrder = () => {
    clearCart();
    setShowConfirmation(false);
    router.push('/');
  };

  const renderError = (field) => {
    return errors[field] && <span className="text-red-500 text-xs absolute right-0 top-0 pt-1 pr-1">{errors[field]}</span>;
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-orange-500 transition-colors mb-8">
            Go Back
          </button>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-lg shadow-md">
              <h1 className="text-2xl md:text-3xl font-bold mb-8 uppercase">Checkout</h1>
              
              {/* Billing Details */}
              <section className="mb-10">
                <h2 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">Billing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div className="relative">
                    <label className={`block text-xs font-bold mb-1 ${errors.name ? 'text-red-500' : ''}`} htmlFor="name">Name</label>
                    {renderError('name')}
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="Alexei Ward" />
                  </div>
                  <div className="relative">
                    <label className={`block text-xs font-bold mb-1 ${errors.email ? 'text-red-500' : ''}`} htmlFor="email">Email Address</label>
                    {renderError('email')}
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="alexei@mail.com" />
                  </div>
                  <div className="relative">
                    <label className={`block text-xs font-bold mb-1 ${errors.phone ? 'text-red-500' : ''}`} htmlFor="phone">Phone Number</label>
                    {renderError('phone')}
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="+1 202-555-0136" />
                  </div>
                </div>
              </section>

              {/* Shipping Info */}
              <section className="mb-10">
                <h2 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">Shipping Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <div className="md:col-span-2 relative">
                    <label className={`block text-xs font-bold mb-1 ${errors.address ? 'text-red-500' : ''}`} htmlFor="address">Your Address</label>
                    {renderError('address')}
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} className={`w-full p-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="1137 Williams Avenue" />
                  </div>
                  <div className="relative">
                    <label className={`block text-xs font-bold mb-1 ${errors.zipCode ? 'text-red-500' : ''}`} htmlFor="zipCode">ZIP Code</label>
                    {renderError('zipCode')}
                    <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className={`w-full p-3 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="10001" />
                  </div>
                  <div className="relative">
                    <label className={`block text-xs font-bold mb-1 ${errors.city ? 'text-red-500' : ''}`} htmlFor="city">City</label>
                    {renderError('city')}
                    <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} className={`w-full p-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="New York" />
                  </div>
                  <div className="relative">
                    <label className={`block text-xs font-bold mb-1 ${errors.country ? 'text-red-500' : ''}`} htmlFor="country">Country</label>
                    {renderError('country')}
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} className={`w-full p-3 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="United States" />
                  </div>
                </div>
              </section>

              {/* Payment Details */}
              <section>
                <h2 className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-4">Payment Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <label className="block text-xs font-bold mb-1 md:col-span-1">Payment Method</label>
                  <div className="md:col-span-1 space-y-4">
                    <label className={`flex items-center p-3 border ${formData.paymentMethod === 'e-money' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'} rounded cursor-pointer hover:border-orange-500`}>
                      <input type="radio" name="paymentMethod" value="e-money" checked={formData.paymentMethod === 'e-money'} onChange={handleInputChange} className="mr-3 h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300" />
                      <span className="font-bold text-sm">e-Money</span>
                    </label>
                    <label className={`flex items-center p-3 border ${formData.paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'} rounded cursor-pointer hover:border-orange-500`}>
                      <input type="radio" name="paymentMethod" value="cash" checked={formData.paymentMethod === 'cash'} onChange={handleInputChange} className="mr-3 h-5 w-5 text-orange-500 focus:ring-orange-500 border-gray-300" />
                      <span className="font-bold text-sm">Cash on Delivery</span>
                    </label>
                  </div>
                </div>
                {formData.paymentMethod === 'e-money' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 mt-6">
                    <div className="relative">
                      <label className={`block text-xs font-bold mb-1 ${errors.eMoneyNumber ? 'text-red-500' : ''}`} htmlFor="eMoneyNumber">e-Money Number</label>
                      {renderError('eMoneyNumber')}
                      <input type="text" id="eMoneyNumber" name="eMoneyNumber" value={formData.eMoneyNumber} onChange={handleInputChange} className={`w-full p-3 border ${errors.eMoneyNumber ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="238521993" />
                    </div>
                    <div className="relative">
                      <label className={`block text-xs font-bold mb-1 ${errors.eMoneyPin ? 'text-red-500' : ''}`} htmlFor="eMoneyPin">e-Money PIN</label>
                      {renderError('eMoneyPin')}
                      <input type="password" id="eMoneyPin" name="eMoneyPin" value={formData.eMoneyPin} onChange={handleInputChange} className={`w-full p-3 border ${errors.eMoneyPin ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500`} placeholder="6891" />
                    </div>
                  </div>
                )}
                {formData.paymentMethod === 'cash' && (
                  <div className="flex items-center mt-8 text-gray-500">
                    <svg className="w-12 h-12 text-orange-500 mr-6 flex-shrink-0" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46.5879 23.8438C46.5879 36.5156 36.3711 46.7305 23.6992 46.7305C11.0273 46.7305 0.8125 36.5156 0.8125 23.8438C0.8125 11.1719 11.0273 0.957031 23.6992 0.957031C36.3711 0.957031 46.5879 11.1719 46.5879 23.8438Z" fill="#D87D4A"/><path d="M23.7012 10.0625C20.9062 10.0625 18.6406 10.9219 16.9062 12.6562C15.1719 14.3906 14.3047 16.6562 14.3047 19.4531V28.2344C14.3047 31.0312 15.1719 33.2969 16.9062 35.0312C18.6406 36.7656 20.9062 37.6328 23.7012 37.6328C26.4961 37.6328 28.7617 36.7656 30.4961 35.0312C32.2305 33.2969 33.0977 31.0312 33.0977 28.2344V19.4531C33.0977 16.6562 32.2305 14.3906 30.4961 12.6562C28.7617 10.9219 26.4961 10.0625 23.7012 10.0625ZM29.3281 28.2344C29.3281 29.9688 28.7812 31.3672 27.6875 32.4297C26.5938 33.4922 25.2656 34.0234 23.7012 34.0234C22.1367 34.0234 20.8086 33.4922 19.7148 32.4297C18.6211 31.3672 18.0742 29.9688 18.0742 28.2344V19.4531C18.0742 17.7188 18.6211 16.3203 19.7148 15.2578C20.8086 14.1953 22.1367 13.6641 23.7012 13.6641C25.2656 13.6641 26.5938 14.1953 27.6875 15.2578C28.7812 16.3203 29.3281 17.7188 29.3281 19.4531V28.2344Z" fill="white"/><path d="M23.7012 16.0781C22.7266 16.0781 21.9141 16.4219 21.2617 17.1094C20.6094 17.7969 20.2812 18.6094 20.2812 19.5469V28.125C20.2812 29.0625 20.6094 29.875 21.2617 30.5625C21.9141 31.25 22.7266 31.5938 23.7012 31.5938C24.6758 31.5938 25.4883 31.25 26.1406 30.5625C26.793 29.875 27.1211 29.0625 27.1211 28.125V19.5469C27.1211 18.6094 26.793 17.7969 26.1406 17.1094C25.4883 16.4219 24.6758 16.0781 23.7012 16.0781Z" fill="white"/></svg>
                    <p className="text-sm">
                      The &apos;Cash on Delivery&apos; option enables you to pay in cash when our delivery courier arrives at your residence. 
                      Just make sure your address is correct so that your order will not be cancelled.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-md h-fit">
              <h2 className="text-lg font-bold mb-6 uppercase">Summary</h2>
              {cartItems.length === 0 ? (
                <p className="text-gray-500 mb-6">Your cart is empty.</p>
              ) : (
                <>
                  <ul className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <li key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-gray-100 rounded-md h-16 w-16 flex items-center justify-center mr-4 relative overflow-hidden">
                            {item.image ? (
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-contain p-1" 
                                sizes="64px"
                              />
                            ) : (
                              <div className="text-xs text-gray-400">{item.name.split(' ')[0]}</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-sm">{item.name.split(' ').slice(0,2).join(' ')}</p>
                            <p className="text-gray-500 text-sm">${item.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <p className="text-gray-500 font-bold text-sm">x{item.quantity}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between">
                      <p className="text-gray-500 uppercase">TOTAL</p>
                      <p className="font-bold text-lg">${cartTotal.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500 uppercase">SHIPPING</p>
                      <p className="font-bold text-lg">${shipping.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500 uppercase">VAT (INCLUDED)</p>
                      <p className="font-bold text-lg">${vat.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6 mb-8">
                    <p className="text-gray-500 uppercase">GRAND TOTAL</p>
                    <p className="text-orange-500 font-bold text-lg">${grandTotal.toLocaleString()}</p>
                  </div>
                </>
              )}
              <button
                type="submit"
                disabled={cartItems.length === 0}
                className={`w-full py-3 text-white text-sm font-bold uppercase tracking-wider ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'} transition-colors rounded`}
              >
                CONTINUE & PAY
              </button>
            </div>
          </form>
        </div>
      </div>

      {showConfirmation && orderSummary && (
        <OrderConfirmationModal 
          orderSummary={orderSummary} 
          onClose={handleCompleteOrder} 
        />
      )}
    </>
  );
}
