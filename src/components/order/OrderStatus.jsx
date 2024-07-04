import { Box, Button } from '@mui/material';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const steps = ['장바구니', '주문/결제', '주문 완료'];

const OrderStatus = ({ currentStep }: { currentStep: number }) => {

  return (
      <Box className="tw-flex tw-items-center tw-gap-2">
        {steps.map((label, index) => (
            <React.Fragment key={label}>
              <Button
                  component="div"
                  variant={index === currentStep ? 'contained' : 'outlined'}
                  color="primary"
                  sx={{ borderRadius: 2, pointerEvents: 'none', px:3, py:1 }}
              >
                {label}
              </Button>
              {index < steps.length - 1 && (
                  <ArrowForwardIosIcon
                      className={`tw-text-gray-400 ${
                          index < currentStep ? 'tw-text-orange-300' : ''
                      }`}
                  />
              )}
            </React.Fragment>
        ))}
      </Box>
  );
}

export default OrderStatus;