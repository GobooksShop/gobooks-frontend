import { useState } from 'react';

const CartProductCounter = ({ idx, productId, initialCount, onCountChange }) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(productId, newCount, idx);
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = (count - 1) === 0 ? 1 : count - 1;
      setCount(newCount);
      onCountChange(productId, newCount, idx);
    }
  };

  return (
    <div className="cart-product-counter">
      <button onClick={handleDecrement} className="hover:tw-cursor-pointer">-</button>
      <span>{count}</span>
      <button onClick={handleIncrement} className="hover:tw-cursor-pointer">+</button>
    </div>
  );
};

export default CartProductCounter;