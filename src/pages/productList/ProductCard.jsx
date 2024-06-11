import React, { useEffect, useState } from 'react';
import './ProductCard.css';
import noImage from "./images/noimage.jpg"; // 기본 이미지 추가


function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(noImage); // 기본 이미지로 초기화

  useEffect(() => {
    const img = new Image();
    img.src = `./images/${product.id}.jpg`; // 이미지 경로 설정
    img.onload = () => {
      setIsLoading(false);
      setImageUrl(img.src); // 이미지 로딩 성공 시 URL 업데이트
    };
    img.onerror = () => {
      setIsLoading(false);
      // 이미지 로딩 실패 시 에러 처리 (선택 사항)
      console.error(`Failed to load image for product ${product.id}`);
    };
  }, [product.id]); // product.id가 변경될 때마다 useEffect 실행

  return (
      <div className="product-card">
        {isLoading ? (
            <div className="image-placeholder">Loading...</div> // 로딩 중 placeholder
        ) : (
            <img src={imageUrl} alt={product.name} /> // 로딩 완료 후 이미지 표시
        )}
        <h3>{product.name}</h3>
        <p className="product-author-publisher">
          {product.author} / {product.publisher}
        </p> {/* 작가/출판사 정보 추가 */}
        <p className="product-price">
          {product.price.toLocaleString()}원</p>
        {/* 숫자 3자리마다 쉼표 추가 */}
      </div>
  );
}

export default ProductCard;