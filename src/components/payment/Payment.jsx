import CustomButton from '../ui/CustomButton';

import { complete_payment, preparePayment } from '../../api/payment/payment';
import { useContext, useEffect, useState } from 'react';
import useUserStore from '../../store/useUserStore';
import useCartOrderStore from '../../store/useCartOrderStore';
import { DeliveryContext } from '../../App';

const Payment = () => {

  const {merchantUid, totalAmount, discountAmount, setMerchantUid, resetMerchantUid} = useCartOrderStore(state => state);
  const {userId, name, email, role } = useUserStore(state => state.user)
  const {deliveryInfo} = useContext(DeliveryContext);

  useEffect(() => {
    if(merchantUid === "" || merchantUid == null){
      return;
    }
    const fetchData = async () => {
      const prepareData = {
        "merchantUid": merchantUid,
        "amount": totalAmount
      }
      await preparePayment(prepareData);
    }
    fetchData()
      .then(data => {
        setMerchantUid(data.merchantUid);
      })
      .catch(error => {console.warn('이미 존재하는 주문번호입니다.')
      });
  }, []);

  const validatePayment = () => {

  }

  const validateCustomer = () => {
    //todo 결제까지 끝낸 이후에 추가하겠습니다.
    console.log(JSON.stringify(deliveryInfo, null, 2));
    console.log(deliveryInfo.name);
    return true;
  }

  const paymentService = async () => {

  }

  const handlePayment = async () => {
    //작업 이전에 배송지 정보가 등록 됩니다.
    if(!validateCustomer()){
      alert("배송지 정보를 다시 입력해주세요.");
      return ;
    }

    const { IMP } = window;
    IMP.init('imp76410462')
    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: merchantUid,
        name: "주문명:결제테스트",
        amount: totalAmount,
        buyer_email: email,
        buyer_name: deliveryInfo.name,
        buyer_tel: deliveryInfo.phoneNumber.length > 0 ? deliveryInfo.phoneNumber : deliveryInfo.landlinePhoneNumber,
        buyer_addr: `${deliveryInfo.address} ${deliveryInfo.realAddress}`,
        buyer_postcode: deliveryInfo.zonecode,
        m_redirect_url: "http://localhost:3000/orderDetails"
      },
      (response) => {
        // callback 로직
        //* ...중략... *//
        if(response.success){
          console.log(response);
          const requestPaymentData = {
            impUid: response.imp_uid,
            merchantUid: merchantUid,
            orderAddressUpdate: {
              zipcode: deliveryInfo.zonecode,
              address1: deliveryInfo.address,
              address2: deliveryInfo.realAddress,
              recipientName: deliveryInfo.name,
              recipientPhone: deliveryInfo.phoneNumber,
            }
          }



          const data = complete_payment(requestPaymentData);
          console.log(data);
        }else{
          console.log(response);
        }
      },
    );
  };

  return (
    <CustomButton color="success" size="large" onClick={handlePayment} text="결제하기" />
  );
}


export default Payment;