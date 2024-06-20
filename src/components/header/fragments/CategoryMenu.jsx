import {
  Box,
  ClickAwayListener,
  Collapse,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import useCategoryStore from '../../../store/useCategoryStore';

const Depth3 = ({ category, onLinkClick }) => {
  return (
    <Box className="tw-my-1">
      <Link
        to={`/product/list/${category.id}`}
        onClick={() => onLinkClick(`/product/list/${category.id}`)}
      >
        <Typography className="tw-text-sm tw-text-gray-600">
          {category.name}
        </Typography>
      </Link>
    </Box>
  );
};

const Depth2 = ({
  category,
  selectedCategory,
  handleCategory,
  onLinkClick,
}) => {
  const [isOpen, setIsOpen] = useState(selectedCategory?.id === category.id);

  useEffect(() => {
    setIsOpen(selectedCategory?.id === category.id);
  }, [selectedCategory, category.id]);

  const toggleOpen = () => {
    handleCategory(category);
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ width: '200px', minWidth: '150px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="tw-py-1"
        onClick={toggleOpen}
      >
        <Link
          to={`/product/list/${category.id}`}
          onClick={() => onLinkClick(`/product/list/${category.id}`)}
          className="tw-no-underline tw-truncate"
        >
          <Typography>{category.name}</Typography>
        </Link>

        {category.children.length > 0 && (
          <IconButton onClick={toggleOpen} className="tw-cursor-pointer">
            {isOpen ? (
              <ExpandLess sx={{ color: 'grey.300' }} />
            ) : (
              <ExpandMore sx={{ color: 'grey.300' }} />
            )}
          </IconButton>
        )}
      </Box>

      <Collapse in={isOpen} timeout="auto" unmountOnExit={false}>
        <Box
          className="tw-ml-2 transition-all duration-300 ease-in-out overflow-hidden"
          style={{ maxHeight: isOpen ? '500px' : '0' }}
        >
          {category.children.map((categoryDepth3) => (
            <Depth3
              key={categoryDepth3.id}
              category={categoryDepth3}
              onLinkClick={onLinkClick}
            />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export function CategoryMenu() {
  const [selectedDepth1, setSelectedDepth1] = useState();
  const [selectedDepth2, setSelectedDepth2] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    setSelectedDepth2(null);
  };

  const handleSelectedDepth2 = (category) => {
    setSelectedDepth2(category);
  };

  const handleLinkClick = (to) => {
    setIsMenuOpen(false);
    setSelectedDepth2(null);
    navigate(to);
  };

  useEffect(() => {
    setSelectedDepth1(categories[0]);
  }, [categories]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setSelectedDepth2(null);
      setSelectedTab(0);
    }
  };

  const handleClickAway = () => {
    setIsMenuOpen(false);
    setSelectedDepth2(null);
  };

  return (
    <Box className="tw-relative tw-w-full">
      <IconButton
        size="large"
        aria-label="메뉴 열기/닫기"
        onClick={handleMenuToggle}
        className="tw-text-black focus:tw-outline-none"
      >
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      {isMenuOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box
            className="tw-absolute tw-top-full tw-left-0 tw-z-20 tw-mt-2 tw-rounded-lg tw-shadow-lg tw-bg-white"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-appbar"
            sx={{
              maxHeight: 600,
              overflowY: 'auto',
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {categories.map((category) => (
                <Tab key={category.id} label={category.name} />
              ))}
            </Tabs>

            {categories[selectedTab]?.children.length > 0 && (
              <Box className="tw-flex-1 tw-py-5 tw-px-5">
                <Link
                  to={`/product/list/${categories[selectedTab].id}`}
                  onClick={() =>
                    handleLinkClick(
                      `/product/list/${categories[selectedTab].id}`,
                    )
                  }
                >
                  <Typography
                    variant="h6"
                    component="h2"
                    className="tw-flex tw-items-center tw-font-bold"
                  >
                    {categories[selectedTab].name} 전체
                    <ArrowForwardIosIcon
                      className="tw-ml-1"
                      sx={{ fontSize: '1rem' }}
                    />
                  </Typography>
                </Link>

                <Box className="tw-flex tw-flex-col tw-gap-1 tw-mt-4">
                  {categories[selectedTab].children.map((categoryDepth2) => (
                    <Depth2
                      key={categoryDepth2.id}
                      category={categoryDepth2}
                      selectedCategory={selectedDepth2}
                      handleCategory={handleSelectedDepth2}
                      onLinkClick={handleLinkClick}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </ClickAwayListener>
      )}
    </Box>
  );
}
