import React, { useEffect } from 'react';

import googleIcon from '../../../assets/socialLoginImages/btn_google.svg';
import kakaoIcon from '../../../assets/socialLoginImages/btn_kakao.svg';
import naverIcon from '../../../assets/socialLoginImages/btn_naver.svg';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';

const handleSocialLogin = (provider) => {
  let url = '';
  switch (provider) {
    case 'google':
      url = 'http://localhost:8080/oauth2/authorization/google';
      break;
    case 'kakao':
      url = 'http://localhost:8080/oauth2/authorization/kakao';
      break;
    case 'naver':
      url = 'http://localhost:8080/oauth2/authorization/naver';
      break;
    default:
      console.error('Unknown provider:', provider);
      return;
  }

  const width = 600, height = 700;
  const left = window.outerWidth / 2 - width / 2;
  const top = window.outerHeight / 2 - height / 2;

  const authWindow = window.open(
    url,
    '_blank',
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
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
      if (event.origin === 'http://localhost:8080' && event.data) {
        console.log('Login successful');
        const { accessToken, userId, name, email, role } =
          event.data;
        console.log('response.data:' + event.data);
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
    <div>
      <button type="button" onClick={() => handleSocialLogin('google')} style={{ border: 'none', background: 'none' }}>
        <img src={googleIcon} alt="Google Login" />
      </button>
      <button type="button" onClick={() => handleSocialLogin('kakao')} style={{ border: 'none', background: 'none' }}>
        <img src={kakaoIcon} alt="Kakao Login" />
      </button>
      <button type="button" onClick={() => handleSocialLogin('naver')} style={{ border: 'none', background: 'none' }}>
        <img src={naverIcon} alt="Naver Login" />
      </button>
    </div>
  );
};

export default SocialLogin;
