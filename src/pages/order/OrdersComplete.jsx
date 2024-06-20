import { PageContainer } from '../../components/PageContainer';
import OrderStatus from '../../components/order/OrderStatus';
import CartItems from '../../components/cart/CartItems';
import OrderCompleteInfo from '../../components/order/OrderCompleteInfo';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useCartOrderStore from '../../store/useCartOrderStore';
import { complete_payment, getPaymentCompleteData } from '../../api/payment/payment';

const OrdersComplete = () => {
  const location = useLocation();
  const {resetMerchantUid, merchantUid} =useCartOrderStore(state => state);

  const fetchPageData =  async (merchantUid) => {
    return await getPaymentCompleteData(merchantUid);
  }

  const initValidatePayment = async (payData) => {
     return await complete_payment(payData);
  }

  useEffect(() => {
    const payData = location.state.payData;
    console.log(payData);
    if(payData){
      initValidatePayment(payData)
        .then((response) => {
          if(response.status === 200){
            fetchPageData(merchantUid);
          }
        })
        .catch()
    }
  },[]);

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

export default OrdersComplete;