import { useEffect, useState } from 'react';
import CartProductCounter from './CartProductCounter';
import { getProduct } from '../../api/cart/cart';
import useCartOrderStore from '../../store/useCartOrderStore';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const CartItems = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const store = useCartOrderStore();

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
        'img_url': 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791192987675.jpg',
      }];

      setCartItems(cartDatas);
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
        const cartDatas = {
          'productId': productData.id,
          'product_name': productData.title,
          'quantity': orderItem.quantity,
          'price': productData.fixedPrice,
          'isSelected': orderItem.isSelected,
          'amount': productData.fixedPrice * orderItem.quantity,
          'status': 'cart',
          'img_url': 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791192987675.jpg',
        };
        cartData.push(cartDatas);
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
          'img_url': 'https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791192987675.jpg',
        };
        cartData.push(cartDatas);
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
    <div className="detailslayout tw-min-h-[200px]">
      <header className="tw-flex tw-justify-between tw-items-center tw-px-2 tw-bg-gray-400/35 md:tw-min-h-14">
        {props.isOrders ? <></> :
          <>
            <div className="tw-flex tw-ml-2">
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              <span>전체 선택</span>
            </div>
            <div onClick={handleDeleteSelected} className="tw-cursor-pointer">
              <DeleteIcon />
            </div>
          </>
        }
      </header>
      <div className="tw-grid-table-wrap tw-px-2 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
        <ul className="tw-px-2">
          {cartItems.map((item, index) => (
            <li key={item.productId + index}
                className="tw-flex md:tw-items-center md:tw-gap-10 md:tw-h-36 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
              {props.isOrders ? <></> : <input
                type="checkbox"
                checked={cartItems[index]?.isSelected || false}
                onChange={() => handleSelectItem(index)}
              />
              }
              <div className="tw-h-full tw-overflow-hidden">
                <img
                  src={item.img_url}
                  className="tw-max-w-32 tw-max-h-28 tw-w-full tw-h-auto"
                />
              </div>
              <div className="md:tw-w-96 tw-text-lg tw-font-normal">
                <p>{item.product_name}</p>
                <p><span className="tw-text-blue-500">10% </span><span
                  className="tw-line-through">{item.price}원</span> {item.price * 0.9}원</p>
              </div>
              <div className="md:tw-w-52">
                <div className="tw-w-20 tw-flex tw-flex-col tw-items-center">
                  <span>{item.amount * 0.9}원</span>
                  {props.isOrders ? <></> :
                    <CartProductCounter
                      idx={index}
                      productId={item.productId}
                      initialCount={item.quantity}
                      price={parseInt(item.price)}
                      onCountChange={handleCountChange}
                    />
                  }
                </div>
              </div>
              <div className="md:tw-grow md:tw-basis-0">
                <span><strong>3일 이내 배송</strong></span>
              </div>
              {props.isOrders ? <></> :
                <div className="tw-self-start tw-mt-4 tw-justify-self-end ">
                  <CloseIcon variant="h6" onClick={() => handleDeleteItem(index)}
                             className=" tw-text-gray-500 hover:tw-text-gray-700 hover:tw-cursor-pointer" />
                </div>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartItems;
