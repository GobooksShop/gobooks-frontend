import { PageContainer } from '../../components/PageContainer';
import CartItems from '../../components/cart/CartItems';
import { useEffect, useState } from 'react';
import {getCartData} from '../../api/cart/cart';
import CartInfo from '../../components/cart/CartInfo';
import DeleveryInfo from '../../components/order/DeleveryInfo';
import PaymentInfo from '../../components/payment/PaymentInfo';
const Order = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const data = getCartData();
    setCartItems(data);
    console.log(cartItems);
  }, []);

  useEffect(() => {
    console.log("cartItems이 변경되었습니다:", cartItems);
  }, [cartItems]);

  return (
    <PageContainer>
      <div>
        <ul className="tw-flex tw-gap-10">
          <li>장바구니</li>
          <li>주문</li>
          <li>완료</li>
        </ul>
      </div>
      {/*todo 컴포넌트 나누기 */}
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">주문/결제</h1>
      </header>
      <div
        className="tw-relative tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-x-5 tw-max-w-[1440px] tw-min-h-[800px]">
        <div className="main content tw-col-span-9">
          <CartItems cartList={cartItems} />
          <DeleveryInfo />
          <PaymentInfo />
        </div>
        <CartInfo isOrders={true}/>
      </div>
    </PageContainer>
  );
}

export default Order;
