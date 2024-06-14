import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

import CustomButton from '../ui/CustomButton';

const DeleveryInfo = () => {

  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleComplete = (data) => {
    let fullAddress = '';
    let addressType = '';
    console.log(data);
    console.log("render몇번?")
    // 주소 타입에 따라 처리: R이면 도로명주소, J면 지번주소
    if (data.userSelectedType === 'R') {
      fullAddress = data.roadAddress;
      addressType = 'roadAddress';
    } else if (data.userSelectedType === 'J') {
      fullAddress = data.jibunAddress;
      addressType = 'jibunAddress';
    }

    // bname = 동, buildingName 건물명
    if (data.buildingName !== '') {
      fullAddress += ` ${data.buildingName}`;
    }


    setDeleveryInfo({
      ...deleveryInfo,
      zipcode: data.zonecode,
      [addressType]: fullAddress,
    });
  };

  const handleClick = () => {
    setDeleveryInfo({
      zipcode: '',
      roadAddress: '',
      jibunAddress: ''
    });
    open({ onComplete: handleComplete });
  };

  const [deleveryInfo, setDeleveryInfo] = useState({
    name: '',
    zipcode: '', // address를 zipcode로 변경
    roadAddress: '',
    jibunAddress: '',
    realAddress: '',
    phoneNumber: '',
    landlinePhoneNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeleveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="tw-w-full">
      <header className="title tw-h-24 tw-flex tw-items-center">
        <h1 className="tw-font-semibold tw-text-2xl">배송주소</h1>
      </header>
      <div className="tw-grid tw-grid-cols-6 tw-gap-5 tw-grid-rows-table-layout tw-border-solid tw-border tw-border-gray-500/50 tw-rounded tw-px-5 tw-py-4">
        <div className="tw-row-span-1 tw-col-span-2 tw-flex tw-items-center">
          <label htmlFor="name" className="tw-block tw-w-40 tw-pl-8">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="이름"
            required
            value={deleveryInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="tw-row-start-2 tw-row-span-1 tw-col-span-2 tw-flex tw-items-center">
          <label htmlFor="zipcode" className="tw-block tw-w-40 tw-pl-8">우편 번호</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="우편 번호"
            required
            value={deleveryInfo.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="tw-row-start-2 tw-row-span-1 tw-start-col-2">
          <CustomButton onClick={handleClick} text="주소 찾기" size="large" />
        </div>
        <div className="tw-pl-24 tw-row-start-3 tw-row-span-1 tw-col-span-4 tw-flex tw-items-center">
          <label htmlFor="roadAddress" className="tw-block tw-w-40 tw-pl-8">도로명 주소</label>
          <input
            type="text"
            id="roadAddress"
            name="roadAddress"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="도로명 주소"
            required
            value={deleveryInfo.roadAddress}
            onChange={handleChange}
          />
        </div>
        <div className="tw-pl-24 tw-row-start-4 tw-row-span-1 tw-col-span-4 tw-flex tw-items-center">
          <label htmlFor="jibunAddress" className="tw-block tw-w-40 tw-pl-8">지번 주소</label>
          <input
            type="text"
            id="jibunAddress"
            name="jibunAddress"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="지번 주소"
            required
            value={deleveryInfo.jibunAddress}
            onChange={handleChange}
          />
        </div>
        <div className="tw-pl-24 tw-row-start-5 tw-row-span-1 tw-col-span-4 tw-flex tw-items-center">
          <label htmlFor="realAddress" className="tw-block tw-w-40 tw-pl-8">실제 주소</label>
          <input
            type="text"
            id="realAddress"
            name="realAddress"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="실제 주소"
            required
            value={deleveryInfo.realAddress}
            onChange={handleChange}
          />
        </div>
        <div className="tw-row-start-6 tw-row-span-1 tw-col-span-2 tw-flex tw-items-center">
          <label htmlFor="phoneNumber" className="tw-block tw-w-40 tw-pl-8">휴대폰</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="휴대폰"
            required
            value={deleveryInfo.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="tw-row-start-7 tw-row-span-1 tw-col-span-2 tw-flex tw-items-center">
          <label htmlFor="landlinePhoneNumber" className="tw-block tw-w-40 tw-pl-8">일반전화</label>
          <input
            type="text"
            id="landlinePhoneNumber"
            name="landlinePhoneNumber"
            className="tw-h-6 tw-bg-gray-50 tw-outline-none tw-border tw-border-solid tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-blue-500 focus:tw-border-blue-500 focus:tw-border-2 tw-block tw-w-full tw-p-2"
            placeholder="일반전화"
            required
            value={deleveryInfo.landlinePhoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleveryInfo;
