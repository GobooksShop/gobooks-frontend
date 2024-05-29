import { Box } from '@mui/material';

function Footer() {
  return (
    <Box
      className="flex justify-center border-solid border-t-2 border-[#efefef] "
      sx={{
        bgcolor: 'white',
        color: '#7e7e7e',
        fontSize: '14px',
      }}
    >
      <footer className="p-5">
        <p>© 고북스 All rights reserved.</p>
      </footer>
    </Box>
  );
}

export default Footer;
