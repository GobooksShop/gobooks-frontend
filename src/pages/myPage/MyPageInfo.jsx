import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { deleteUser, updateUserInfo } from '../../api/user/userApi';

import { PageContainer } from '../../components/PageContainer';
import useUserStore from '../../store/useUserStore';

function MyPageInfo() {
  const { user, setUser, clearUser } = useUserStore();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    nickname: '',
    marketingAgreed: false,
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setUserInfo({ ...user, password: '', phone: user.phone || '' });
  }, [user]);

  const validateField = useCallback(
    (name, value) => {
      let error = '';
      if (name === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = '이메일은 빈 값이 들어올 수 없습니다.';
        } else if (!emailPattern.test(value)) {
          error = '올바른 이메일 형식이 아닙니다.';
        }
      } else if (name === 'password' || name === 'confirmPassword') {
        const passwordPattern =
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$/;
        if (!value) {
          error = '패스워드는 빈 값이 들어올 수 없습니다.';
        } else if (!passwordPattern.test(value)) {
          error =
            '패스워드는 영문, 숫자, 특수문자(!@#$%^&*) 조합으로 입력해야 합니다.';
        }
        if (name === 'confirmPassword' && userInfo.password !== value) {
          error = '비밀번호가 일치하지 않습니다.';
        }
      } else if (name === 'nickname') {
        if (!value) {
          error = '닉네임은 빈 값이 들어올 수 없습니다.';
        }
      } else if (name === 'name') {
        const namePattern = /^[a-zA-Z가-힣]{2,}$/;
        if (!value) {
          error = '이름은 빈 값이 들어올 수 없습니다.';
        } else if (!namePattern.test(value)) {
          error = '이름은 2자리 이상 한글 또는 영문만 입력 가능합니다.';
        }
      } else if (name === 'phone') {
        const phonePattern = /^010-\d{4}-\d{4}$/;
        if (!value) {
          error = '핸드폰 번호는 빈 값이 들어올 수 없습니다.';
        } else if (!phonePattern.test(value)) {
          error = '핸드폰 번호는 010-1234-5678 형식으로 입력해야 합니다.';
        }
      } else {
        error = !value ? `${name}은(는) 빈 값이 들어올 수 없습니다.` : '';
      }

      setErrors((prev) => ({ ...prev, [name]: error }));
      return error === '';
    },
    [userInfo.password, setErrors],
  );

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      const formattedValue =
        name === 'phone' ? formatPhoneNumber(value) : value;
      setUserInfo((prev) => ({ ...prev, [name]: formattedValue }));
      validateField(name, formattedValue);
    },
    [setUserInfo, validateField],
  );

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setUserInfo((prev) => ({ ...prev, password: value }));
    validateField('password', value);
    if (confirmPassword && value !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateField('confirmPassword', value);
    if (userInfo.password && value !== userInfo.password) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: checked }));
  };

  const onClickUpdate = async () => {
    try {
      const isValid =
        Object.entries(userInfo).every(([name, value]) =>
          name === 'marketingAgreed' ? true : validateField(name, value),
        ) &&
        (!userInfo.password || validateField('password', userInfo.password));

      if (isValid) {
        if (!user.userId) {
          console.error('userId is undefined');
          return;
        }
        const response = await updateUserInfo(user.userId, userInfo);
        setUser({ ...userInfo, password: '' });
        console.log('유저 정보 업데이트 성공', response);
        setIsEditing(false);
      } else {
        console.error('유효성 검사 실패');
      }
    } catch (error) {
      console.error('유저 정보 업데이트 실패', error);
    }
  };

  const onClickDelete = async () => {
    try {
      if (!user.userId) {
        console.error('userId is undefined');
        return;
      }
      await deleteUser(user.userId);
      clearUser();
      console.log('탈퇴 처리되었습니다.');
    } catch (error) {
      console.error('탈퇴 처리 오류', error);
    }
  };

  return (
    <PageContainer>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3 }}
        >
          <Typography variant="h5" component="h1" textAlign="center" mb={2}>
            회원정보
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="이름"
              variant="outlined"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="이메일"
              variant="outlined"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="닉네임"
              variant="outlined"
              name="nickname"
              value={userInfo.nickname}
              onChange={handleInputChange}
              error={!!errors.nickname}
              helperText={errors.nickname}
              margin="normal"
              disabled={!isEditing}
            />
            <TextField
              fullWidth
              label="핸드폰 번호"
              variant="outlined"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              error={!!errors.phone}
              helperText={errors.phone}
              margin="normal"
              style={{ marginBottom: '20px' }}
              disabled={!isEditing}
            />
            {isEditing && (
              <>
                <TextField
                  fullWidth
                  label="비밀번호"
                  variant="outlined"
                  type="password"
                  value={userInfo.password}
                  onChange={handlePasswordChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="비밀번호 확인"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  margin="normal"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userInfo.marketingAgreed}
                      onChange={handleCheckboxChange}
                      name="marketingAgreed"
                      color="primary"
                    />
                  }
                  label="마케팅 수신 동의"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={onClickUpdate}
                  sx={{ mt: 2 }}
                >
                  업데이트
                </Button>
              </>
            )}
            {!isEditing && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => setIsEditing(true)}
                sx={{ my: 1 }}
              >
                정보 수정
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={onClickDelete}
              sx={{ my: 1 }}
            >
              회원 탈퇴
            </Button>
          </form>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default MyPageInfo;
