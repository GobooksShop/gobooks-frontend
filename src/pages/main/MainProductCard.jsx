import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from '@mui/material';
import React from 'react';

import noImage from '../../pages/productList/images/noimage.jpg';
import { useNavigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_BASE_URL;

function MainProductCard({ book }) {
  const navigate = useNavigate();
  const imageUrl = book.pictureUrl ? `${baseURL}/api/images/${book.pictureUrl}` : noImage;

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
