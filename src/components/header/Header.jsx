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
