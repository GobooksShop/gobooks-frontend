import CustomButton from '../ui/CustomButton';

import { preparePayment } from '../../api/payment/payment';
import { useContext, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import useCartOrderStore from '../../store/useCartOrderStore';
import { DeliveryContext } from '../../App';
import { saveDelivery } from '../../api/delivery/delivery';
import {useNavigate} from 'react-router-dom';
import {complete_payment} from '../../api/payment/payment';

const Payment = () => {

  const {
    merchantUid,
    totalAmount,
    discountAmount,
    setMerchantUid,
    resetMerchantUid,
  } = useCartOrderStore(state => state);
  const { userId, name, email, role } = useUserStore(state => state.user);
  const { deliveryInfo } = useContext(DeliveryContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (merchantUid === '' || merchantUid == null) {
      return;
    }
    const fetchData = async () => {
      const prepareData = {
        'merchantUid': merchantUid,
        'amount': totalAmount,
      };
      await preparePayment(prepareData);
    };
    fetchData()
      .then(data => {
        setMerchantUid(data.merchantUid);
      })
      .catch(error => {
        console.warn('이미 존재하는 주문번호입니다.');
      });
  }, []);

  const validatePayment = () => {

  };

  const validateCustomer = () => {
    //todo 결제까지 끝낸 이후에 추가하겠습니다.
    console.log(JSON.stringify(deliveryInfo, null, 2));
    console.log(deliveryInfo.name);
    return true;
  };

  const paymentService = async () => {

  };

  const saveDeliveryInfo = async () => {

    if (!validateCustomer()) {
      alert('배송지 정보를 다시 입력해주세요.');
      return;
    }

    const requestData = {
      merchantUid: merchantUid,
      userId: userId,
      orderAddressUpdate: {
        label: '집',
        zipcode: '10915',
        address1: '경기 파주시 새꽃로 35 새꽃마을주공아파트',
        address2: '306동 304호',
        recipientName: '최민우',
        recipientPhone: '01098786076',
      },
    };

    return await saveDelivery(requestData);
  };

  const handlePayment = async () => {
    saveDeliveryInfo()
      .then(data => {
        console.log('성공 데이터 패칭');
        console.log(data);
        const { IMP } = window;
        IMP.init('imp76410462');
        IMP.request_pay(
          {
            pg: 'html5_inicis.INIpayTest',
            pay_method: 'card',
            merchant_uid: merchantUid,
            name: '주문명:결제테스트',
            amount: totalAmount,
            buyer_email: email,
            buyer_name: deliveryInfo.name,
            buyer_tel: deliveryInfo.phoneNumber.length > 0 ? deliveryInfo.phoneNumber : deliveryInfo.landlinePhoneNumber,
            buyer_addr: `${deliveryInfo.address} ${deliveryInfo.realAddress}`,
            buyer_postcode: deliveryInfo.zonecode,
            m_redirect_url: 'http://localhost:3000/orderDetails',
          },
          (response) => {
            // callback 로직
            //* ...중략... *//
            if (response.success) {
              console.log(response);
              const requestPaymentData = {
                impUid: response.imp_uid,
                merchantUid: merchantUid,
              };

              complete_payment(requestPaymentData)
                .then(data => {
                  console.log(data);
                  resetMerchantUid();
                  navigate("/order/complate");
                })
                .catch(error => {
                  console.log(error);
                  alert(error);
                });
            } else {
              console.log(response);
            }
          },
        );
      })
      .catch(error => {
        alert(error + "배송 정보를 확인할 수 없습니다.");
      });


  };

  return (
    <CustomButton color="success" size="large" onClick={handlePayment} text="결제하기" />
  );
};


export default Payment;