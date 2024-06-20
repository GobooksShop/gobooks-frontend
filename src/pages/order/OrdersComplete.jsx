import { PageContainer } from '../../components/PageContainer';
import OrderStatus from '../../components/order/OrderStatus';

import OrderCompleteInfo from '../../components/order/OrderCompleteInfo';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCartOrderStore from '../../store/useCartOrderStore';
import { complete_payment, getPaymentCompleteData } from '../../api/payment/payment';

const OrdersComplete = () => {
  const location = useLocation();
  const currentStep = 2;
  const navigate = useNavigate();
  const {resetMerchantUid, merchantUid} =useCartOrderStore(state => state);
  const {orderCompleteData, setOrderCompleteData} = useState({});
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
            fetchPageData(merchantUid)
              .then((response) => {
                console.log("=======================new 성공 =======================================");
                setOrderCompleteData(response.data);
                console.log(response.data);
              })
              .catch(() => {
              })
          }
        })
        .catch(() => {
          alert("조작된 데이터가 감지 됐습니다. 주문 금액과 결제 금액이 다릅니다.")
          navigate('/order')
        })
    }
  },[]);

  return (
    <PageContainer>
      <OrderStatus currentStep={currentStep}/>
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">{}</h1>
      </header>
      <div
        className="tw-relative tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-x-5 tw-max-w-[1240px]">
        <div className="main content tw-col-span-12">
          <div className="detailslayout tw-min-h-[200px]">
            <header className="tw-flex tw-justify-between tw-items-center tw-px-2 tw-bg-gray-400/35 md:tw-min-h-14">
            </header>
            <div className="tw-grid-table-wrap tw-px-2 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
              <ul className="tw-px-2">
                {/*{cartItems.map((item, index) => (*/}
                {/*  <li key={item.productId + index}*/}
                {/*      className="tw-flex md:tw-items-center md:tw-gap-10 md:tw-h-36 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">*/}
                {/*    <div className="tw-h-full tw-overflow-hidden">*/}
                {/*      <img*/}
                {/*        src={item.img_url}*/}
                {/*        className="tw-max-w-32 tw-max-h-28 tw-w-full tw-h-auto"*/}
                {/*      />*/}
                {/*    </div>*/}
                {/*    <div className="md:tw-w-96 tw-text-lg tw-font-normal">*/}
                {/*      <p>{item.product_name}</p>*/}
                {/*      <p><span className="tw-text-blue-500">10% </span><span*/}
                {/*        className="tw-line-through">{item.price}원</span> {item.price * 0.9}원</p>*/}
                {/*    </div>*/}
                {/*    <div className="md:tw-w-52">*/}
                {/*      <div className="tw-w-20 tw-flex tw-flex-col tw-items-center">*/}
                {/*        <span>{item.amount * 0.9}원</span>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*    <div className="md:tw-grow md:tw-basis-0">*/}
                {/*      <span><strong>3일 이내 배송</strong></span>*/}
                {/*    </div>*/}
                {/*  </li>*/}
                {/*))}*/}
              </ul>
            </div>
          </div>
          <OrderCompleteInfo />
        </div>
      </div>
    </PageContainer>
  );
};

export default OrdersComplete;