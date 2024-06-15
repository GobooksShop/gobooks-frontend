import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useCategoryStore from '../../../store/useCategoryListStore'; // 수정 필요한 부분에 주의하세요 (예: useCategoryStore 경로)
import useProductStore from '../../../store/useProductStore'; // 상태 관리 스토어 경로 확인

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategoryStore();
  const { updateProduct, fetchProductDetails } = useProductyStore(); // 오타 수정 필요

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
    categoryId: ''
  });

<<<<<<< HEAD
  useEffect(() => {
    fetchCategories(); // 카테고리 정보 가져오기
    fetchProductDetails(id).then(data => { // 상품 상세 정보 가져오기
      setProductDetails(data);
    });
  }, [fetchCategories, fetchProductDetails, id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    setProductDetails(prev => ({ ...prev, categoryId: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProduct(id, productDetails);
    navigate('/product-list'); // 수정 후 상품 목록 페이지로 리디렉션
=======
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form data', values);
    setSubmitting(false);
>>>>>>> 5b88cc41b47a91cfbca23e503b2f1ab41f8d9642
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* 폼 필드 배치 */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              variant="outlined"
              value={productDetails.title}
              onChange={handleInputChange}
            />
          </Grid>
          {/* 추가 필드 구성 */}
          {/* DatePicker와 Select 컴포넌트는 기존 로직 참조 */}
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Update Product
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default ProductEdit;