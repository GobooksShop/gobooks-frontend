import { AppBar, Box, ClickAwayListener, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';

import { CategoryMenu } from './fragments/CategoryMenu';
import { Logo } from './fragments/Logo';
import { UserMenu } from './fragments/UserMenu';
import { useLocation } from 'react-router-dom'; // Import useLocation

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
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleMenu = (event) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenProfileMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickAway = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <AppBar
        className="tw-fixed tw-box-border tw-w-full tw-px-[20px]"
        color=""
      >
        <Box
          className="tw-flex tw-justify-between tw-items-center"
          maxWidth="1536px"
          sx={{ margin: '0 auto', width: '100%' }}
        >
          <Box className="tw-w-full tw-flex tw-items-center">
            <Logo />
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className="tw-w-full">
                {categories && (
                  <CategoryMenu
                    categories={categories}
                    handleMenu={handleMenu}
                    isMenuOpen={isMenuOpen}
                  />
                )}
              </div>
            </ClickAwayListener>
          </Box>
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
