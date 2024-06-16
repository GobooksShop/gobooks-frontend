import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useCategoryStore from '../../../store/useCategoryStore';
import useProductStore from '../../../store/useProductStore';

const ProductAdd = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const { addProduct } = useProductStore();
  const [productDetails, setProductDetails] = useState({
    title: '',
    author: '',
    isbn: '',
    content: '',
    fixedPrice: '',
    publicationYear: null,
    status: '',
    stockQuantity: '',
    pictureUrl: '',
    categoryIds: [],
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (value) => {
    setProductDetails((prev) => ({ ...prev, publicationYear: value }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setProductDetails((prev) => ({ ...prev, categoryIds: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addProduct({
      ...productDetails,
      fixedPrice: parseInt(productDetails.fixedPrice),
      stockQuantity: parseInt(productDetails.stockQuantity),
      publicationYear: productDetails.publicationYear
        ? productDetails.publicationYear.toISOString()
        : null,
    });

    setProductDetails({
      title: '',
      author: '',
      isbn: '',
      content: '',
      fixedPrice: '',
      publicationYear: null,
      status: '',
      stockQuantity: '',
      pictureUrl: '',
      categoryIds: [],
    });
  };

  const renderCategoryOptions = (category, level = 0) => {
    let options = [
      <MenuItem
        key={category.id}
        value={category.id.toString()}
        style={{ paddingLeft: level * 20 }}
      >
        {category.name}
      </MenuItem>,
    ];

    if (category.children) {
      category.children.forEach((child) => {
        options = options.concat(renderCategoryOptions(child, level + 1));
      });
    }

    return options;
  };

  return (
    <div className="tw-container tw-mx-auto tw-p-4 tw-pt-8 tw-max-w-4xl">
      <form onSubmit={handleSubmit} className="tw-space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <FormControl fullWidth variant="outlined">
                <InputLabel>카테고리</InputLabel>
                <Select
                  multiple
                  value={productDetails.categoryIds}
                  onChange={handleCategoryChange}
                  label="카테고리"
                  renderValue={(selected) => selected.join(', ')}
                >
                  {categories.flatMap((category) =>
                    renderCategoryOptions(category),
                  )}
                </Select>
              </FormControl>
              <Typography variant="body1" style={{ marginLeft: '10px' }}>
                선택됨: {productDetails.categoryIds.join(', ')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <TextField
          label="제목"
          name="title"
          variant="outlined"
          fullWidth
          value={productDetails.title}
          onChange={handleInputChange}
        />
        <TextField
          label="저자"
          name="author"
          variant="outlined"
          fullWidth
          value={productDetails.author}
          onChange={handleInputChange}
        />
        <TextField
          label="ISBN"
          name="isbn"
          variant="outlined"
          fullWidth
          value={productDetails.isbn}
          onChange={handleInputChange}
        />
        <TextField
          label="내용"
          name="content"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={productDetails.content}
          onChange={handleInputChange}
        />
        <TextField
          label="정가"
          name="fixedPrice"
          variant="outlined"
          type="number"
          fullWidth
          value={productDetails.fixedPrice}
          onChange={handleInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="출판 연도"
            views={['year']}
            value={productDetails.publicationYear}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <TextField
          label="상태"
          select
          name="status"
          value={productDetails.status}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="AVAILABLE">사용 가능</MenuItem>
          <MenuItem value="UNAVAILABLE">사용 불가</MenuItem>
        </TextField>
        <TextField
          label="재고 수량"
          name="stockQuantity"
          variant="outlined"
          type="number"
          fullWidth
          value={productDetails.stockQuantity}
          onChange={handleInputChange}
        />
        <TextField
          label="사진 URL"
          name="pictureUrl"
          variant="outlined"
          fullWidth
          value={productDetails.pictureUrl}
          onChange={handleInputChange}
        />
        {productDetails.pictureUrl && (
          <img
            src={productDetails.pictureUrl}
            alt="Product Preview"
            className="tw-mt-2 tw-rounded-lg tw-max-w-md"
          />
        )}
        <Button type="submit" variant="contained" color="primary">
          상품 등록
        </Button>
      </form>
    </div>
  );
};

export default ProductAdd;
