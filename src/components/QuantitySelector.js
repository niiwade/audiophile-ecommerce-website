'use client';

export default function QuantitySelector({ quantity, onChange, min = 1, max = 99 }) {
  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-md">
      <button 
        onClick={handleDecrease}
        className="px-4 py-2 text-gray-500 hover:text-orange-500 transition-colors"
        aria-label="Decrease quantity"
        disabled={quantity <= min}
      >
        -
      </button>
      <span className="px-4 font-medium">{quantity}</span>
      <button 
        onClick={handleIncrease}
        className="px-4 py-2 text-gray-500 hover:text-orange-500 transition-colors"
        aria-label="Increase quantity"
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}
