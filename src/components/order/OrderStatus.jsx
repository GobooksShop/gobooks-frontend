const OrderStatus = () => {

  return (
    <div className="tw-grid tw-grid-cols-8 tw-gap-2 tw-w-[500px] tw-h-[50px] tw-whitespace-nowrap">
      <div className="tw-col-span-2">
        <div className="tw-flex tw-justify-center tw-items-center tw-h-[50px] tw-p-2 tw-text-2xl tw-font-semibold tw-text-white tw-bg-blue-400">장바구니</div>
      </div>
      <div className="tw-col-span-2">
        <div className="tw-flex tw-justify-center tw-items-center tw-h-[50px] tw-p-2 tw-text-2xl tw-font-semibold tw-text-white tw-bg-blue-400">주문</div>
      </div>
      <div className="tw-col-span-2">
        <div className="tw-flex tw-justify-center tw-items-center tw-h-[50px] tw-p-2 tw-text-2xl tw-font-semibold tw-text-white tw-bg-blue-400">완료</div>
      </div>
    </div>
  )
}

export default OrderStatus;