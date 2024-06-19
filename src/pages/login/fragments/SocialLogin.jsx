import { Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';

import googleIcon from '../../../assets/socialLoginImages/btn_google.svg';
import kakaoIcon from '../../../assets/socialLoginImages/btn_kakao.svg';
import naverIcon from '../../../assets/socialLoginImages/btn_naver.svg';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';

const providerUrls = {
  google: `https://www.gobookstore.shop/oauth2/authorization/google`,
  kakao: `https://www.gobookstore.shop/oauth2/authorization/kakao`,
  naver: `https://www.gobookstore.shop//oauth2/authorization/naver`,
};

const handleSocialLogin = (provider) => {
  const url = providerUrls[provider];

  if (!url) {
    console.error('Unknown provider:', provider);
    return;
  }

  const width = 600,
    height = 700;
  const left = window.outerWidth / 2 - width / 2;
  const top = window.outerHeight / 2 - height / 2;

  const authWindow = window.open(
    url,
    '_blank',
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`,
  );

  if (authWindow) {
    authWindow.focus();
  }
};

const SocialLogin = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const handleAuthComplete = (event) => {
      if (event.origin === `${baseURL}` && event.data) {
        console.log('Login successful');
        const { accessToken, userId, name, email, role } = event.data;
        console.log('response.data:', event.data);
        localStorage.setItem('accessToken', accessToken);
        setUser({ userId, name, email, role });

        window.location.href = '/';
      }
    };

    window.addEventListener('message', handleAuthComplete);

    return () => {
      window.removeEventListener('message', handleAuthComplete);
    };
  }, [navigate, setUser]);

  return (
    <>
      <Typography variant="h7" className="tw-relative tw-bg-white tw-pt-10">
        소셜 로그인
      </Typography>
      <Divider className="tw-w-full tw-p-1.5" />
      <div className="tw-pt-3 tw-flex tw-justify-center tw-gap-4">
        <IconButton
          onClick={() => handleSocialLogin('google')}
          className="tw-bg-transparent hover:tw-bg-gray-100"
        >
          <img src={googleIcon} alt="Google Login" className="tw-w-8 tw-h-8" />
        </IconButton>
        <IconButton
          onClick={() => handleSocialLogin('kakao')}
          className="tw-bg-transparent hover:tw-bg-gray-100"
        >
          <img src={kakaoIcon} alt="Kakao Login" className="tw-w-8 tw-h-8" />
        </IconButton>
        <IconButton
          onClick={() => handleSocialLogin('naver')}
          className="tw-bg-transparent hover:tw-bg-gray-100"
        >
          <img src={naverIcon} alt="Naver Login" className="tw-w-8 tw-h-8" />
        </IconButton>
      </div>
    </>
  );
};

export default SocialLogin;
