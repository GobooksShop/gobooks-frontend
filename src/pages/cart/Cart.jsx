import { PageContainer } from '../../components/PageContainer';
import CartItems from '../../components/cart/CartItems';
import CartInfo from '../../components/cart/CartInfo';
import OrderStatus from '../../components/order/OrderStatus';
function Cart() {

  return (
    <PageContainer>
      <OrderStatus />
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">장바구니</h1>
      </header>
      <div
        className="tw-relative tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-x-5 tw-max-w-[1440px]">
        <div className="main content tw-col-span-9">
          <CartItems isOrders={false}/>
        </div>
        <CartInfo isOrders={false}/>
      </div>
    </PageContainer>
  );
}

export default Cart;
