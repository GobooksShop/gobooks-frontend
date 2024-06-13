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
  const [sortBy, setSortBy] = useState('created_at,desc');

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
        const size = searchParams.get('size') || 12;
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


  return (
    <Box className="tw-px-4 sm:tw-px-8 tw-py-10 sm:tw-py-16 tw-max-w-screen-xl tw-mx-auto">
      <Typography
        variant="h4"
        component="h1"
        className="tw-mb-6 tw-text-center"
      >
        {categoryName}
      </Typography>
      <Box className="tw-flex tw-justify-between tw-items-center tw-mb-6 sm:tw-mb-10">
        <Pagination
          className="tw-mt-6 sm:tw-mt-10"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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

      <Pagination
        className="tw-mt-6 sm:tw-mt-10"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}

export default ProductList;
