import React from 'react';

const OrderCompleteInfo = () => {
  const deliveryInfo = {
    name: '',
    zipcode: '',
    address: '',
    realAddress: '',
    phoneNumber: '',
    landlinePhoneNumber: '',
  };
  return (
    <>
      <div className="tw-w-full">
        <header className="title tw-h-24 tw-flex tw-items-center">
          <h1 className="tw-font-semibold tw-text-2xl">주문정보</h1>
        </header>
        <div
          className="tw-grid tw-grid-cols-6 tw-gap-5 tw-grid-rows-table-layout-3 tw-border-solid tw-border tw-border-gray-500/50 tw-rounded tw-px-5 tw-py-4">
          <div className="tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="name" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              placeholder="이름"
              required
              value={deliveryInfo.name}

            />
          </div>
          <div className="tw-row-start-2 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">주문번호</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              placeholder="우편 번호"
              required
              value={deliveryInfo.zipcode}
              disabled
            />
          </div>
          <div className="tw-row-start-3 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">주문일</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              placeholder="주소"
              required
              value={deliveryInfo.address}
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
            <label htmlFor="name" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">이름</label>
            <input
              type="text"
              id="name"
              name="name"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              placeholder="이름"
              required
              value={deliveryInfo.name}

            />
          </div>
          <div className="tw-row-start-2 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">우편 번호</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              placeholder="우편 번호"
              required
              value={deliveryInfo.zipcode}
              disabled
            />
          </div>
          <div className="tw-row-start-3 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">우편 번호</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              placeholder="주소"
              required
              value={deliveryInfo.address}
              disabled
            />
          </div>
          <div className="tw-row-start-4 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="phoneNumber" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">휴대폰</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              placeholder="휴대폰"
              required
              value={deliveryInfo.phoneNumber}
            />
          </div>
          <div className="tw-row-start-5 tw-row-span-1 tw-col-span-6 md:tw-col-span-2 tw-flex tw-items-center">
            <label htmlFor="landlinePhoneNumber" className="tw-block tw-w-40 tw-pl-8 tw-text-blue-500">일반전화</label>
            <input
              type="text"
              id="landlinePhoneNumber"
              name="landlinePhoneNumber"
              className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
              placeholder="일반전화"
              required
              value={deliveryInfo.landlinePhoneNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCompleteInfo;