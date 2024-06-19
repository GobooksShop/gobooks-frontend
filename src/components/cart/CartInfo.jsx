import CustomButton from '../ui/CustomButton';
import { useEffect, useState } from 'react';
import Payment from '../payment/Payment';
import useCartOrderStore from '../../store/useCartOrderStore';
import { useNavigate } from 'react-router-dom';
import { varifyCartDatas } from '../../api/cart/cart';

const CartInfo = (props) => {
  const [isFixed, setIsFixed] = useState(false);
  const {
    totalAmount,
    resetMerchantUid,
    discountAmount,
    updateTotalAmount,
    cartItems,
  } = useCartOrderStore((state) => state);


  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const targetPosition = 200;

      if (scrollTop > targetPosition) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOrderClick = () => {
    const selectedCartItems = cartItems
      .filter((item) => item.isSelected)
      .map(({ productId, quantity, price }) => ({ productId, quantity, price }));

    if (selectedCartItems.length === 0) {
      alert('최소 1개 이상의 상품의 체크 박스를 선택해주세요.');
      return;
    }
    const urlParams = new URLSearchParams();
    urlParams.append(`selectedCartItems`, JSON.stringify(selectedCartItems));


    const response = varifyCartDatas(urlParams);
    response.then((response) => {
      if (response.status === 200) {
        //이미 발급된 merchantId()를 제거한다.
        resetMerchantUid();
        navigate('/order');
      } else {
        alert('데이터 검증이 실패했습니다. 조작된 데이터로 판명됐습니다.');
      }
    });

  };

  return (
    <div className="tw-col-span-3 tw-relative">
      <div className={isFixed ? 'tw-fixed tw-top-24 tw-right-auto ' : 'tw-absolute tw-top-0 tw-right-0 tw-w-full'}>
        <div className="cartInfo tw-relative tw-min-h-96 tw-w-96">
          <div
            className="tw-relative tw-mx-2 tw-p-5 tw-border tw-border-solid tw-rounded-[25px] tw-border-gray-500/70">
            <div
              className="tw-flex tw-justify-between  tw-min-h-[100px] tw-w-full tw-border-solid tw-border-0 tw-border-b tw-border-gray-500/70">
              <div className="tw-flex tw-flex-col tw-gap-3">
                <div>주문금액</div>
                <div>배송비</div>
                <div>할인 금액</div>
              </div>
              <div className="tw-flex tw-flex-col tw-items-end tw-gap-3">
                <div>{totalAmount + discountAmount}원</div>
                <div>0원</div>
                <div>{-discountAmount}원</div>
              </div>
            </div>
            <div className="cartBottom tw-flex tw-justify-between tw-pt-3 tw-font-bold tw-text-lg">
              <div>총주문 금액</div>
              <div>{totalAmount}원</div>
            </div>
            <div className="tw-flex tw-justify-center tw-mt-5">
              {props.isOrders ? <Payment /> :
                <CustomButton color="success" size="large" text="주문하기" onClick={handleOrderClick}></CustomButton>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartInfo;
