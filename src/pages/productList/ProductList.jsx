import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Pagination from '../../components/util/Pagination';
import ProductCard from '../../components/product/ProductCard';
import Sort from '../../components/util/Sort';
import axios from 'axios';
import useCategoryStore from '../../store/useCategoryStore';

function ProductList() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('createdAt,desc');

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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const page = searchParams.get('page') || 0;
        const size = searchParams.get('size') || 2; // Adjusted size to 12 to show 4x3 format
        const sort = searchParams.get('sort') || 'createdAt,desc';

        const response = await axios.get(
          `http://localhost:8080/api/products/category/${categoryId}/paged?page=${page}&size=${size}&sort=${sort}`,
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

    fetchProducts();
  }, [categoryId, searchParams]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, sort: sortBy });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setSearchParams({ page: 0, sort: newSortBy });
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  if (products.length === 0)
    return (
      <Typography variant="h6">해당 카테고리의 상품이 없습니다.</Typography>
    );

  return (
    <Box className="tw-px-4 tw-mt-10">
      <Typography variant="h4" gutterBottom>
        {categoryName} 상품 목록
      </Typography>
      <Box className="tw-flex tw-justify-between tw-mb-4">
        <Sort onSortChange={handleSortChange} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
      <Box className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default ProductList;
