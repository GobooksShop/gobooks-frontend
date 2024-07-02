import CustomButton from '../ui/CustomButton';

import { preparePayment } from '../../api/payment/payment';
import { useContext, useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import useCartOrderStore from '../../store/useCartOrderStore';
import { DeliveryContext } from '../../App';
import { saveDelivery } from '../../api/delivery/delivery';
import {useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";

const Payment = ({productName}) => {

  const {
    merchantUid,
    totalAmount,
    paidProductName,
    setMerchantUid
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
    const isCustomerValid = await validateCustomer();
    if (!isCustomerValid) {
      return false;
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
            name: paidProductName,
            amount: totalAmount,
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
              navigate("/order/complete", {state: {payData: requestPaymentData }});
            } else {
              console.log("");
            }
          },
        );
      })
      .catch(error => {

      });


  };

  return (
      <Button variant="contained" color="secondary" size="large" onClick={handlePayment}>
        결제하기
      </Button>
  );
};


export default Payment;