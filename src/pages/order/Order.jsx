import { PageContainer } from '../../components/PageContainer';
import CartItems from '../../components/cart/CartItems';
import CartInfo from '../../components/cart/CartInfo';
import DeleveryInfo from '../../components/order/DeleveryInfo';
import { useEffect } from 'react';
import useCartOrderStore from '../../store/useCartOrderStore';
import { saveOrder } from '../../api/order/order';
import useUserStore from '../../store/useUserStore';

function Order() {

  const { cartItems, setMerchantUid, merchantUid } = useCartOrderStore(state => state);
  const {userId} = useUserStore(state => state.user);
  useEffect(() => {
    if(merchantUid === '') {
      const requestOrderItems = {
        userId:  userId,
        merchantUid: '',
        orderItemRequests: [],
      };
      cartItems.forEach(item => {
        requestOrderItems.orderItemRequests.push({
          productId: item.productId,
          orderCount: item.quantity,
          price: item.price,
        });
      });
      saveOrder(requestOrderItems).then(data => {
        console.log(data);
        setMerchantUid(data.merchantUid);
      });
    }
  }, []);
  return (
    <PageContainer>
      {/*todo 메뉴 관련 컴포넌트를 나눠야 합니다.*/}
      <div>
        <ul className="tw-flex tw-gap-10">
          <li>장바구니</li>
          <li>주문</li>
          <li>완료</li>
        </ul>
      </div>
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">주문/결제</h1>
      </header>
      <div
        className="tw-relative tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-x-5 tw-max-w-[1440px] tw-min-h-[4000px]">
        <div className="main content tw-col-span-9">
          <CartItems isOrders={true} />
          <DeleveryInfo />
        </div>
        <CartInfo isOrders={true} />
      </div>
    </PageContainer>
  );
}

export default Order;
