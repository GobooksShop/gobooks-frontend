import React from 'react';
import { Container, Grid, Paper, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Box, Pagination } from '@mui/material';
import { styled } from '@mui/system';

const FilterContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#f3f4f6',
  padding: '16px',
  borderRadius: '8px',
  marginBottom: '16px',
});

const SearchButton = styled(Button)({
  marginLeft: '8px',
  marginRight: '8px',
});

const rows = [
  { idx: 0, email: 'testuser1@example.com', name: 'test1', contact: '01012345601', joinDate: '2024. 4. 19.', orderCount: 11 },
  { idx: 1, email: 'testuser2@example.com', name: 'test2', contact: '01012345602', joinDate: '2024. 4. 19.', orderCount: 1 },
  { idx: 2, email: 'testuser3@example.com', name: 'test3', contact: '01012345603', joinDate: '2024. 4. 19.', orderCount: 0 },
  // 더 많은 데이터 추가 가능
];

const UserManagement = () => {
  return (
    <Container maxWidth="lg" className="tw-mt-[5%] tw-mb-[5%]">
      <Typography variant="h4" gutterBottom align="center" className="tw-mb-[3px]">
        회원 관리
      </Typography>
      <Grid container spacing={3} justifyContent="center" className="tw-mt-[10%] tw-mb-[3%]">
        <Grid item xs={12} sm={6} md={3} className="tw-min-w-[200px] tw-min-h-[120px]">
          <Paper className="tw-p-4 tw-text-center tw-bg-gray-100">
            <Typography variant="h6">전체</Typography>
            <Typography variant="h4">100</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="tw-min-w-[200px] tw-min-h-[120px]">
          <Paper className="tw-p-4 tw-text-center tw-bg-gray-100">
            <Typography variant="h6">일시정지</Typography>
            <Typography variant="h4">10</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="tw-min-w-[200px] tw-min-h-[120px]">
          <Paper className="tw-p-4 tw-text-center tw-bg-gray-100">
            <Typography variant="h6">휴면</Typography>
            <Typography variant="h4">10</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className="tw-min-w-[200px] tw-min-h-[120px]">
          <Paper className="tw-p-4 tw-text-center tw-bg-gray-100">
            <Typography variant="h6">탈퇴</Typography>
            <Typography variant="h4">5</Typography>
          </Paper>
        </Grid>
      </Grid>
      <FilterContainer>
        <Select defaultValue="" displayEmpty>
          <MenuItem value="">
            <em>연락처</em>
          </MenuItem>
          <MenuItem value="email">이메일</MenuItem>
          <MenuItem value="name">이름</MenuItem>
          <MenuItem value="contact">연락처</MenuItem>
        </Select>
        <TextField className="tw-ml-4" placeholder="검색어를 입력하세요" variant="outlined" size="small" />
        <SearchButton variant="contained" color="primary">
          검색
        </SearchButton>
        <Button variant="outlined" color="primary">
          검색 초기화
        </Button>
      </FilterContainer>
      <Box className="tw-my-[3%] tw-flex tw-justify-end">
        <Select value={30} onChange={() => {}} className="tw-w-20">
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </Box>
      <TableContainer component={Paper} className="tw-mt-4">
        <Table className="tw-min-w-full" aria-label="simple table">
          <TableHead className="tw-bg-gray-200">
            <TableRow>
              <TableCell>idx</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>연락처</TableCell>
              <TableCell>가입일</TableCell>
              <TableCell>주문 수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.idx}>
                <TableCell>{row.idx}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.joinDate}</TableCell>
                <TableCell>{row.orderCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="tw-flex tw-justify-center tw-mt-4">
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Box>
    </Container>
  );
};

export default UserManagement;