import { Box } from '@mui/material';

function Footer() {
  return (
    <Box
      className="tw-flex tw-justify-center tw-border-solid tw-border-t-2 tw-border-[#efefef] "
      sx={{
        bgcolor: 'white',
        color: '#7e7e7e',
        fontSize: '14px',
      }}
    >
      <footer className="tw-p-5">
        <p>© 고북스 All rights reserved.</p>
      </footer>
    </Box>
  );
}

export default Footer;
