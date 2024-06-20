import React from 'react';

const OrderCompleteInfo = ({deliveryInfo, merchentUid, paymentInfo }) => {

  return (
    <>
      <div className="tw-w-full">
        <header className="title tw-h-24 tw-flex tw-items-center">
          <h1 className="tw-font-semibold tw-text-2xl">결제정보</h1>
        </header>
        <div
          className="tw-grid tw-grid-cols-6 tw-gap-5 tw-grid-rows-table-layout-3 tw-border-solid tw-border tw-border-gray-500/50 tw-rounded tw-px-5 tw-py-4">
          <div className="tw-row-start-1 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="name" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">결제 금액</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={paymentInfo.amount+"원"}

            />
          </div>
          <div className="tw-row-start-2 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">배송비</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={'0원'}
              disabled
            />
          </div>
          <div className="tw-row-start-3 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="phoneNumber" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">결제 방법</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={paymentInfo.payMethod}
            />
          </div>
        </div>
      </div>
      <div className="tw-w-full">
        <header className="title tw-h-24 tw-flex tw-items-center">
          <h1 className="tw-font-semibold tw-text-2xl">주문정보</h1>
        </header>
        <div
          className="tw-grid tw-grid-cols-6 tw-gap-5 tw-grid-rows-table-layout-3 tw-border-solid tw-border tw-border-gray-500/50 tw-rounded tw-px-5 tw-py-4">
          {/*<div className="tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">*/}
          {/*  <label htmlFor="name" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">보낸분</label>*/}
          {/*  <input*/}
          {/*    type="text"*/}
          {/*    className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"*/}
          {/*    placeholder="이름"*/}
          {/*    readOnly*/}
          {/*    value={deliveryInfo}*/}

          {/*  />*/}
          {/*</div>*/}
          <div className="tw-row-start-1 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">주문번호</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={merchentUid}
              disabled
            />
          </div>
          <div className="tw-row-start-2 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">주문일</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={deliveryInfo}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="tw-w-full">
        <header className="title tw-h-24 tw-flex tw-items-center">
          <h1 className="tw-font-semibold tw-text-2xl">배송주소</h1>
        </header>
        <div
          className="tw-grid tw-grid-cols-6 tw-gap-5 tw-grid-rows-table-layout-5 tw-border-solid tw-border tw-border-gray-500/50 tw-rounded tw-px-5 tw-py-4">
          <div className="tw-row-start-1 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="name" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">받는분</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={deliveryInfo.recipientName}

            />
          </div>
          <div className="tw-row-start-2 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">우편 번호</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={deliveryInfo.zipcode}
              disabled
            />
          </div>
          <div className="tw-row-start-3 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">주소</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={deliveryInfo.address1 +" "+deliveryInfo.address2}
              disabled
            />
          </div>
          <div className="tw-row-start-4 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="phoneNumber" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">연락처</label>
            <input
              type="text"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              readOnly
              value={deliveryInfo.recipientPhone}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCompleteInfo;