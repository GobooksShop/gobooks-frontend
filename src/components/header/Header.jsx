import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { CategoryMenuMobile, CategoryMenuPC } from './fragments/CategoryMenu';
import { LogoMobile, LogoPC } from './fragments/Logo';

import { UserMenu } from './fragments/UserMenu';
import { useState } from 'react';

const categoriesExample = [
  {
    id: 123,
    name: '소설',
  },
  {
    id: 124,
    name: '에세이',
  },
  {
    id: 125,
    name: '비문학',
  },
];

function Header() {
  const [categories, setCategories] = useState(categoriesExample);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenProfileMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed" color="">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LogoPC />
            <CategoryMenuMobile
              categories={categories}
              onOpen={handleOpenNavMenu}
              onClose={handleCloseNavMenu}
              anchorElNav={anchorElNav}
            />
            <LogoMobile />
            <CategoryMenuPC categories={categories} />
            <UserMenu
              onOpen={handleOpenProfileMenu}
              onClose={handleCloseProfileMenu}
              anchorElUser={anchorElUser}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <div className="h-[70px] w-full" />
    </>
  );
}

export default Header;
