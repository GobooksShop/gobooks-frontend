import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import MenuIcon from '@mui/icons-material/Menu';
import useCategoryStore from '../../../store/useCategoryStore';

const Depth3 = ({ category }) => {
  return (
    <Link to={`/product/list/${category.id}`}>
      <Typography key={category.id} sx={{ color: '#767676' }}>
        {category.name}
      </Typography>
    </Link>
  );
};

const Depth2 = ({ category, selectedCategory, handleCategory }) => {
  return (
    <Box>
      <Box
        sx={{
          width: '130px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to={`/product/list/${category.id}`}>
          <Typography>{category.name} </Typography>
        </Link>
        {category.children.length > 0 && (
          <>
            {selectedCategory?.id === category.id ? (
              <IndeterminateCheckBoxIcon
                  sx={{ color: 'grey.300' }}
                  className="tw-cursor-pointer"
                onClick={() => handleCategory()}
              />
            ) : (
              <AddBoxIcon
                  sx={{ color: 'grey.300' }}
                  className="tw-cursor-pointer"
                onClick={() => handleCategory(category)}
              />
            )}
          </>
        )}
      </Box>
      {selectedCategory?.id === category.id && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginTop: '5px',
          }}
        >
          {category.children.map((categoryDepth3) => (
            <Depth3 key={categoryDepth3.id} category={categoryDepth3} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export function CategoryMenu({ handleMenu, isMenuOpen }) {
  const [selectedDepth1, setSelectedDepth1] = useState();
  const [selectedDepth2, setSelectedDepth2] = useState(null);
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategoryStore();

  const handleSelectedDepth2 = (category) => {
    setSelectedDepth2(category);
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setSelectedDepth1(categories[0]);
  }, [categories]);

  return (
    <>
      {selectedDepth1 && (
        <Box className="tw-relative tw-w-full">
          <IconButton
            size="large"
            aria-label="메뉴 열기/닫기"
            onClick={handleMenu}
            className="tw-text-black focus:tw-outline-none"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {isMenuOpen && (
            <Box
              className="tw-absolute tw-top-full tw-left-0 tw-z-20 tw-mt-2 tw-rounded-lg tw-shadow-lg tw-bg-white tw-flex"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-appbar"
              style={{ width: '1200px' }}
            >
              {/* 1단계 카테고리 */}
              <Box className="tw-w-48 tw-mr-4 tw-p-4">
                {categories.map((depth1) => (
                  <MenuItem
                    key={depth1.id}
                    onClick={() => {
                      if (depth1.children.length > 0) {
                        setSelectedDepth1(depth1);
                        setSelectedDepth2(null);
                      } else {
                        navigate(`/${depth1.id}`);
                      }
                    }}
                    className="tw-justify-between"
                    sx={{
                      width: '100%',
                      color: selectedDepth1?.id === depth1.id ? 'primary.main' : 'inherit',
                    }}
                  >
                    <Typography
                      className={
                        selectedDepth1?.id === depth1.id ? 'tw-font-bold' : ''
                      }
                    >
                      {depth1.name}
                    </Typography>
                    {selectedDepth1?.id === depth1.id && (
                        <ArrowForwardIosIcon sx={{ ml: 1, fontSize: '1rem' }} />
                    )}
                  </MenuItem>
                ))}
              </Box>

              {/* 2단계 카테고리 */}
              {selectedDepth1?.children.length > 0 && (
                <Box className="tw-flex-1 tw-py-5">
                  <Link
                    to={`/product/list/${selectedDepth1.id}`}
                    className="tw-block tw-mb-2"
                  >
                    <Typography variant="h6" component="h2"
                                sx={{
                                  fontWeight: 'bold',
                                  display: 'flex',
                                  alignItems: 'center' }}>
                      {selectedDepth1.name} 전체
                      <ArrowForwardIosIcon sx={{ ml: 1, fontSize: '1rem' }} />
                    </Typography>
                  </Link>

                  <Box
                    className="tw-flex tw-flex-col tw-gap-2 tw-mt-4"
                    style={{ paddingBottom: '1rem' }}
                  >
                    {selectedDepth1.children.map((categoryDepth2) => (
                      <Depth2
                        key={categoryDepth2.id}
                        category={categoryDepth2}
                        selectedCategory={selectedDepth2}
                        handleCategory={handleSelectedDepth2}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
