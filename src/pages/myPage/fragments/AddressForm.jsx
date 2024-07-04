import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const AddressForm = ({ open, handleClose, handleSave, initialData }) => {
  const [formData, setFormData] = useState({
    label: '',
    isPrimary: false,
    zipcode: '',
    address1: '',
    address2: '',
    recipientName: '',
    recipientPhone: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    const namePattern = /^[a-zA-Z가-힣]{2,}$/;
    const phonePattern = /^\d{10,11}$/;

    if (!formData.recipientName || !namePattern.test(formData.recipientName)) {
      tempErrors.recipientName = "받는사람 이름은 2자리 이상 한글 또는 영문만 입력 가능합니다.";
    }
    if (!formData.recipientPhone || !phonePattern.test(formData.recipientPhone)) {
      tempErrors.recipientPhone = "받는사람 연락처는 10자리 또는 11자리 숫자여야 합니다.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      handleSave(formData);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>주소 {initialData ? '수정' : '추가'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="label"
          label="주소별칭"
          fullWidth
          variant="outlined"
          value={formData.label}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="zipcode"
          label="우편번호"
          fullWidth
          variant="outlined"
          value={formData.zipcode}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address1"
          label="주소1"
          fullWidth
          variant="outlined"
          value={formData.address1}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="address2"
          label="주소2"
          fullWidth
          variant="outlined"
          value={formData.address2}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="recipientName"
          label="받는사람 이름"
          fullWidth
          variant="outlined"
          value={formData.recipientName}
          onChange={handleChange}
          error={!!errors.recipientName}
          helperText={errors.recipientName}
        />
        <TextField
          margin="dense"
          name="recipientPhone"
          label="받는사람 연락처"
          fullWidth
          variant="outlined"
          value={formData.recipientPhone}
          onChange={handleChange}
          error={!!errors.recipientPhone}
          helperText={errors.recipientPhone}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleSubmit} color="primary">
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddressForm;
