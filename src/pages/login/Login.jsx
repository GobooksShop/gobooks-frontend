import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { PageContainer } from '../../components/PageContainer';
import { useEffect } from 'react';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const store = useUserStore();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(formData);

      // 로그인 후 처리 (예: 페이지 이동 등)
      if (response.status === 200) {
        console.log('로그인 성공');
        // 필요한 경우 추가 처리
        const { accessToken, userId, name, email, role } = response.data;
        console.log('response.data:' + response.data);
        // Access Token을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        // Zustand 상태 업데이트
        setUser({ userId, name, email, role });
        // 홈 페이지로 이동
        navigate('/');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  useEffect(() => {
    console.log(store);
  }, [store]);

  return (
    <PageContainer>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="패스워드"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
}

export default Login;
