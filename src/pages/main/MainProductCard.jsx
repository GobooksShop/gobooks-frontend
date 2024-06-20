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

const baseURL = process.env.REACT_APP_API_BASE_URL;

function MainProductCard({ book }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(noImage);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    if (book.pictureUrl) {
      const fullImageUrl = `${baseURL}/api/images/${book.pictureUrl}`;
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
              boxShadow: '0px 0px 8px #FF9800',
            },
            display: 'flex',
            flexDirection: 'column',
          }}
      >
        <CardActionArea onClick={handleClick}>
          {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height="100%" />
          ) : (
              <CardMedia
                  component="img"
                  sx={{
                    height: 'auto',
                    width: '100%',
                    objectFit: 'contain'
                  }}
                  image={imageUrl}
                  alt={book.title || 'Book'}
              />
          )}
        <CardContent sx={{ padding: 2 }}>
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
