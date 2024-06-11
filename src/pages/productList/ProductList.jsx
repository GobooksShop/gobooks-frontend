import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard'; // 상품 카드 컴포넌트 (별도로 구현해야 합니다)
import Pagination from './Pagination'; // 페이징 컴포넌트 (별도로 구현해야 합니다)
import Sort from './Sort';
import './ProductList.css';

function ProductList() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 페이지 번호
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수
  const [sortBy, setSortBy] = useState('createdAt,desc'); // sortBy 상태 추가

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const page = searchParams.get('page') || 0; // 페이지 번호
  //       const size = searchParams.get('size') || 10; // 페이지 크기
  //       const sortBy = searchParams.get('sortBy') || 'createdAt,desc'; // 정렬 기준
  //
  //       const response = await axios.get(
  //           `/api/categories/${categoryId}/products?page=${page}&size=${size}&sortBy=${sortBy}`
  //       );
  //       setProducts(response.data.content);
  //       setCurrentPage(response.data.number); // number는 현재 페이지 번호 (0부터 시작)
  //       setTotalPages(response.data.totalPages);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //       // 에러 처리 로직 추가
  //     }
  //   };
  //
  //   fetchProducts();
  // }, [categoryId, searchParams]);

  useEffect(() => {
    // 예시 상품 데이터
    const exampleProducts = [
      { id: 1, name: '상품1', price: 10000, imageUrl: '/images/1.jpg', author: '저자1', publisher: '출판사1' },
      { id: 2, name: '상품2', price: 20000, imageUrl: '/images/2.jpg', author: '저자2', publisher: '출판사2' },
      { id: 3, name: '상품3', price: 30000, imageUrl: '/images/3.jpg', author: '저자3', publisher: '출판사3' },
      { id: 4, name: '상품4', price: 40000, imageUrl: '/images/3.jpg', author: '저자4', publisher: '출판사4' },
      { id: 5, name: '상품5', price: 50000, imageUrl: '/images/3.jpg', author: '저자5', publisher: '출판사5' },
      { id: 6, name: '상품6', price: 60000, imageUrl: '/images/3.jpg', author: '저자6', publisher: '출판사6' },
    ];

    // 정렬 로직 추가
    const sortedProducts = [...exampleProducts].sort((a, b) => {
      const [sortByKey, sortDirection] = sortBy.split(',');

      if (sortByKey === 'createdAt') {
        // 최신순 정렬 (createdAt 내림차순)
        return sortDirection === 'desc' ? b.id - a.id : a.id - b.id; // id를 createdAt 대신 사용
      } else if (sortByKey === 'price') {
        // 가격순 정렬
        return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0; // 기본 정렬 (변경 없음)
    });

    const page = parseInt(searchParams.get('page')) || 0; // 페이지 번호 가져오기 (기본값 0)
    const pageSize = 4; // 페이지당 상품 개수 (원하는 값으로 설정)

    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const productsToShow = exampleProducts.slice(startIndex, endIndex);

    setProducts(productsToShow);
    setTotalPages(Math.ceil(exampleProducts.length / pageSize)); // 총 페이지 수 계산
  }, [categoryId, searchParams, sortBy]); // categoryId가 변경될 때마다 예시 데이터 다시 설정


  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setSearchParams({ page: 0, sort: newSortBy }); // 정렬 변경 시 페이지 초기화
  };

  return (
      <div className="product-container">
        <h1>{categoryId} 상품 목록</h1>
        <div className="top-bar">
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
          />
          <Sort onSortChange={handleSortChange} />
        </div>
        <div className="product-list">
          {products.map((product) => (
              <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
      </div>
  );
}

export default ProductList;
