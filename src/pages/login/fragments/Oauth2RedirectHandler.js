import React, { useEffect } from 'react';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Correct import as default
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../store/useUserStore';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const token = Cookies.get('USR_JWT');
    console.log('token:', token);
    if (token) {
      localStorage.setItem('authToken', token);
      try {
        const user = decodeToken(token);
        if (user) {
          setUser(user);
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage('loginSuccessful', 'http://localhost:3000');
            window.close(); 
          } else {
            navigate('/'); 
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Failed to decode token', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [setUser, navigate]);

  return <div>Loading...</div>;
};

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      userId: decoded.userId,
      name: decoded.name,
      email: decoded.userEmail,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

export default OAuth2RedirectHandler;
