import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';

// const categoriesExample = [
//   {
//     id: 123,
//     name: '소설',
//   },
//   {
//     id: 124,
//     name: '에세이',
//   },
//   {
//     id: 125,
//     name: '비문학',
//   },
// ];

function Header() {
  // const [categories, setCategories] = useState(categoriesExample);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed" color="">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',

                  textDecoration: 'none',
                }}
              >
                GoBooks
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{
                  color: '#000000',
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {/*{categories.map((category) => (*/}
                {/*  <MenuItem key={category.id} onClick={handleCloseNavMenu}>*/}
                {/*    <Link key={category.id} to={`/product/list/${category.id}`}>*/}
                {/*      <Typography textAlign="center">*/}
                {/*        {category.name}*/}
                {/*      </Typography>*/}
                {/*    </Link>*/}
                {/*  </MenuItem>*/}
                {/*))}*/}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Gobooks
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/*{categories.map((category) => (*/}
              {/*  <Link key={category.id} to={`/product/list/${category.id}`}>*/}
              {/*    <Button*/}
              {/*      onClick={handleCloseNavMenu}*/}
              {/*      sx={{ my: 2, display: 'block', color: '#000' }}*/}
              {/*    >*/}
              {/*      {category.name}*/}
              {/*    </Button>*/}
              {/*  </Link>*/}
              {/*))}*/}
            </Box>

            <ul className="flex items-center gap-[10px] mr-[10px] ">
              <li>
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Link to="/login">로그인</Link>
                </Button>
              </li>
              <li>
                <Button
                  sx={{
                    my: 2,
                    color: 'white',
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
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">마이페이지</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">로그아웃</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="h-[70px] w-full" />
    </>
  );
}

export default Header;
