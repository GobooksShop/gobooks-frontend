import { useState } from 'react';

const deleveryMap = {
  name: '',
  address: '',
  phoneNumber: '',
  landlinePhoneNumber: '',
};

const DeleveryInfo = () => {
  const [deleveryInfo, setDeleveryInfo] = useState({});

  const handleOnChangeName = () => {

  }

  const handleOnChangeAddress = () => {

  }
  return (
    <div>
      <header>
        <h1>배송주소</h1>
      </header>
      <div className="tw-flex">
        <div className="md:tw-w-52 tw-flex tw-flex-col">
          <label htmlFor="name">이름</label>
          <label>2</label>
        </div>
        <div className="md:tw-w-auto">
          <div><input id="name" type="text" onChange={handleOnChangeName}/></div>
          <div><input id="name" type="text" onChange={handleOnChangeAddress}/></div>
        </div>
      </div>
    </div>
  );
};

export default DeleveryInfo;