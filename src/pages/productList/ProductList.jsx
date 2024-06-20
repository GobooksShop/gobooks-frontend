import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HomeIcon from '@mui/icons-material/Home';
import ProductCard from '../../components/product/ProductCard';
import Sort from '../../components/util/Sort';
import axios from 'axios';
import useCategoryStore from '../../store/useCategoryStore';
const baseURL = process.env.REACT_APP_API_BASE_URL;

function ProductList() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('created_at,desc');
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories, fetchCategories]);

  const findCategoryById = (categories, id) => {
    for (let cat of categories) {
      if (cat.id === id) return cat;
      if (cat.children) {
        let found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const category = findCategoryById(categories, Number(categoryId));
  const categoryName = category ? category.name : '';
  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const page = parseInt(searchParams.get('page'), 10) || 0; // 페이지 번호 숫자로 변환
      const size = 12; // 페이지 크기 12로 고정
      const sort = searchParams.get('sort') || 'createdAt,desc'; // 정렬 기준

      const params = new URLSearchParams({
        page: page.toString(), // 페이지 번호를 문자열로 변환
        size: size.toString(),
        sort,
      });

      const response = await axios.get(
        `${baseURL}/api/products/category/${categoryId}/paged?${params}`,
      );

      setProducts(response.data.content);
      setCurrentPage(response.data.number);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('상품을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId, searchParams]);

  const handlePageChange = (event, newPage) => {
    setSearchParams({ page: newPage - 1, sort: sortBy });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setSearchParams({ page: 0, sort: newSortBy });
  };

  useEffect(() => {
    fetch(`${baseURL}/api/categories/${categoryId}/breadcrumbs`)
      .then((res) => res.json())
      .then((data) => setBreadcrumbs(data));
  }, [categoryId]);

  return (
    <Box className="tw-px-4 sm:tw-px-8 tw-py-10 sm:tw-py-16 tw-max-w-screen-xl tw-mx-auto">
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<ArrowForwardIosIcon fontSize="1rem" />}
        sx={{ marginBottom: '5px' }}
      >
        <Link underline="hover" color="inherit" to="/">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 1, fontSize: '1rem' }} />
            HOME
          </Box>
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <Link
            key={crumb.id}
            underline="hover"
            color={
              crumb.id === parseInt(categoryId, 10) ? 'primary' : 'inherit'
            } // 현재 카테고리 확인
            to={`/product/list/${crumb.id}`}
          >
            {crumb.name}
          </Link>
        ))}
      </Breadcrumbs>
      <Typography
        variant="h4"
        component="h1"
        className="tw-mb-6 tw-text-center tw-pt-4 tw-pb-10"
      >
        {categoryName}
      </Typography>
      <Box className="tw-flex tw-justify-between tw-items-center tw-mb-6 sm:tw-mb-10">
        <Stack spacing={2} direction="row">
          <Pagination
            className="tw-mt-6 sm:tw-mt-10"
            count={totalPages}
            page={currentPage + 1}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
        <Sort onSortChange={handleSortChange} />
      </Box>
      {loading ? (
        <Box className="tw-flex tw-justify-center tw-items-center tw-h-64">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      ) : products.length === 0 ? (
        <Typography variant="h6" className="tw-text-center">
          해당 카테고리의 상품이 없습니다.
        </Typography>
      ) : (
        <Box className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-3 sm:tw-gap-4 md:tw-gap-5 py-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      )}

      <Stack
        spacing={2}
        className="tw-py-10"
        justifyContent="center"
        alignItems="center"
      >
        <Pagination
          className="tw-mt-6 sm:tw-mt-10"
          count={totalPages}
          page={currentPage + 1}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  );
}

export default ProductList;
