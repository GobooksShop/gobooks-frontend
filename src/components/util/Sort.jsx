import * as React from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function Sort({ onSortChange, value }) {
  const [sortBy, setSortBy] = React.useState('createdAt,desc');

  const handleChange = (event) => {
    setSortBy(event.target.value);
    onSortChange(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sortBy}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="createdAt,desc">최신순</MenuItem>
          <MenuItem value="fixedPrice,asc">낮은 가격순</MenuItem>
          <MenuItem value="fixedPrice,desc">높은 가격순</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Sort;
