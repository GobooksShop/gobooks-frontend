import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export function LogoPC() {
  return (
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
  );
}

export function LogoMobile() {
  return (
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
  );
}
