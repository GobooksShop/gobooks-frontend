import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Carousel from 'react-material-ui-carousel';
import FloatingButton from '../../components/util/FloatingButton';
import MainProductCard from './MainProductCard';
import { PageContainer } from '../../components/PageContainer';
import { fetchMainProducts } from '../../api/product/productApi';

const itemsPerPage = 4;

function AdBanner({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Carousel
      onChange={(event, newValue) => setCurrentSlide(newValue)}
      sx={{ width: '100%', mt: 5, mb: 5 }}
      NextIcon={<ArrowForwardIcon />}
      PrevIcon={<ArrowBackIcon />}
    >
      {images.map((image, index) => (
        <Box key={index} sx={{ position: 'relative' }}>
          <img
            src={image}
            alt={`Ad ${index + 1}`}
            style={{ width: '100%', borderRadius: 10 }}
          />
        </Box>
      ))}
    </Carousel>
  );
}

function BookCarousel({ books }) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!books || books.length === 0) {
    return null; // or return a placeholder, or loading indicator
  }

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage > 0 ? prevPage - 1 : totalPages - 1,
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages - 1 ? prevPage + 1 : 0,
    );
  };

  return (
    <Box sx={{ position: 'relative', padding: '0 60px' }}>
      <Grid container spacing={2}>
        {books
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <MainProductCard book={book} />
            </Grid>
          ))}
      </Grid>
      <IconButton
        onClick={handlePrevPage}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          borderRadius: '50%',
          '&:hover': {
            color: '#ABA5F3',
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        onClick={handleNextPage}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
          borderRadius: '50%',
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}

function Main() {
  const adImages = [
    'https://i.imgur.com/y4j0R2X.jpg',
    'https://i.imgur.com/YNrOP7z.jpg',
    'https://i.imgur.com/BjZObZG.jpg',
    'https://i.imgur.com/0bSoyfO.jpg',
    'https://i.imgur.com/IDwQTwM.jpg',
    'https://i.imgur.com/yX6xL0R.jpeg',
  ];

  const [products, setProducts] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchMainProducts();
        console.log('Fetched Products:', response.data); // 데이터 확인을 위한 콘솔 로그
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <CircularProgress />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AdBanner images={adImages} />
      <div className="tw-container tw-mx-auto tw-py-10 ">
        <section className="tw-my-12">
          <h2
            className="tw-text-center tw-font-bold"
            style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              marginTop: '5rem',
              marginLeft: '3.5rem',
            }}
          >
            상반기 베스트셀러
          </h2>
          {products[1] && products[1].length > 0 ? (
            <BookCarousel books={products[1]} />
          ) : (
            <Typography>No data available for 상반기 베스트셀러.</Typography>
          )}
        </section>

        <section className="tw-mb-10">
          <h2
            className="tw-text-center tw-font-bold"
            style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              marginTop: '4.5rem',
              marginLeft: '3.5rem',
            }}
          >
            화제의 신상
          </h2>
          {products[2] && products[2].length > 0 ? (
            <BookCarousel books={products[2]} />
          ) : (
            <Typography>No data available for 화제의 신상.</Typography>
          )}
        </section>

        <section className="tw-mb-10">
          <h2
            className="tw-text-center tw-font-bold"
            style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              marginTop: '4.5rem',
              marginLeft: '3.5rem',
            }}
          >
            오늘의 책
          </h2>
          {products[3] && products[3].length > 0 ? (
            <BookCarousel books={products[3]} />
          ) : (
            <Typography>No data available for 오늘의 책.</Typography>
          )}
        </section>

        <section>
          <h2
            className="tw-text-center tw-font-bold"
            style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              marginTop: '4.5rem',
              marginLeft: '3.5rem',
            }}
          >
            스테디셀러
          </h2>
          {products[4] && products[4].length > 0 ? (
            <BookCarousel books={products[4]} />
          ) : (
            <Typography>No data available for 스테디셀러.</Typography>
          )}
        </section>
      </div>
      <FloatingButton />
    </PageContainer>
  );
}

export default Main;
