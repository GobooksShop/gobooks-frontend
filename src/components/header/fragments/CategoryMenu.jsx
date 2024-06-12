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
                className="tw-cursor-pointer"
                onClick={() => handleCategory()}
              />
            ) : (
              <AddBoxIcon
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
  const [selecetedDepth2, setSelectedDepth2] = useState(null);
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategoryStore();

  const handleSelecetedDepth2 = (category) => {
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
        <Box className={'tw-relative'} sx={{ flexGrow: 1 }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{
              color: '#000000',
            }}
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          {isMenuOpen && (
            <Box
              className="tw-flex tw-absolute tw-w-full tw-p-[10px] tw-bottom-[-5px] tw-bg-white"
              sx={{
                border: '1px solid #000',
                borderRadius: '20px',
                transform: 'translateY(100%)',
              }}
            >
              <Box sx={{ width: '170px' }}>
                {categories.map((depth1) => (
                  <Box
                    key={depth1.id}
                    onClick={() => {
                      if (depth1.children.length > 0) {
                        setSelectedDepth1(depth1);
                      } else {
                        navigate(`/${depth1.id}`);
                      }
                    }}
                  >
                    <MenuItem>
                      <Typography
                        sx={{
                          fontWeight: selectedDepth1.id === depth1.id && '700',
                        }}
                      >
                        {depth1.name}
                      </Typography>
                      {selectedDepth1.id === depth1.id && (
                        <ArrowForwardIosIcon
                          sx={{
                            width: '10px',
                            height: '10px',
                            ml: '5px',
                          }}
                        />
                      )}
                    </MenuItem>
                  </Box>
                ))}
              </Box>
              {selectedDepth1.children.length > 0 && (
                <Box>
                  <Link to={`/product/list/${selectedDepth1.id}`}>
                    <Typography sx={{ fontWeight: 700 }}>
                      {selectedDepth1.name} 전체
                    </Typography>
                  </Link>

                  <Box
                    sx={{
                      marginTop: '15px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                  >
                    {selectedDepth1.children.map((categoryDepth2) => {
                      return (
                        <Depth2
                          key={categoryDepth2.id}
                          category={categoryDepth2}
                          selectedCategory={selecetedDepth2}
                          handleCategory={handleSelecetedDepth2}
                        />
                      );
                    })}
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
