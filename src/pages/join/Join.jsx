import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  checkEmail,
  sendVerificationCode,
  signUp,
  verifyCode,
} from '../../api/authApi';

import { PageContainer } from '../../components/PageContainer';
import TermsModal from './fragments/TermsModal';
import { useNavigate } from 'react-router-dom';

function Join() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nickname: '',
  });

  const [errors, setErrors] = useState({});
  const [code, setCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [codeChecked, setCodeChecked] = useState(false);
  const [emailButtonDisabled, setEmailButtonDisabled] = useState(false);
  const [sendCodeButtonDisabled, setSendCodeButtonDisabled] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [agreedModalOpen, setAgreedModalOpen] = useState(false);

  const validateForm = useCallback(() => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.nickname &&
      isVerified &&
      isEmailUnique &&
      termsAgreed &&
      !Object.values(errors).some(Boolean)
    );
  }, [formData, errors, isVerified, isEmailUnique, termsAgreed]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSendCode = async () => {
    if (!isEmailUnique) {
      alert('Please check email uniqueness first.');
      return;
    }
    try {
      await sendVerificationCode(formData.email);
      setCodeSent(true);
      setSendCodeButtonDisabled(true);
      alert('Verification code sent to your email.');
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const isVerified = await verifyCode(formData.email, code);
      if (isVerified) {
        setVerificationStatus('인증 완료');
        setIsVerified(true);
        setCodeChecked(true);
        console.log('Code verified successfully.');
      } else {
        setVerificationStatus('인증실패');
        setIsVerified(false);
        console.error('Verification failed.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setVerificationStatus('Verification failed');
      setIsVerified(false);
    }
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
      setIsEmailUnique(false); // Reset email uniqueness check
      setEmailButtonDisabled(false); // Reset email button disabled state
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

  const checkEmailUnique = async () => {
    try {
      const response = await checkEmail(formData.email);
      const isUnique = !response.data;
      setIsEmailUnique(isUnique);
      if (!isUnique) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '이미 사용 중인 이메일입니다.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
        setEmailButtonDisabled(true);
        setEmailChecked(true);
      }
    } catch (error) {
      console.error('Error checking email uniqueness:', error);
    }
  };

  const handleTermsChange = (event) => {
    setTermsAgreed(event.target.checked);
    if (!event.target.checked) {
      setAgreedModalOpen(true);
    }
  };

  const handleMarketingChange = (event) => {
    setMarketingAgreed(event.target.checked);
  };

  const onClickJoin = async () => {
    if (isVerified) {
      try {
        const response = await signUp(formData);
        console.log('가입 성공:', response.data);
        navigate('/login');
      } catch (err) {
        if (err.response && err.response.data) {
          setErrors(err.response.data);
        } else {
          console.error('가입 오류:', err);
        }
      }
    } else {
      alert('Please verify your email first.');
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color={emailChecked ? 'primary' : 'secondary'}
                  fullWidth
                  onClick={emailButtonDisabled ? null : checkEmailUnique}
                  disabled={
                    !!errors.email || !formData.email || emailButtonDisabled
                  }
                  style={{
                    marginTop: '16px',
                    textTransform: 'none',
                    fontSize: '1rem',
                  }}
                >
                  {emailChecked ? '사용 가능' : '중복 확인'}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color={isVerified ? 'secondary' : 'primary'}
                  fullWidth
                  onClick={isVerified ? null : handleSendCode}
                  disabled={
                    !!errors.email ||
                    !formData.email ||
                    !isEmailUnique ||
                    sendCodeButtonDisabled
                  }
                  style={{
                    marginTop: '16px',
                    textTransform: 'none',
                    fontSize: '1rem',
                  }}
                >
                  {isVerified ? '인증 완료' : '인증코드 발송'}
                </Button>
              </Grid>
            </Grid>
            {codeSent && !isVerified && (
              <>
                <TextField
                  fullWidth
                  label="Verification Code"
                  variant="outlined"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  margin="normal"
                  style={{ marginBottom: '20px' }}
                />
                <Button
                  variant="contained"
                  color={codeChecked ? 'primary' : 'secondary'}
                  fullWidth
                  onClick={codeChecked ? null : handleVerifyCode}
                  disabled={!code}
                  style={{ textTransform: 'none', fontSize: '1rem' }}
                >
                  {codeChecked ? '인증 완료' : '코드 인증'}
                </Button>
              </>
            )}
            {verificationStatus && (
              <Typography
                color={verificationStatus === 'Verified' ? 'primary' : 'error'}
                style={{ marginTop: '20px', textAlign: 'center' }}
              >
                {verificationStatus}
              </Typography>
            )}

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
            <FormGroup>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                    />
                  }
                  label={
                    <Typography component="span">
                      이용약관에 동의합니다. (필수)
                    </Typography>
                  }
                  style={{ marginRight: 4 }}
                />
                <Button size="small" onClick={() => setAgreedModalOpen(true)}>
                  약관 보기
                </Button>
              </div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={marketingAgreed}
                    onChange={(e) => setMarketingAgreed(e.target.checked)}
                  />
                }
                label="마케팅 정보 수신에 동의합니다. (선택)"
              />
            </FormGroup>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={onClickJoin}
              disabled={!validateForm()}
              style={{ marginTop: '20px' }}
            >
              회원가입
            </Button>
            <TermsModal
              open={agreedModalOpen}
              handleClose={() => setAgreedModalOpen(false)}
            />
          </form>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Join;
