import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@mui/material';
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
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    setUserInfo({ ...user, password: '' });
  }, [user]);

  const validateField = useCallback(
    (name, value) => {
      let error = '';
      switch (name) {
        case 'email': {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!value) {
            error = '이메일은 빈 값이 들어올 수 없습니다.';
          } else if (!emailPattern.test(value)) {
            error = '올바른 이메일 형식이 아닙니다.';
          }
          break;
        }
        case 'password':
        case 'confirmPassword': {
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
          break;
        }
        case 'nickname': {
          if (!value) {
            error = '닉네임은 빈 값이 들어올 수 없습니다.';
          }
          break;
        }
        case 'name': {
          const namePattern = /^[a-zA-Z가-힣]{2,}$/;
          if (!value) {
            error = '이름은 빈 값이 들어올 수 없습니다.';
          } else if (!namePattern.test(value)) {
            error = '이름은 2자리 이상 한글 또는 영문만 입력 가능합니다.';
          }
          break;
        }
        default:
          error = !value ? `${name}은(는) 빈 값이 들어올 수 없습니다.` : '';
          break;
      }
      setErrors((prev) => ({ ...prev, [name]: error }));
      return error === '';
    },
    [userInfo.password, setErrors],
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      validateField(name, value);
      setUserInfo((prev) => ({ ...prev, [name]: value }));
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
      const isValid = Object.entries(userInfo).every(
        ([name, value]) => validateField(name, value)
      ) && (!userInfo.password || validateField('password', userInfo.password));

      if (isValid) {
        if (!user.userId) {
          console.error('userId is undefined');
          return;
        }
        const response = await updateUserInfo(user.userId, userInfo);
        setUser({ ...userInfo, password: '' }); // Update Zustand store and clear password
        console.log('유저 정보 업데이트 성공', response);
        setIsEditing(false); // Reset editing state after successful update
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
      clearUser(); // Clear user data from Zustand store
      console.log('탈퇴 처리되었습니다.');
    } catch (error) {
      console.error('탈퇴 처리 오류', error);
    }
  };

  return (
    <PageContainer>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          sx={{ bgcolor: 'white', p: 4, borderRadius: 2, boxShadow: 3 }}
        >
          <Typography variant="h4" component="h1" textAlign="center" mb={2}>
            마이페이지
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
                sx={{ mt: 2 }}
              >
                정보 수정
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={onClickDelete}
              sx={{ mt: 1 }}
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
