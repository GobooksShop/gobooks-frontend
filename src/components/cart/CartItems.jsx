const CartItems = ({ cartList }) => {
  return (
    <div className="detailslayout tw-min-h-[200px]">
      <header className="tw-flex tw-justify-between tw-items-center tw-px-2 tw-bg-gray-400/35 md:tw-min-h-14">
        <div className="tw-flex tw-ml-2">
          <input type="checkbox" />
          <span>전체 선택</span>
        </div>
        <div>
          휴지통
        </div>
      </header>
      <div className="grid-table-wrap tw-px-2 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35">
        <ul className="tw-px-2">
          {cartList.map((item, index) => (
            <li key={item.id + index} className="tw-flex md:tw-items-center md:tw-gap-10 md:tw-h-36 tw-border-0 tw-border-b tw-border-solid tw-border-gray-400/35"><input
              type="checkbox" />
              <div className="tw-h-full tw-overflow-hidden"><img
                src={item.img_url}
                className="tw-max-w-32 tw-max-h-28 tw-w-full tw-h-auto" /></div>
              <div className="md:tw-w-96">
                <p>{item.product_name}</p>
                <p>10% 40,000원 36,000원</p>
              </div>
              <div className="md:tw-w-52">
                <span>40,000원</span>
                <div>

                </div>
              </div>
              <div className="md:tw-grow md:tw-basis-0">
                <span><strong>3일 이내 배송</strong></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default CartItems;