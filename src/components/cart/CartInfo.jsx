import CustomButton from '../ui/CustomButton';
import { useEffect, useState } from 'react';
import Payment from '../payment/Payment';
import useCartOrderStore from '../../store/useCartOrderStore';
import { useNavigate } from 'react-router-dom';
import { varifyCartDatas } from '../../api/cart/cart';
import {
  Box, Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography
} from "@mui/material";

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
      <Card
          sx={{
            position: 'fixed',
            top: 180,
            right: 0,
            width: '270px',
            mx: 2,
            mt: 3,
            borderRadius: '12px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
          }}
      >
        <CardContent>
          <Stack spacing={2}>
            <div className="tw-min-h-[40px]">
              <Stack direction="row" justifyContent="space-between" className="tw-py-1">
                <Typography variant="body1">주문 금액</Typography>
                <Typography variant="body1">{(totalAmount + discountAmount).toLocaleString()}원</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" className="tw-py-1">
                <Typography variant="body1">배송비</Typography>
                <Typography variant="body1">0원</Typography>
              </Stack>
              <Stack direction="row" justifyContent="space-between" className="tw-py-1">
                <Typography variant="body1">할인 금액</Typography>
                <Typography variant="body1">{(-discountAmount).toLocaleString()}원</Typography>
              </Stack>
            </div>
            <Divider />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6" >총 주문 금액 : </Typography>
              <Typography variant="h5" fontWeight="bold">{totalAmount.toLocaleString()}원</Typography>
            </Stack>
            {props.isOrders ? <Payment /> :
                <Button variant="contained" color="secondary" onClick={handleOrderClick}>
                  주문하기
                </Button>
            }
          </Stack>
        </CardContent>
      </Card>
  );
};

export default CartInfo;
