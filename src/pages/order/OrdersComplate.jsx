import { PageContainer } from '../../components/PageContainer';
import OrderStatus from '../../components/order/OrderStatus';
import CartItems from '../../components/cart/CartItems';
import OrderCompleteInfo from '../../components/order/OrderCompleteInfo';

const OrdersComplate = () => {

  return (
    <PageContainer>
      <OrderStatus />
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">주문번호가 보여야합니다.</h1>
      </header>
      <div
        className="tw-relative tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-x-5 tw-max-w-[1240px]">
        <div className="main content tw-col-span-12">
          <CartItems isOrders={true} />
          <OrderCompleteInfo />
        </div>
      </div>
    </PageContainer>
  );
};

export { OrdersComplate };