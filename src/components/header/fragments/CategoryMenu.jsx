import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

export function CategoryMenuMobile({
  categories,
  onOpen,
  onClose,
  anchorElNav,
}) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onOpen}
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
        onClose={onClose}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {categories.map((category) => (
          <MenuItem key={category.id} onClick={onClose}>
            <Link key={category.id} to={`/product/list/${category.id}`}>
              <Typography textAlign="center">{category.name}</Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export function CategoryMenuPC({ categories }) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {categories.map((category) => (
        <Link key={category.id} to={`/product/list/${category.id}`}>
          <Button sx={{ my: 2, display: 'block', color: '#000' }}>
            {category.name}
          </Button>
        </Link>
      ))}
    </Box>
  );
}
