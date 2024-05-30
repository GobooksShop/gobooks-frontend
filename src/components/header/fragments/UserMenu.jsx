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

import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export function UserMenu({ onOpen, onClose, anchorElUser }) {
  return (
    <>
      <ul className="flex items-center gap-[10px] mr-[10px] ">
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
        <li>
          <IconButton
            className="w-[35px] h-[35px]"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <Link to="/category/management">
              <ManageAccountsIcon />
            </Link>
          </IconButton>
        </li>
      </ul>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={onOpen} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
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
        >
          <MenuItem onClick={onClose}>
            <Link to="/myPage">
              <Typography textAlign="center">마이페이지</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={onClose}>
            <Typography textAlign="center">로그아웃</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}
