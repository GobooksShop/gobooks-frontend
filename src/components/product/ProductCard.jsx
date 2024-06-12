import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Skeleton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import noImage from '../../pages/productList/images/noimage.jpg'; // 기본 이미지 추가

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

  const formattedPrice =
    product.fixedPrice !== undefined
      ? product.fixedPrice.toLocaleString()
      : 'N/A';
  return (
    <Card className="product-card tw-relative tw-rounded-lg tw-overflow-hidden tw-shadow-md hover:tw-shadow-lg tw-transition-shadow duration-200 tw-ease-in-out tw-bg-white">
      <div className="tw-relative tw-pb-[142%]">
        {' '}
        {/* 책 표지 비율 유지 */}
        {isLoading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" />
        ) : (
          <CardMedia
            component="img"
            className="tw-absolute tw-top-0 tw-left-0 tw-object-cover tw-h-full tw-w-full"
            image={imageUrl}
            alt={product.title || 'Product'}
          />
        )}
      </div>
      <CardContent className="tw-p-4">
        <Typography
          variant="h6"
          component="div"
          className="tw-mb-2 tw-line-clamp-2"
        >
          {product.title || 'Unnamed Product'}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="tw-mb-2">
          {product.author || 'Unknown Author'} /{' '}
          {product.publisher || 'Unknown Publisher'}
        </Typography>
        <Typography variant="h6" component="div" className="tw-font-bold">
          {formattedPrice}원
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
