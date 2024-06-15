import { List, ListItem, ListItemText, Paper } from '@mui/material';

import React from 'react';

function MyPageAddress({ addresses = [] }) { // Default addresses to an empty array if it's undefined
  return (
    <Paper elevation={3} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {addresses.map((address, index) => (
          <ListItem key={index}>
            <ListItemText primary={address.name} secondary={address.details} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default MyPageAddress;