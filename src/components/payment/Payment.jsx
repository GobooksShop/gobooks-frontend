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

  const validateCustomer = async () => {
    const { name, zipcode, address, realAddress, phoneNumber, landlinePhoneNumber } = deliveryInfo;

    if (!name) {
      alert('이름을 입력해주세요.');
      return false;
    }
    if (!zipcode) {
      alert('우편 번호를 입력해주세요.');
      return false;
    }
    if (!address) {
      alert('주소를 입력해주세요.');
      return false;
    }
    if (!realAddress) {
      alert('실제 주소를 입력해주세요.');
      return false;
    }
    if (!phoneNumber && !landlinePhoneNumber) {
      alert('휴대폰 또는 일반전화 번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  const saveDeliveryInfo = async () => {
    const isCustomerValid = await validateCustomer(); // validateCustomer()의 결과를 변수에 저장
    if (!isCustomerValid) {
      return false; // false를 반환하여 이후 코드를 실행하지 않도록 함
    }
    else{
    const requestData = {
      merchantUid: merchantUid,
      userId: userId,
      orderAddressUpdate: {
        label: 'home1234',
        zipcode: deliveryInfo.zipcode,
        address1: deliveryInfo.address,
        address2: deliveryInfo.realAddress,
        recipientName: deliveryInfo.name,
        recipientPhone: deliveryInfo.phoneNumber.length > 0 ? deliveryInfo.phoneNumber : deliveryInfo.landlinePhoneNumber,
      },
    };

    try{
      const response = await saveDelivery(requestData);
      return response;
    }catch(error){
      return false;
    }
    }
  };

  const handlePayment = async () => {
    const isDeliverySaved = await saveDeliveryInfo();
    if (!isDeliverySaved) return;
    saveDeliveryInfo()
      .then(data => {
        console.log('성공 데이터 패칭');
        const { IMP } = window;
        IMP.init('imp76410462');
        IMP.request_pay(
          {
            pg: 'html5_inicis.INIpayTest',
            pay_method: 'card',
            merchant_uid: merchantUid,
            name: '주문명:결제테스트',
            amount: 1200,
            buyer_email: email,
            buyer_name: deliveryInfo.name,
            buyer_tel: deliveryInfo.phoneNumber.length > 0 ? deliveryInfo.phoneNumber : deliveryInfo.landlinePhoneNumber,
            buyer_addr: `${deliveryInfo.address} ${deliveryInfo.realAddress}`,
            buyer_postcode: deliveryInfo.zonecode,
            m_redirect_url: 'http://localhost:3000/orderDetails',
          },
          (response) => {
            if (response.success) {
              console.log(response);
              const requestPaymentData = {
                impUid: response.imp_uid,
                merchantUid: merchantUid
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