import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import noImage from '../../pages/productList/images/noimage.jpg';
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://localhost:8080';

function MainProductCard({ book }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(noImage);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    if (book.pictureUrl) {
      const fullImageUrl = `${baseURL}/image/${book.pictureUrl}`;
      const img = new Image();
      img.src = fullImageUrl;
      img.onload = () => {
        setIsLoading(false);
        setImageUrl(img.src);
      };
      img.onerror = () => {
        setIsLoading(false);
        setImageUrl(noImage);
        console.error(`Failed to load image for book ${book.id}`);
      };
    } else {
      setIsLoading(false);
      setImageUrl(noImage);
    }
  }, [book.id, book.pictureUrl]);

  const handleClick = () => {
    navigate(`/product/detail/${book.id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: '8px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0px 0px 8px #ABA5F3',
        },
        height: '100%',
      }}
    >
      <CardActionArea onClick={handleClick}>
        <div className="tw-relative tw-pb-[90%]">
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
            <CardMedia
              component="img"
              sx={{ height: '100%' }}
              className="tw-absolute tw-top-0 tw-left-0 tw-object-contain tw-h-full tw-w-full"
              image={imageUrl}
              alt={book.title || 'Book'}
            />
          )}
        </div>
        <CardContent sx={{ padding: '8px' }}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontSize: '1rem' }}
          >
            {book.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            {book.author}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MainProductCard;
