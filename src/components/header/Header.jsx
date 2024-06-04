import { AppBar, Box, Toolbar } from '@mui/material';

import { CategoryMenu } from './fragments/CategoryMenu';
import { Logo } from './fragments/Logo';
import { UserMenu } from './fragments/UserMenu';
import { useState } from 'react';

const categoriesExample = [
  {
    id: 123,
    name: '국내도서',
    descendants: [
      {
        id: 126,
        name: '소설',
        descendants: [
          { id: 126, name: '한국소설' },
          { id: 127, name: '영미소설' },
        ],
      },
      {
        id: 127,
        name: '시/에세이',
        descendants: [
          { id: 126, name: '한국시' },
          { id: 127, name: '해외시' },
        ],
      },
    ],
  },
  {
    id: 222,
    name: '서양도서',
    descendants: [],
  },
  {
    id: 125,
    name: '일본도서',
    descendants: [
      {
        id: 126,
        name: '잡지',
        descendants: [],
      },
    ],
  },
];

function Header() {
  const [categories, setCategories] = useState(categoriesExample);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleMenu = (event) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenProfileMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed" color="">
        <Box className="tw-flex tw-items-center tw-px-[24px]" maxWidth="1536px">
          <Logo />
          {categories && (
            <CategoryMenu
              categories={categories}
              handleMenu={handleMenu}
              isMenuOpen={isMenuOpen}
            />
          )}

          <Toolbar disableGutters>
            <UserMenu
              onOpen={handleOpenProfileMenu}
              onClose={handleCloseProfileMenu}
              anchorElUser={anchorElUser}
            />
          </Toolbar>
        </Box>
      </AppBar>
      <div className="tw-h-[70px] tw-w-full" />
    </>
  );
}

export default Header;
