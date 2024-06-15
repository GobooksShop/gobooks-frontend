import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useCategoryStore from '../../../store/useCategoryStore';
import useProductStore from '../../../store/useProductStore'; 

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategoryStore();
  const { updateProduct, fetchProductDetails } = useProductStore();

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
    fetchProductDetails(id).then((data) => {
      setProductDetails({
        ...data,
        publicationYear: data.publicationYear ? AdapterDayjs(data.publicationYear) : null,
      });
    });
  }, [id, fetchCategories, fetchProductDetails]);

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
    await updateProduct(id, {
      ...productDetails,
      fixedPrice: parseInt(productDetails.fixedPrice),
      stockQuantity: parseInt(productDetails.stockQuantity),
      publicationYear: productDetails.publicationYear
        ? productDetails.publicationYear.toISOString()
        : null,
    });
    navigate(`/product/detail/${id}`); // Redirect to the product detail page after updating
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
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit} className="tw-space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={productDetails.categoryIds}
                  onChange={handleCategoryChange}
                  label="Categories"
                  renderValue={(selected) => selected.join(', ')}
                >
                  {categories.flatMap((category) =>
                    renderCategoryOptions(category),
                  )}
                </Select>
              </FormControl>
              <Typography variant="body1" style={{ marginLeft: '10px' }}>
                Selected: {productDetails.categoryIds.join(', ')}
              </Typography>
            </Box>
          </Grid>
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
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default ProductEdit;