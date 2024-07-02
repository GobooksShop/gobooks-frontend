import {create} from 'zustand';
import {persist} from 'zustand/middleware';

//todo TotalCount에 문제가 조금 있음. 프로그램이 돌아가는데 문제가 있는 이슈를 아니라서 나중에 수정함.
//todo 같은 아이템을 카트에 담고 바로 주문을 눌렀을 경우. 카트에 있는 아이템을 삭제하고 바로 주문을 할지..
//todo 아니면 같은 아이템을 삭제하지만,
const useCartOrderStore = create(
    persist(
        (set) => ({
            /**
             * @typedef {Object} CartItem - 카트 아이템 row의 속성들을 담는 오브젝트
             * @property {number} productId - 유니크한 productId값.
             * @property {number} quantity - 각 제품을 주문 및 카트에 담은 갯수.
             * @property {number} price - 각 제품의 가격
             * @property {boolean} isSelected - 선택 여부를 나타내는 플래그
             */
            cartItems: [],
            /**
             * @typedef {Object} orderItem - 카트 아이템 row의 속성들을 담는 오브젝트
             * @property {number} productId - 유니크한 productId값.
             * @property {number} quantity - 각 제품을 주문 및 카트에 담은 갯수.
             * @property {number} price - 각 제품의 가격
             * @property {boolean} isSelected - 선택 여부를 나타내는 플래그
             */
            orderItems: [],
            /**
             * @typedef {Object} orderItem - 카트 아이템 row의 속성들을 담는 오브젝트
             * @property {number} productId - 유니크한 productId값.
             * @property {number} quantity - 각 제품을 주문 및 카트에 담은 갯수.
             * @property {number} price - 각 제품의 가격
             */
            payItems: [],
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
             * 결제 주문 번호
             */
            merchantUid: '',
            /**
             * 결제 하는 대표 상품 및 갯수
             */
            paidProductName: '',
            /**
             * 카트를 추가하는 경우
             *
             * @param {number} productId - 유니크한 상품 아이디
             * @param {number} quantity - 상품의 갯수
             * @param {number} price - 각 고유한 상품의 가격
             * @param {string} status - 장바구니 담기인지 바로 구매인지 확인하는 status
             */
            addCart: (productId, quantity, price, status) => set((state) => {
                const existItem = state.cartItems.find(item => item.productId === productId);

                if (existItem) {
                    const updatedItems = state.cartItems.map(item => item.productId === productId && item.status === status ?
                        {...item, quantity: item.quantity + quantity, price, status} : item);
                    return {
                        cartItems: updatedItems,
                        totalCount: state.totalCount + quantity,
                    };
                }
                const newCartItem = {productId, quantity, price, isSelected: true, status: status};
                return {
                    cartItems: [...state.cartItems, newCartItem],
                    totalCount: state.totalCount + quantity,
                };

            }),
            /**
             * Order에 추가하는 경우
             *
             * @param {number} productId - 유니크한 상품 아이디
             * @param {number} quantity - 상품의 갯수
             * @param {number} price - 각 고유한 상품의 가격
             * @param {string} status - 장바구니 담기인지 바로 구매인지 확인하는 status
             */
            addOrder: (productId, quantity, price, status) => set((state) => {
                const newOrderItem = {productId, quantity, price, isSelected: true, status: status};
                return {
                    orderItems: [newOrderItem],
                    totalCount: state.totalCount + quantity,
                };
            }),
            /**
             * 카트 항목을 업데이트합니다.
             *
             * @param {CartItem[]} newCartItems - 업데이트된 카트 항목 배열
             */
            updateCartItems: (newCartItems) => set({cartItems: newCartItems}),
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
             * orderItems를 초기화 합니다.
             */
            resetOrderItems: () => set({
                orderItems: [],
            }),
            /**
             * 카트에서 주문하기 버튼 눌렀을 때, merchantUId 제발급을 위해서 초기화 및 저장 기능
             *
             */
            resetMerchantUid: () => set({merchantUid: ''}),
            setMerchantUid: (merchantUid) => set({merchantUid: merchantUid}),
            /**
             * 결제 주문할 상품명 추가 및 초기화
             */
            setPayedProductName: (paidProductName) => set({paidProductName: paidProductName}),
            resetPayedProductName: () => set({paidProductName: ''}),
            /**
             * 바로 주문 상태의 totalAmount 토탈 금액을 계산합니다.
             *
             */
            updateTotalOrderAmount: () => set((state) => {
                const orderItems = state.orderItems.filter(item => item);
                console.log(orderItems);
                const totalAmount = orderItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue.price), 0);
                const discountAmount = totalAmount * 0.1;
                return {...state, totalAmount: totalAmount - discountAmount, discountAmount};
            }),
            /**
             * totalCartAmount 장바구니 로직의 토탈 금액을 계산합니다.
             *
             */
            updateTotalCartAmount: () => set((state) => {
                const cartItems = state.cartItems.filter(item => item.status === 'cart' && item.isSelected);
                const totalAmount = cartItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue.price), 0);
                const discountAmount = totalAmount * 0.1;
                return {...state, totalAmount: totalAmount - discountAmount, discountAmount};
            }),
            /**
             * CartItems의 validation을 진행합니다.
             */


        }),
        {
            name: 'cart-storage',
            getStorage: () => localStorage,
            merge: (persistedState, currentState) => ({
                ...currentState,
                ...persistedState,
            }),
        }
    )
);

export default useCartOrderStore;