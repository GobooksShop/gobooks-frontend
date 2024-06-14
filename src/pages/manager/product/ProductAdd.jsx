import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
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
    categoryId: '', // Add categoryId to product details
  });
  const [selectedCategories, setSelectedCategories] = useState({
    level1: '',
    level2: '',
    level3: '',
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

  const handleCategoryChange = (level, value) => {
    const updatedSelectedCategories = { ...selectedCategories, [level]: value };
    setSelectedCategories(updatedSelectedCategories);

    if (level === 'level1') {
      setSelectedCategories((prev) => ({ ...prev, level2: '', level3: '' }));
    } else if (level === 'level2') {
      setSelectedCategories((prev) => ({ ...prev, level3: '' }));
    }

    if (
      level === 'level3' ||
      (level === 'level2' &&
        !categories.find((cat) => cat.id === value)?.children?.length)
    ) {
      setProductDetails((prev) => ({ ...prev, categoryId: value }));
    } else {
      setProductDetails((prev) => ({ ...prev, categoryId: '' }));
    }
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
      categoryId: '', // Reset categoryId
    });
    setSelectedCategories({
      level1: '',
      level2: '',
      level3: '',
    });
  };

  const getCategoryOptions = (parentCategoryId) => {
    if (!parentCategoryId) {
      return categories;
    }
    const parentCategory = categories.find(
      (cat) => cat.id === parentCategoryId,
    );
    return parentCategory ? parentCategory.children : [];
  };

  return (
    <div className="tw-container tw-mx-auto tw-p-4 tw-pt-8 tw-max-w-4xl">
      <form onSubmit={handleSubmit} className="tw-space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category Level 1</InputLabel>
              <Select
                value={selectedCategories.level1}
                onChange={(e) => handleCategoryChange('level1', e.target.value)}
                label="Category Level 1"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {selectedCategories.level1 && (
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Category Level 2</InputLabel>
                <Select
                  value={selectedCategories.level2}
                  onChange={(e) =>
                    handleCategoryChange('level2', e.target.value)
                  }
                  label="Category Level 2"
                >
                  {getCategoryOptions(selectedCategories.level1).map(
                    (category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
            </Grid>
          )}
          {selectedCategories.level2 &&
            getCategoryOptions(selectedCategories.level2).length > 0 && (
              <Grid item xs={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Category Level 3</InputLabel>
                  <Select
                    value={selectedCategories.level3}
                    onChange={(e) =>
                      handleCategoryChange('level3', e.target.value)
                    }
                    label="Category Level 3"
                  >
                    consol.log(level2);
                    {getCategoryOptions(selectedCategories.level2).map(
                      (category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ),
                    )}
                  </Select>
                </FormControl>
              </Grid>
            )}
        </Grid>
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
          value={productDetails.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Author"
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
          label="Content"
          name="content"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={productDetails.content}
          onChange={handleInputChange}
        />
        <TextField
          label="Fixed Price"
          name="fixedPrice"
          variant="outlined"
          type="number"
          fullWidth
          value={productDetails.fixedPrice}
          onChange={handleInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Publication Year"
            views={['year']}
            value={productDetails.publicationYear}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <TextField
          label="Status"
          select
          name="status"
          value={productDetails.status}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        >
          <MenuItem value="AVAILABLE">Available</MenuItem>
          <MenuItem value="UNAVAILABLE">Unavailable</MenuItem>
        </TextField>
        <TextField
          label="Stock Quantity"
          name="stockQuantity"
          variant="outlined"
          type="number"
          fullWidth
          value={productDetails.stockQuantity}
          onChange={handleInputChange}
        />
        <TextField
          label="Picture URL"
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
          Register Product
        </Button>
      </form>
    </div>
  );
};

export default ProductAdd;
