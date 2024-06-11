import CustomButton from '../ui/CustomButton';
import { useEffect } from 'react';

const Payment = () => {
  

  const handlePayment = async () => {
    const { IMP } = window;
    IMP.init('imp76410462');
    IMP.request_pay(
      {
        pg: "tosspayments",
        name: "나이키 와플 트레이너 2 SD",
        pay_method: "card",
        escrow: false,
        amount: "100",
        tax_free: 10,
        buyer_name: "홍길동",
        buyer_email: "buyer@example.com",
        buyer_tel: "02-1670-5176",
        buyer_addr: "성수이로 20길 16",
        buyer_postcode: "04783",
        m_redirect_url: "https://helloworld.com/payments/result",
        //todo notice_url는 실제 서비스 할때는, 도메인 주소로 변경해야 합니다. 필수!.
        notice_url:"https://7def-221-155-164-15.ngrok-free.app/portone-webhook",
        confirm_url: "https://helloworld.com/api/v1/payments/confirm",
        currency: "KRW",
        locale: "ko",
        display: { card_quota: [0, 6] },
      },
      (response) => {
        // PC 환경에서 결제 프로세스 완료 후 실행 될 로직
      },
    );
  };

  return (
    <CustomButton color="success" size="large" onClick={handlePayment} text="결제하기" />
  );
}


export default Payment;