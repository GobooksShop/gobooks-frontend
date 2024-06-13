import { Box } from '@mui/material';

export function PageContainer({ children }) {
  return (
    <Box
      sx={{
        margin: '0 auto',
        width: '100%',
        maxWidth: '1536px',
        paddingX: '24px',
        boxSizing: 'border-box',
        minHeight: '500px',
        paddingTop: '40px',
        paddingBottom: '100px',
      }}
    >
      {children}
    </Box>
  );
}
