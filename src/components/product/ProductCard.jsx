import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Skeleton,
  Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'; // Link 컴포넌트 import

import noImage from '../../pages/productList/images/noimage.jpg'; // 기본 이미지 추가

function ProductCard({product}) {
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
      <Link to={`/product/detail/${product.id}`}>
        <Card
            sx={{
              borderRadius: '8px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0px 0px 8px #ABA5F3',
              },
              height: '100%'
            }}
        >
          <div className="tw-relative tw-pb-[142%]">
            {' '}
            {/* 책 표지 비율 유지 */}
            {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height="100%"/>
            ) : (
                <CardMedia
                    component="img"
                    sx={{
                      height: 250,
                      objectFit: 'cover',
                    }}
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
            <Typography variant="body2" color="textSecondary"
                        className="tw-mb-2">
              {product.author || 'Unknown Author'} /{' '}
              {product.publisher || 'Unknown Publisher'}
            </Typography>
            <Typography variant="h6" component="div" className="tw-font-bold">
              {formattedPrice}원
            </Typography>
          </CardContent>
        </Card>
      </Link>
  );
}

export default ProductCard;
