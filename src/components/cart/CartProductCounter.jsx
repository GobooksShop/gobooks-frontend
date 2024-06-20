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
    <div className="cart-product-counter tw-flex tw-justify-center tw-px-2 tw-py-1 tw-gap-1 tw-border-solid tw-border tw-border-gray-500/70 tw-rounded tw-w-15">
      <button onClick={handleDecrement} className="tw-border-none tw-bg-white hover:tw-cursor-pointer ">-</button>
      <span>{count}</span>
      <button onClick={handleIncrement} className="tw-border-none tw-bg-white hover:tw-cursor-pointer">+</button>
    </div>
  );
};

export default CartProductCounter;