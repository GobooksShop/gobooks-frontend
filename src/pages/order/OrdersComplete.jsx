import { PageContainer } from '../../components/PageContainer';
import OrderStatus from '../../components/order/OrderStatus';

import OrderCompleteInfo from '../../components/order/OrderCompleteInfo';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCartOrderStore from '../../store/useCartOrderStore';
import { complete_payment, getPaymentCompleteData } from '../../api/payment/payment';
import { CircularProgress } from '@mui/material';

const OrdersComplete = () => {
  const location = useLocation();
  const currentStep = 2;
  const navigate = useNavigate();
  const {resetMerchantUid, merchantUid, resetCart, resetOrderItems} =useCartOrderStore(state => state);
  const [orderCompleteData, setOrderCompleteData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const payData = location.state.payData;

  const fetchPageData =  async (merchantUid) => {
    const data = (await getPaymentCompleteData(merchantUid)).data;
    console.log(data);
    setOrderCompleteData(data);
    return data;

  }

  const initValidatePayment = async (payData) => {
     return await complete_payment(payData);
  }

  useEffect(() => {
    console.log(payData);
    if(payData){
      initValidatePayment(payData)
        .then((response) => {
          console.log(response.status);
          if(response.status === 200){
            fetchPageData(merchantUid)
              .then((data) => {
                console.log("=======================new 성공 =======================================");
                console.log(data);
                console.log(orderCompleteData);
                resetMerchantUid();
                resetCart();
                resetOrderItems();
                setIsLoading(true);
              })
              .catch(() => {
              })
          }
        })
        .catch(() => {
          alert("조작된 데이터가 감지 됐습니다. 주문 금액과 결제 금액이 다릅니다.")
          navigate('/order')
        })
    }else{
      alert("접근할 수 없습니다.")
      navigate('/cart');
    }
  },[]);

  return (
    <PageContainer>
      <OrderStatus currentStep={currentStep}/>
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">주문번호: {orderCompleteData.merchantUid}</h1>
      </header>
      <div
        className="tw-relative tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-x-5 tw-max-w-[1240px]">
        <div className="main content tw-col-span-12">
          <div className="detailslayout tw-min-h-[200px]">
            <header className="tw-flex tw-justify-between tw-items-center tw-px-2 tw-bg-gray-400/35 md:tw-min-h-14">
            </header>
            <div className="tw-grid-table-wrap tw-px-2 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
              <ul className="tw-px-2">
                {isLoading ? orderCompleteData.orderItemResponses.map((item, index) => (
                  <li key={item.orderItemId + index}
                      className="tw-flex md:tw-items-center md:tw-gap-10 md:tw-h-36 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
                    <div className="tw-h-full tw-overflow-hidden">
                      <img
                        src={item.img_url}
                        className="tw-max-w-32 tw-max-h-28 tw-w-full tw-h-auto"
                      />
                    </div>
                    <div className="md:tw-w-96 tw-text-lg tw-font-normal">
                      <p>{item.productName}</p>
                    </div>
                    <div className="md:tw-w-52">
                      <div className="tw-w-20 tw-flex tw-flex-col tw-items-center">
                        <span>{item.orderCount}</span>
                      </div>
                    </div>
                    <div className="md:tw-w-52">
                      <div className="tw-w-20 tw-flex tw-flex-col tw-items-center">
                        <span>{item.orderPrice}원</span>
                      </div>
                    </div>
                    <div className="md:tw-grow md:tw-basis-0">
                      <span><strong>3일 이내 배송</strong></span>
                    </div>
                  </li>
                )) : <CircularProgress />}
              </ul>
            </div>
          </div>
          {isLoading ? <OrderCompleteInfo
              deliveryInfo={orderCompleteData.orderDeliveryResponse}
              merchentUid={orderCompleteData.merchantUid}
              paymentInfo={orderCompleteData.paymentResponse}
              orderDateTime= {orderCompleteData.orderDateTime}
           /> : <CircularProgress />}
        </div>
      </div>
    </PageContainer>
  );
};

export default OrdersComplete;