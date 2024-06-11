import './ProductCard.css';

import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import noImage from "./images/noimage.jpg"; // 기본 이미지 추가

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(noImage); // 기본 이미지로 초기화

  useEffect(() => {
    const img = new Image();
    const imagePath = product.imageUrl || `./images/${product.id}.jpg`;
    img.src = imagePath;
    img.onload = () => {
      setIsLoading(false);
      setImageUrl(img.src); // 이미지 로딩 성공 시 URL 업데이트
    };
    img.onerror = () => {
      setIsLoading(false);
      setImageUrl(noImage); // 로딩 실패 시 기본 이미지 사용
      console.error(`Failed to load image for product ${product.id}`);
    };
  }, [product.id, product.imageUrl]);

  const formattedPrice = product.price !== undefined ? product.price.toLocaleString() : 'N/A';

  return (
    <Card className="product-card tw-p-4 tw-rounded-lg tw-shadow-md">
      {isLoading ? (
        <div className="image-placeholder tw-flex tw-items-center tw-justify-center tw-h-32">
          <CircularProgress />
        </div>
      ) : (
        <CardMedia
          component="img"
          className="tw-mb-4 tw-shadow-sm tw-object-cover tw-h-32 tw-w-full"
          image={imageUrl}
          alt={product.name || 'Product'}
        />
      )}
      <CardContent>
        <Typography variant="h6" component="h3" className="tw-font-bold tw-mb-2">
          {product.name || 'Unnamed Product'}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="product-author-publisher tw-mb-3">
          {product.author || 'Unknown Author'} / {product.publisher || 'Unknown Publisher'}
        </Typography>
        <Typography variant="body1" component="p" className="product-price tw-font-bold">
          {formattedPrice}원
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
