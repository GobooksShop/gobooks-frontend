import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { logout } from '../../../api/authApi';
import useUserStore from '../../../store/useUserStore';

export function UserMenu({ onOpen, onClose, anchorElUser }) {
  const { user, clearUser } = useUserStore((state) => ({
    user: state.user,
    clearUser: state.clearUser,
  }));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청을 보냄
      logout();
      clearUser();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user'); // USER 정보 삭제 추가
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      onClose();
      navigate('/');
    }
  };

  return (
    <>
      <ul className="tw-flex tw-items-center tw-gap-[10px] tw-mr-[10px]">
        {!user.name && (
          <>
            <li>
              <Button sx={{ my: 2, color: '#000', display: 'block' }}>
                <Link to="/login">로그인</Link>
              </Button>
            </li>
            <li>
              <Button
                sx={{
                  my: 2,
                  color: '#000',
                  display: 'block',
                  whiteSpace: 'nowrap',
                }}
              >
                <Link to="/join">회원가입</Link>
              </Button>
            </li>
          </>
        )}
        <li>
          <IconButton
            className="w-[35px] h-[35px]"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
          </IconButton>
        </li>
        {user.role === 'ROLE_ADMIN' && (
          <li>
            <IconButton
              className="tw-w-[35px] tw-h-[35px]"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <Link to="/category/management">
                <ManageAccountsIcon />
              </Link>
            </IconButton>
          </li>
        )}
      </ul>
      {user.name && (
        <Box
          sx={{
            flexGrow: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Tooltip title="Open settings">
            <IconButton onClick={onOpen} sx={{ p: 0 }}>
              <Avatar alt={user.name} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Typography variant="body1" align="center"></Typography>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={onClose}
            disableScrollLock={true}
          >
            <Typography
              textAlign="left"
              fontSize={'14px'}
              padding={'6px 16px'}
              color={'primary'}
            >
              {user.name}님
            </Typography>
            <MenuItem onClick={onClose}>
              <Link to="/myPage">
                <Typography textAlign="center">마이페이지</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center">로그아웃</Typography>
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
}
