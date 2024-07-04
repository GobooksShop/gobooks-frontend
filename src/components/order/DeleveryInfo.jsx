import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

import CustomButton from '../ui/CustomButton';
import { DeliveryContext } from '../../App';
import {Box, Button, Stack, TextField, Typography} from "@mui/material";

/**
 * @param props - props 객체
 * @property pageName - 결제 페이지라면. {'pageName': 'orderComplate'}
 * @returns React.FC
 */
const DeleveryInfo = (props) => {
  const {deliveryInfo, setDeliveryInfo} = useContext(DeliveryContext);
  const inputActiveRef =  useRef([]);
  useEffect(() => {
    disabledAllInputs();
  }, [])

  useEffect(() => {
    setDeliveryInfo(deliveryInfo);
  }, [deliveryInfo, setDeliveryInfo]);

  const disabledAllInputs = () => {
    console.dir(inputActiveRef);
    inputActiveRef.current.forEach(input => {
      if(input){
        input.disabled = props.inputActive;
      }
    })
  }

  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const handleComplete = (data) => {
    let fullAddress = '';
    // 주소 타입에 따라 처리: R이면 도로명주소, J면 지번주소
    if (data.userSelectedType === 'R') {
      fullAddress = data.roadAddress;
    } else if (data.userSelectedType === 'J') {
      fullAddress = data.jibunAddress;
    }

    // bname = 동, buildingName 건물명
    if (data.buildingName !== '') {
      fullAddress += ` ${data.buildingName}`;
    }

    setDeliveryInfo({
      ...deliveryInfo,
      zipcode: data.zonecode,
      address: fullAddress,
    });
  };

  const handleClick = () => {
    setDeliveryInfo({
      zipcode: '',
      address: '',
    });
    open({ onComplete: handleComplete });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateCustomer = () => {
    const { name, zipcode, address, realAddress, phoneNumber, landlinePhoneNumber } = deliveryInfo;

    if (!name) {
      alert('이름을 입력해주세요.');
      return false;
    }
    if (!zipcode) {
      alert('우편 번호를 입력해주세요.');
      return false;
    }
    if (!address) {
      alert('주소를 입력해주세요.');
      return false;
    }
    if (!realAddress) {
      alert('상세 주소를 입력해주세요.');
      return false;
    }
    if (!phoneNumber && !landlinePhoneNumber) {
      alert('휴대폰 또는 일반전화 번호를 입력해주세요.');
      return false;
    }
    return true;
  };

  return (
    <Box width="100%">
      <Stack spacing={3} border="1px solid rgba(0, 0, 0, 0.12)" borderRadius={1} p={4} mt={10}>
        <Typography variant="h6" sx={{ alignItems: 'center', pb: 1 }}>배송 주소</Typography>
        <TextField
            fullWidth
            label="이름"
            id="name"
            name="name"
            required
            value={deliveryInfo.name}
            inputRef={el => inputActiveRef.current[0] = el}
            onChange={handleChange}
            sx={{width:"34%"}}
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width:"50%" }}>
          <TextField
              sx={{ flexGrow: 1 }}
              label="우편 번호"
              id="zipcode"
              name="zipcode"
              required
              value={deliveryInfo.zipcode}
              onChange={handleChange}
              disabled
          />
          <Button onClick={handleClick} variant="outlined" sx={{py:2, px:3}}>
            주소 찾기
          </Button>
        </Box>

        <TextField
            fullWidth
            label="주소"
            id="address"
            name="address"
            required
            value={deliveryInfo.address}
            onChange={handleChange}
            disabled
            sx={{width:"80%"}}
        />

        <TextField
            fullWidth
            label="상세 주소"
            id="realAddress"
            name="realAddress"
            required
            inputRef={el => inputActiveRef.current[1] = el}
            value={deliveryInfo.realAddress}
            onChange={handleChange}
            sx={{width:"80%"}}
        />

          <TextField
              fullWidth
              label="휴대폰"
              id="phoneNumber"
              name="phoneNumber"
              required
              inputRef={el => inputActiveRef.current[2] = el}
              value={deliveryInfo.phoneNumber}
              onChange={handleChange}
              sx={{width:"50%"}}
          />
          <TextField
              fullWidth
              label="일반전화"
              id="landlinePhoneNumber"
              name="landlinePhoneNumber"
              required
              inputRef={el => inputActiveRef.current[3] = el}
              value={deliveryInfo.landlinePhoneNumber}
              onChange={handleChange}
              sx={{width:"50%"}}
          />
      </Stack>
    </Box>
  );
};

export default DeleveryInfo;
