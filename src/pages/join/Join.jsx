import { Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { PageContainer } from '../../components/PageContainer';
import { signUp } from '../../api/authApi';

function Join() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nickname: '',
  });

  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = '이메일은 빈 값이 들어올 수 없습니다.';
      } else if (!emailPattern.test(value)) {
        error = '올바른 이메일 형식이 아닙니다.';
      }
    } else if (name === 'password') {
      const passwordPattern =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$/;
      if (!value) {
        error = '패스워드는 빈 값이 들어올 수 없습니다.';
      } else if (!passwordPattern.test(value)) {
        error =
          '패스워드는 영문, 숫자, 특수문자(!@#$%^&*) 조합으로 입력해야 합니다.';
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
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = () => {
    const { name, email, password, nickname } = formData;
    const isValid =
      name &&
      email &&
      password &&
      nickname &&
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.nickname;
    setIsButtonDisabled(!isValid);
  };

  const onClickJoin = async () => {
    try {
      const response = await signUp(formData);
      console.log('가입 성공:', response.data);
      // Optionally, redirect or clear form here
    } catch (err) {
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        console.error('가입 오류:', err);
      }
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
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            className="text-center"
          >
            회원가입
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="이름"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="이메일"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="비밀번호"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              type="password"
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="닉네임"
              variant="outlined"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              error={!!errors.nickname}
              helperText={errors.nickname}
              margin="normal"
              style={{ marginBottom: '20px' }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onClickJoin}
              disabled={isButtonDisabled}
            >
              회원가입
            </Button>
          </form>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Join;
