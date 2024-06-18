import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';

import Category from './category/Category';
import ProductAdd from './product/ProductAdd';
import ProductEdit from './product/ProductEdit';
import UserManagement from './users/UserManagement';

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

export default function ManagerDashboard() {
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
        '#tabpanel-1': { width: '100% !important' },
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="Manager Dashboard Tabs"
        sx={{
          marginBottom: '20px',
        }}
      >
        <Tab
          label="회원 관리"
          sx={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }}
        />
        <Tab
          label="카테고리 관리"
          sx={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }}
        />
        <Tab
          label="상품 추가"
          sx={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }}
        />
        <Tab
          label="상품 수정"
          sx={{ fontSize: '1rem', fontWeight: 'bold', padding: '10px 20px' }}
        />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <UserManagement />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <Category />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <ProductAdd />
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <ProductEdit />
      </TabPanel>
    </Box>
  );
}
