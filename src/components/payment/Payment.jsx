import CustomButton from '../ui/CustomButton';

import { complete_payment, preparePayment } from '../../api/payment/payment';
import { useEffect, useState } from 'react';

const Payment = () => {

  const [merchantId, setMerchantId] = useState('');
  console.log("payment")
  useEffect(() => {
    //todo 구현 브라우저에서 사용할때 변경해야함.
    const id = crypto.randomUUID();
    const date = new Date();
    const toDate = date.getFullYear() + (date.getMonth() + 1) + date.getDate();
    setMerchantId(`gbs${toDate}_${id}`);
  }, []);


  useEffect(() => {
    if (!merchantId) return;

    const fetchData = async () => {
      //사전 검증 로직의 merchantUid는 어느 시점에서 만드는게 맞는거지?
      //주문하기 버튼 누르는 순간 저장 되는게 맞는건가?
      //store로 전역 관리를 해야 하나?
      const prepareData = {
        "merchantUid" : merchantId,
        "amount" : 1000
      }
      await preparePayment(prepareData);
    };

    fetchData();
  }, [merchantId]);

  const validatePayment = () => {

  }

  const handlePayment = async () => {
    const { IMP } = window;
    IMP.init('imp76410462')
    IMP.request_pay(
      {
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: merchantId,
        name: "주문명:결제테스트",
        amount: 1004,
        buyer_email: "test@portone.io",
        buyer_name: "구매자이름",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "http://localhost:3000/orderDetails"
      },
      (response) => {
        // callback 로직
        //* ...중략... *//
        if(response.success){
          console.log(response);
          const requestData = {
            "imp_uid" : response.imp_uid
          }
          const data = complete_payment(requestData);
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