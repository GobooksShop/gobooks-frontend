import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import logoLight from './logoLight.png'

export function Logo() {
  return (
      <Link to="/">
        {/*<Typography*/}
        {/*  variant="h6"*/}
        {/*  noWrap*/}
        {/*  sx={{*/}
        {/*    mr: 2,*/}
        {/*    fontFamily: 'monospace',*/}
        {/*    fontWeight: 700,*/}
        {/*    letterSpacing: '.3rem',*/}
        {/*    textDecoration: 'none',*/}
        {/*  }}*/}
        {/*>*/}
        {/*  GoBooks*/}
        {/*</Typography>*/}
        <img
            src={logoLight}
            alt="GoBooks 로고"
            style={{width: 200, height: "auto"}}
        />
      </Link>
  );
}
