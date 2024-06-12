import {create} from 'zustand';

/**
 * @typedef {Object} CartItem - 카트 아이템 row의 속성들을 담는 오브젝트
 * @property {number} productId - 유니크한 productId값.
 * @property {number} quantity - 각 제품을 주문 및 카트에 담은 갯수.
 * @property {number} price - 각 제품의 가격
 * @property {boolean} isSelected - 선택 여부를 나타내는 플래그
 */
const useCartOrderStore = create((set) => ({
  /**
   * 카드안에 Product 아이템이 들어갑니다.
   * @type {CartItem[]}
   */
  cartItems: [],
  /**
   * 카트에 들어간 totalCount 갯수.
   * @type {number}
   */
  totalCount: 0,
  /**
   * 총 주문 금액.
   * @type {number}
   */
  totalAmount: 0,
  /**
   * 총 할인 금액
   */
  discountAmount: 0,
  /**
   * 카트를 추가하는 경우
   *
   * @param {number} productId - 유니크한 상품 아이디
   * @param {number} quantity - 상품의 갯수
   * @param {number} price - 각 고유한 상품의 가격
   */
  addCart: (productId, quantity, price) => set((state) => {
    const existItem = state.cartItems.find(item => item.productId === productId);

    if(existItem){
      const updatedItems = state.cartItems.map(item => item.productId === productId ?
        {...item, quantity : item.quantity + quantity, price, }: item);
      return {
        cartItems: updatedItems,
        totalCount: state.totalCount + quantity,
      };
    }
    const newCartItem = {productId, quantity, price, isSelected: true};
    return {
      cartItems: [...state.cartItems, newCartItem],
      totalCount: state.totalCount + quantity,
    };

  }),
  /**
   * 카트 항목을 업데이트합니다.
   *
   * @param {CartItem[]} newCartItems - 업데이트된 카트 항목 배열
   */
  updateCartItems: (newCartItems) => set({ cartItems: newCartItems }),
  /**
   * ProductId로 카트의 리스트를 제거 합니다.
   *
   * @param {number} productId - 유니크한 productId값.
   */
  deleteCart: (productId) => set((state) => {
    const updatedCartItems = state.cartItems.filter(item => item.productId !== productId);
    const removedItem = state.cartItems.find(item => item.productId === productId);
    const updatedTotalCount = state.totalCount - (removedItem ? removedItem.quantity : 0);

    return {
      cartItems: updatedCartItems,
      totalCount: updatedTotalCount,
    };
  }),
  /**
   * cartStore를 초기화 합니다.
   *
   */
  resetCart: () => set({
    cartItems: [],
    totalCount: 0,
    totalAmount: 0,
    discountAmount: 0
  }),

  /**
   * totalAmount 토탈 금액을 계산합니다.
   *
   */
  updateTotalAmount: () => set((state) => {
    const selectedItems = state.cartItems.filter(item => item.isSelected);
    console.dir(selectedItems);
    const totalAmount = selectedItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue.price), 0);
    const discountAmount = totalAmount * 0.1;
    console.dir(totalAmount);
    return { ...state, totalAmount: totalAmount - discountAmount , discountAmount};
  }),

}));

export default useCartOrderStore;