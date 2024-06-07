import { useEffect, useState } from 'react';
import CartProductCounter from './CartProductCounter';
import { getCartData } from '../../api/cart/cart';
import useCartOrderStore from '../../store/useCartOrderStore';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const store = useCartOrderStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = getCartData();
      store.resetCart();
      setCartItems(data);
      data.forEach(item => {
        store.addCart(item.product_id, item.quantity, item.price);
      });
      store.updateTotalAmount();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const allSelected = cartItems.every(item => item.isSelected);
    setSelectAll(allSelected);

  }, [cartItems]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedItems = cartItems.map(item => ({ ...item, isSelected: newSelectAll }));
    setCartItems(updatedItems);
    store.updateCartItems(updatedItems.map(({ product_id, quantity, price, isSelected }) => ({ productId: product_id, quantity, price, isSelected })));
    store.updateTotalAmount();
  };

  const handleSelectItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].isSelected = !newCartItems[index].isSelected;
    setCartItems(newCartItems);
    store.updateCartItems(newCartItems.map(({ product_id, quantity, price, isSelected }) => ({ productId: product_id, quantity, price, isSelected })));
    store.updateTotalAmount();
  };

  const handleCountChange = (productId, newCount, index) => {
    const updatedItems = [...cartItems];
    console.dir(updatedItems);
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: newCount,
      amount: newCount * updatedItems[index].price
    };
    setCartItems(updatedItems);
    // 선택된 제품들의 총 금액을 계산하여 totalAmount 상태를 갱신
    store.updateTotalAmount();
  };

  return (
    <div className="detailslayout tw-min-h-[200px]">
      <header className="tw-flex tw-justify-between tw-items-center tw-px-2 tw-bg-gray-400/35 md:tw-min-h-14">
        <div className="tw-flex tw-ml-2">
          <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
          <span>전체 선택</span>
        </div>
        <div>휴지통</div>
      </header>
      <div className="grid-table-wrap tw-px-2 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
        <ul className="tw-px-2">
          {cartItems.map((item, index) => (
            <li key={item.product_id + index} className="tw-flex md:tw-items-center md:tw-gap-10 md:tw-h-36 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
              <input
                type="checkbox"
                checked={cartItems[index]?.isSelected || false}
                onChange={() => handleSelectItem(index)}
              />
              <div className="tw-h-full tw-overflow-hidden">
                <img
                  src={item.img_url}
                  className="tw-max-w-32 tw-max-h-28 tw-w-full tw-h-auto"
                />
              </div>
              <div className="md:tw-w-96">
                <p>{item.product_name}</p>
                <p>10% 40,000원 36,000원</p>
              </div>
              <div className="md:tw-w-52">
                <span>{item.amount}원</span>
                <CartProductCounter
                  idx={index}
                  productId={item.productId}
                  initialCount={item.quantity}
                  price={parseInt(item.price)}
                  onCountChange={handleCountChange}
                />
              </div>
              <div className="md:tw-grow md:tw-basis-0">
                <span><strong>3일 이내 배송</strong></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartItems;
