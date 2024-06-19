import {
  Box,
  Button, Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React, { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { addOrUpdateProduct } from '../../../api/product/productApi';
import useCategoryStore from '../../../store/useCategoryStore';

const ProductAdd = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const [productDetails, setProductDetails] = useState({
    title: '',
    author: '',
    isbn: '',
    content: '',
    fixedPrice: '',
    publicationYear: null,
    status: '',
    stockQuantity: '',
    pictureFile: null,
    categoryIds: [],
    discount: false,
  });
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setProductDetails((prev) => ({ ...prev, pictureFile: file }));
      setFileName(file.name);
    } else {
      alert('이미지 파일만 업로드 할 수 있습니다.');
    }
  };

  const handleDateChange = (value) => {
    setProductDetails((prev) => ({ ...prev, publicationYear: value }));
  };

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setProductDetails((prev) => ({ ...prev, categoryIds: value }));
  };

  const handleDiscountChange = (event) => {
    setProductDetails((prev) => ({ ...prev, discount: event.target.checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    const productData = {
      title: productDetails.title,
      author: productDetails.author,
      isbn: productDetails.isbn,
      content: productDetails.content,
      fixedPrice: productDetails.fixedPrice,
      publicationYear: productDetails.publicationYear
        ? productDetails.publicationYear.toISOString()
        : '',
      status: productDetails.status,
      stockQuantity: productDetails.stockQuantity,
      categoryIds: productDetails.categoryIds,
      discount: productDetails.discount,
    };

    formData.append(
      'product',
      new Blob([JSON.stringify(productData)], { type: 'application/json' }),
    );
    if (productDetails.pictureFile) {
      formData.append('pictureFile', productDetails.pictureFile);
    }

    try {
      const response = await addOrUpdateProduct(formData);
      console.log('Product added successfully:', response.data);

      alert('상품이 등록되었습니다.');

      setProductDetails({
        title: '',
        author: '',
        isbn: '',
        content: '',
        fixedPrice: '',
        publicationYear: null,
        status: '',
        stockQuantity: '',
        pictureFile: null,
        categoryIds: [],
        discount: false,
      });
      setFileName('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
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
    <div className="tw-container tw-mx-auto tw-p-4 tw-pt-8 tw-max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="tw-space-y-4"
        encType="multipart/form-data"
      >
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
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box component="div" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginLeft: 10 }}>
              {productDetails.categoryIds.map((categoryId) => {
                const categoryName = categories.find((cat) => cat.id === categoryId)?.name || categoryId;
                return (
                    <Chip
                        key={categoryId}
                        label={categoryName}
                        onDelete={() => handleCategoryChange({ target: { value: productDetails.categoryIds.filter(id => id !== categoryId) } })}
                    />
                );
              })}
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
          label="설명"
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
            label="출판 일자"
            value={productDetails.publicationYear}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <TextField
          label="판매 가능 여부"
          select
          name="status"
          value={productDetails.status}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="AVAILABLE">판매 가능</MenuItem>
          <MenuItem value="UNAVAILABLE">판매 불가</MenuItem>
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
        <FormControlLabel
          control={
            <Checkbox
              checked={productDetails.discount}
              onChange={handleDiscountChange}
              name="discount"
              color="primary"
            />
          }
          label="할인 여부"
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px dashed gray"
          borderRadius="4px"
          padding="16px"
          marginBottom="20px"
          position="relative"
        >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="contained-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="contained-button-file" style={{ width: '100%' }}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height={150}
            >
              <IconButton component="span">
                <AddPhotoAlternateIcon fontSize="large" />
              </IconButton>
              <Typography variant="body1">{fileName || '사진 추가'}</Typography>
            </Box>
          </label>
        </Box>
        {productDetails.pictureFile && (
          <img
            src={URL.createObjectURL(productDetails.pictureFile)}
            alt="사진 미리보기"
            className="tw-mt-2 tw-rounded-lg tw-max-w-md"
            style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }}
          />
        )}
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ px: 4, py: 1 }}
          >
            상품 등록
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ProductAdd;
