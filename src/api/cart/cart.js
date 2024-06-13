import { httpClient } from '../httpClient';

export const getProduct = async (productIdList) => {
  const productList = [];
  for (const productId of productIdList) {
    const response = await httpClient.get(`/products/${productId}`)
    productList.push(response.data);
  }
  return productList;
};

export const getCartData = (cartItems) => {
    const cartData = [
      { "product_id": 1,
        "product_name" : "스프링 네이티브 웹 프로그래밍",
        "quantity": 1,
        "price" : 40000,
        "isSelected": true,
        "amount": 40000,
        "img_url": "https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791192987675.jpg"
      },
      { "product_id": 2,
        "product_name" : "스프링 네이티브 웹 프로그래밍 2",
        "quantity": 1,
        "price" : 50000,
        "isSelected": true,
        "amount": 50000,
        "img_url": "https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791192987675.jpg"
      },
      { "product_id": 3,
        "product_name" : "스프링 네이티브 웹 프로그래밍 3",
        "quantity": 2,
        "price" : 80000,
        "isSelected": true,
        "amount": 160000,
        "img_url": "https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9791192987675.jpg"
      },
    ]
  return cartData;
}

