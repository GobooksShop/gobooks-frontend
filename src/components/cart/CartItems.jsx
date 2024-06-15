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
  useEffect(() => {
    const fetchData = async () => {

      const storeData = JSON.parse(localStorage.getItem('cart-storage')).state || [];
      console.log("======================new===============================")
      console.log(storeData);
      if(!storeData){
        console.error('로컬 스토리지에서 cart-storage 데이터를 가져올 수 없습니다.');
        return;
      }
      const storedCartItems = storeData.cartItems;
      const productList =storedCartItems.map((item) => item.productId);
      const data = await getProduct(productList)

      const cartData = [];
      console.log(data);
      if(props.isOrders){
        const selectedOrderItems = storedCartItems.filter(item => item.isSelected);
        for(const orderItem of selectedOrderItems){
          const productData = data.find(item => item.id === orderItem.productId);
          console.log(productData);
          const cartDatas = {
            "productId" : productData.id,
            "product_name" : productData.title,
            "quantity": orderItem.quantity,
            "price" : productData.fixedPrice,
            "isSelected": orderItem.isSelected,
            "amount": productData.fixedPrice * orderItem.quantity,
            "img_url" : "https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791192987675.jpg"
          }
          cartData.push(cartDatas);

        }

      }else{
        for(const item of data){
          console.log(storedCartItems)
          const storedItem = storedCartItems.find(cartItem => cartItem.productId === item.id);
          const cartDatas = {
            "productId" : item.id,
            "product_name" : item.title,
            "quantity": storedItem.quantity,
            "price" : item.fixedPrice,
            "isSelected": storedItem.isSelected,
            "amount": item.fixedPrice * storedItem.quantity,
            "img_url" : "https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791192987675.jpg"
          }
          cartData.push(cartDatas);
        }
      }

      console.log(cartData);
      setCartItems(cartData);
      store.updateTotalAmount();
    };
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
    store.updateCartItems(updatedItems.map(({ productId, quantity, price, isSelected }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
    })));
    store.updateTotalAmount();
  };

  const handleSelectItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].isSelected = !newCartItems[index].isSelected;
    setCartItems(newCartItems);
    store.updateCartItems(newCartItems.map(({ productId, quantity, price, isSelected }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
    })));
    store.updateTotalAmount();
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
    store.updateCartItems(updatedItems.map(({ productId, quantity, price, isSelected }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
    })));
    store.updateTotalAmount();
  };

  //버튼 클릭시 삭제합니다.
  const handleDeleteSelected = () => {
    const updatedItems = cartItems.filter(item => !item.isSelected);
    setCartItems(updatedItems);
    store.updateCartItems(updatedItems.map(({ productId, quantity, price, isSelected }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
    })));
    store.updateTotalAmount();
  };
  //각각의 아이템을 선택하여 삭제합니다.
  const handleDeleteItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    store.updateCartItems(newCartItems.map(({ productId, quantity, price, isSelected }) => ({
      productId: productId,
      quantity,
      price,
      isSelected,
    })));
    store.updateTotalAmount();
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
      <div className="grid-table-wrap tw-px-2 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
        <ul className="tw-px-2">
          {cartItems.map((item, index) => (
            <li key={item.product_id + index + crypto.randomUUID()}
                className="tw-flex md:tw-items-center md:tw-gap-10 md:tw-h-36 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
              {props.isOrders ? <></> :<input
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
              <div className="md:tw-w-96">
                <p>{item.product_name}</p>
                <p>10% 40,000원 36,000원</p>
              </div>
              <div className="md:tw-w-52">
                <span>{item.amount}원</span>
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
              <div className="md:tw-grow md:tw-basis-0">
                <span><strong>3일 이내 배송</strong></span>
              </div>
              {props.isOrders ? <></> :
              <div className="tw-self-start tw-mt-4 tw-justify-self-end ">
                <button onClick={() => handleDeleteItem(index)}
                        className="tw-text-gray-500 hover:tw-text-gray-700 hover:tw-cursor-pointer">
                  <CloseIcon />
                </button>
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
