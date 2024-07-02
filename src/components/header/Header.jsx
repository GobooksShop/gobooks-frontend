import { AppBar, Box, ClickAwayListener, Toolbar } from '@mui/material';
import { useEffect, useState } from 'react';

import { CategoryMenu } from './fragments/CategoryMenu';
import { Logo } from './fragments/Logo';
import { UserMenu } from './fragments/UserMenu';
import useCategoryStore from '../../store/useCategoryStore';
import { useLocation } from 'react-router-dom';

function Header() {
  const { categories, fetchCategories } = useCategoryStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
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
      <AppBar className="tw-fixed tw-w-full tw-bg-white tw-shadow-md tw-z-50" color="default">
        <Box
            className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 tw-py-2 tw-flex tw-justify-between tw-items-center"
            sx={{
              width: { xs: '100%', sm: 'calc(100% - 120px)' },
              mx: 'auto',
            }}
        >
          <Box className="tw-flex tw-items-center">

            <Logo />
            <ClickAwayListener onClickAway={handleClickAway}>
            <div className="tw-relative tw-pl-1">
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
