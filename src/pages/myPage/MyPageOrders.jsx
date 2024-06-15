import { Divider, List, ListItem, ListItemText, Paper } from '@mui/material';

import React from 'react';

function MyPageOrders({ orders }) {
  return (
    <Paper elevation={3} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List>
        {orders.map((order, index) => (
          <React.Fragment key={order.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`Order #${order.id}`}
                secondary={`Date: ${order.date} - Status: ${order.status}`}
              />
            </ListItem>
            {index !== orders.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default MyPageOrders;
