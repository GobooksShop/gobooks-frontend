import { useEffect, useState } from 'react';
import CartProductCounter from './CartProductCounter';
import { getProduct } from '../../api/cart/cart';
import useCartOrderStore from '../../store/useCartOrderStore';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {Box, Checkbox, Grid, IconButton, Typography} from "@mui/material";

const CartItems = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const store = useCartOrderStore();
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const fetchData = async () => {

    const storeData = JSON.parse(localStorage.getItem('cart-storage')).state || [];
    // 분리 시작점.
    const existDirectOrder = storeData.orderItems || [];

    if (!storeData) {
      console.error('로컬 스토리지에서 cart-storage 데이터를 가져올 수 없습니다.');
      return;
    }

    if (existDirectOrder.length === 1) {
      const productIdList = existDirectOrder.map((item) => item.productId);
      const data = await getProduct(productIdList);
      const cartDatas = [{
        'productId': data[0].id,
        'product_name': data[0].title,
        'quantity': existDirectOrder[0].quantity,
        'price': data[0].fixedPrice,
        'isSelected': existDirectOrder[0].isSelected,
        'amount': data[0].fixedPrice * existDirectOrder[0].quantity,
        'img_url': `${baseUrl}/api/images/${data[0].pictureUrl}`,
      }];

      setCartItems(cartDatas);
      store.setPayedProductName(cartDatas[0].product_name);
      store.updateTotalOrderAmount();
      store.resetOrderItems();


      return;
    }// end
    //분리 시작점
    const storedCartItems = storeData.cartItems;
    const productList = storedCartItems.map((item) => item.productId);
    const data = await getProduct(productList);

    const cartData = [];
    console.log('cart에서 order로 넘어올때 타는 로직');
    console.log(props.isOrders);
    if (props.isOrders) {
      const selectedOrderItems = storedCartItems.filter(item => item.isSelected && item.status == 'cart');
      for (const orderItem of selectedOrderItems) {
        const productData = data.find(item => item.id === orderItem.productId);
        console.log(productData);
        const cartDatas = {
          'productId': productData.id,
          'product_name': productData.title,
          'quantity': orderItem.quantity,
          'price': productData.fixedPrice,
          'isSelected': orderItem.isSelected,
          'amount': productData.fixedPrice * orderItem.quantity,
          'status': 'cart',
          'img_url': `${baseUrl}/api/images/${productData.pictureUrl}`,
        };
        cartData.push(cartDatas);
      }
      if(cartData.length === 1){
        store.setPayedProductName(cartData[0].product_name);
      }else if(cartData.length > 1) {
        console.log("carDataLength > 1");
        store.setPayedProductName(`${cartData[0].product_name} 외 ${cartData.length - 1}건`);
      }

    } else {
      for (const item of data) {
        console.log(storedCartItems);
        console.log(item);
        const storedItem = storedCartItems.find(cartItem => cartItem.productId === item.id && cartItem.status === 'cart');
        console.log(storedItem);
        if (!storedItem) {
          return;
        }
        const cartDatas = {
          'productId': item.id,
          'product_name': item.title,
          'quantity': storedItem.quantity,
          'price': item.fixedPrice,
          'isSelected': storedItem.isSelected,
          'amount': item.fixedPrice * storedItem.quantity,
          'status': 'cart',
          'img_url': `${baseUrl}/api/images/${item.pictureUrl}`,
        };
        cartData.push(cartDatas);
      }
      if(cartData.length === 1){
        store.setPayedProductName(cartData[0].product_name);
      }else if(cartData.length > 1) {
        console.log("carDataLength > 1");
        store.setPayedProductName(`${cartData[0].product_name} 외 ${cartData.length - 1}건`);
      }
    }
    //end
    console.log(cartData);
    setCartItems(cartData);
    if (existDirectOrder.length === 0) {
      store.updateTotalOrderAmount();
      store.updateTotalCartAmount();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // localStorage.setItem('cart-storage', JSON.stringify({ state: { cartItems } }));
    const allSelected = cartItems.every(item => item.isSelected);
    setSelectAll(allSelected);

  }, [cartItems]);

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedItems = cartItems.map(item => ({ ...item, isSelected: newSelectAll }));
    setCartItems(updatedItems);
    store.updateCartItems(updatedItems.map(({ productId, quantity, price, isSelected, status }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
      status,
    })));
    store.updateTotalCartAmount();
  };

  const handleSelectItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].isSelected = !newCartItems[index].isSelected;
    setCartItems(newCartItems);
    store.updateCartItems(newCartItems.map(({ productId, quantity, price, isSelected, status }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
      status,
    })));
    store.updateTotalCartAmount();
  };

  const handleCountChange = (productId, newCount, index) => {
    const updatedItems = [...cartItems];
    console.dir(updatedItems);
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: newCount,
      amount: newCount * updatedItems[index].price,
    };
    setCartItems(updatedItems);
    store.updateCartItems(updatedItems.map(({ productId, quantity, price, isSelected, status }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
      status,
    })));
    store.updateTotalCartAmount();
  };

  //버튼 클릭시 삭제합니다.
  const handleDeleteSelected = () => {
    const updatedItems = cartItems.filter(item => !item.isSelected);
    setCartItems(updatedItems);
    store.updateCartItems(updatedItems.map(({ productId, quantity, price, isSelected, status }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
      status,
    })));
    store.updateTotalCartAmount();
  };
  //각각의 아이템을 선택하여 삭제합니다.
  const handleDeleteItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    store.updateCartItems(newCartItems.map(({ productId, quantity, price, isSelected, status }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
      status,
    })));
    store.updateTotalCartAmount();
  };

  return (
    <Box className="detailslayout tw-min-h-[200px]">
      <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem',
            backgroundColor: '#f5f5f5',
            minHeight: '3.5rem',
          }}
      >
        {props.isOrders ? <>
              <Typography variant="h6" className="tw-items-center tw-pl-2">주문 내역</Typography>
            </> :
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
              <Typography variant="body1" className="tw-items-center">전체 선택</Typography>
            </Box>
            <IconButton onClick={handleDeleteSelected}>
              <DeleteIcon />
            </IconButton>
          </>
        }
      </Box>
      <Box
          className="tw-grid-table-wrap tw-px-2 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
      >
          {cartItems.map((item, index) => (
            <Box key={item.productId + index}
                 sx={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: 2,
                   borderBottom: '1px solid #ddd',
                   padding: '0.5rem',
                   '@media (min-width: 768px)': { // md 사이즈 이상에서 스타일 변경
                     height: '9rem',
                     gap: 4,
                   },
                 }}
            >
              {props.isOrders ? <></> :
                <Checkbox
                    checked={cartItems[index]?.isSelected || false}
                    onChange={() => handleSelectItem(index)}
                />
              }
              <img
                src={item.img_url}
                className="tw-max-w-32 tw-max-h-28 tw-w-full tw-h-auto"
              />
              <Box sx={{flexGrow: 1}}>
                <Typography variant="h6" component="p">
                  {item.product_name}
                </Typography>
                <Typography variant="body1">
                  <span className="tw-text-orange-500">10% </span>
                  <span className="tw-line-through">{item.price.toLocaleString()}원</span>
                  <Typography variant="h7" sx={{marginLeft:2, fontWeight:"bold"}}>{(item.price * 0.9).toLocaleString()}원</Typography>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="h6">{(item.amount * 0.9).toLocaleString()}원</Typography>
                  {props.isOrders ? <></> :
                    <CartProductCounter
                      idx={index}
                      productId={item.productId}
                      initialCount={item.quantity}
                      price={parseInt(item.price)}
                      onCountChange={handleCountChange}
                    />
                  }
              </Box>
              <Typography variant="h7" color="primary">3일 이내 배송</Typography>
              {props.isOrders ? <></> :
                <IconButton onClick={() => handleDeleteItem(index)}>
                  <CloseIcon className="tw-text-gray-500 hover:tw-text-gray-700 hover:tw-cursor-pointer" />
                </IconButton>
              }
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default CartItems;
