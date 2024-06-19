import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box
} from '@mui/material';
import { PageContainer } from '../../components/PageContainer';

const OrderList = () => {
  const columns = [
    { id: 'col1', label: 'Column 1', minWidth: 100 },
    { id: 'col2', label: 'Column 2', minWidth: 150 },
    { id: 'col3', label: 'Column 3', minWidth: 300 },
    { id: 'col4', label: 'Column 4', minWidth: 150 },
    { id: 'col5', label: 'Column 5', minWidth: 100 },
    { id: 'col6', label: 'Column 6', minWidth: 100 }
  ];

  const rows = [
    {
      col1: 'Row 1 Data 1',
      col2: 'Row 1 Data 2',
      col3: 'Row 1 Data 3',
      col4: 'Row 1 Data 4',
      col5: 'Row 1 Data 5',
      col6: 'Row 1 Data 6',
    },
    // 추가 데이터
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <PageContainer>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="left"
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="left">
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </PageContainer>
  );
};

export default OrderList;