import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import MyPageAddress from './MyPageAddress';
import MyPageInfo from './MyPageInfo';
import MyPageOrders from './MyPageOrders';

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function UserDashboard() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="User Dashboard Tabs"
        sx={{ marginBottom: '20px' }}
      >
        <Tab
          label="회원 정보"
          sx={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }}
        />
        <Tab
          label="주소 관리"
          sx={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }}
        />
        <Tab
          label="주문 관리"
          sx={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }}
        />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <MyPageInfo />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <MyPageAddress />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <MyPageOrders />
      </TabPanel>
    </Box>
  );
}
