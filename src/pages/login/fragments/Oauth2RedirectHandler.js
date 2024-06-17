import React, { useEffect } from 'react';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const tokenResponseDtoCookie = Cookies.get('TokenResponseDto');
    console.log('TokenResponseDto Cookie:', tokenResponseDtoCookie);

    if (tokenResponseDtoCookie) {
      try {
        const decodedTokenResponseDto = decodeURIComponent(
          tokenResponseDtoCookie,
        );
        const parsedTokenResponseDto = JSON.parse(decodedTokenResponseDto);
        const { accessToken, refreshToken, userId, name, email, role } =
          parsedTokenResponseDto;

        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const user = { userId, name, email, role };
        setUser(user);

        Cookies.remove('TokenResponseDto');

        if (window.opener && !window.opener.closed) {
          window.opener.postMessage('loginSuccessful', 'http://localhost:3000');
          window.close();
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to parse TokenResponseDto', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [setUser, navigate]);

  return <div>Loading...</div>;
};

export default OAuth2RedirectHandler;
