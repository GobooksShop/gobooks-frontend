import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

import React from 'react';

function MyPageOrders({ orders = [] }) {
  return (
    <Paper className="tw-w-full tw-max-w-xl tw-bg-white tw-p-4 tw-rounded-lg tw-shadow-md">
      <Typography variant="h6" className="tw-mb-4 tw-text-center">
        주문 목록
      </Typography>
      <List>
        {orders.map((order, index) => (
          <ListItem key={index} className="tw-mb-4 tw-p-4 tw-border tw-border-gray-300 tw-rounded-lg">
            <ListItemText
              primary={
                <Typography variant="subtitle1" className="tw-font-bold">
                  주문번호: {order.orderNumber}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2">상품명: {order.productName}</Typography>
                  <Typography variant="body2">가격: {order.price}원</Typography>
                  <Typography variant="body2">주문일자: {order.orderDate}</Typography>
                  {order.isDelivered && (
                    <Typography variant="body2" className="tw-text-green-500">
                      (배송 완료)
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default MyPageOrders;
