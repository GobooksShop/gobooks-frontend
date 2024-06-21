import { PageContainer } from '../../components/PageContainer';
import CartItems from '../../components/cart/CartItems';
import CartInfo from '../../components/cart/CartInfo';
import DeleveryInfo from '../../components/order/DeleveryInfo';
import { useEffect } from 'react';
import useCartOrderStore from '../../store/useCartOrderStore';
import { saveOrder } from '../../api/order/order';
import useUserStore from '../../store/useUserStore';
import OrderStatus from '../../components/order/OrderStatus';
import {Box} from "@mui/material";

function Order() {

  const { cartItems, setMerchantUid, merchantUid } = useCartOrderStore(state => state);
  const { userId } = useUserStore(state => state.user);
  const currentStep = 1;
  useEffect(() => {
    if (merchantUid === '') {
      const requestOrderItems = {
        userId: userId,
        merchantUid: '',
        orderItemRequests: [],
      };
      cartItems.forEach(item => {
        requestOrderItems.orderItemRequests.push({
          productId: item.productId,
          orderCount: item.quantity,
          price: item.price,
        });
      });
      console.log(JSON.stringify(requestOrderItems, null, 2));
      saveOrder(requestOrderItems).then(data => {
        console.log(data);
        setMerchantUid(data.merchantUid);
      });
    }
  }, []);
  return (
    <PageContainer>
      <OrderStatus currentStep={currentStep}/>
      <Box
          display="flex"
          mt={5}
          pt={5}
          pr={35}
          maxWidth={1240}
          className="tw-relative"
      >
        <Box flexGrow={1} className="main content">
          <CartItems isOrders={true} />
          <DeleveryInfo />
        </Box>
        <CartInfo isOrders={true} />
      </Box>
    </PageContainer>
  );
}

export default Order;
