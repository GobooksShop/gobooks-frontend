import React, {useEffect, useState} from 'react';
import Carousel from 'react-material-ui-carousel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton
} from '@mui/material';
import { PageContainer } from '../../components/PageContainer';
import FloatingButton, { FoatingButton } from '../../components/util/FloatingButton';

function BookCarousel({ books }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : 0));
  };

  return (
      <Box sx={{ position: 'relative', padding: '0 60px' }}>
        <Grid container spacing={2}>
          {books
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((book) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Card sx={{
                  borderRadius: '8px',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0px 0px 8px #ABA5F3',
                  },
                  height: '100%'
                }}>
                  <CardMedia
                      component="img"
                      image={book.coverImage}
                      alt={book.title}
                      sx={{ height: 250 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {book.author}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          ))}
        </Grid>
        <IconButton onClick={handlePrevPage}
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
        <IconButton onClick={handleNextPage}
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

function AdBanner({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // 5초마다 슬라이드 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [images.length]);

  return (
      <Carousel
          onChange={(event, newValue) => setCurrentSlide(newValue)}
          sx={{ width: '100%', mt:5, mb: 5 }}
          NextIcon={<ArrowForwardIcon />}
          PrevIcon={<ArrowBackIcon />}
      >
        {images.map((image, index) => (
            <Box key={index} sx={{ position: 'relative'}}>
              <img src={image} alt={`Ad ${index + 1}`} style={{ width: '100%', borderRadius: 10 }} />
              <Typography
                  variant="body2"
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
              >
                {index + 1} / {images.length}
              </Typography>
            </Box>
        ))}
      </Carousel>
  );
}

function Main() {
  //mock
  const adImages = [
    'https://picsum.photos/id/1015/1200/400', // 예시 이미지
    'https://picsum.photos/id/1016/1200/400',
    'https://picsum.photos/id/1018/1200/400',
    'https://picsum.photos/id/1019/1200/400',
    'https://picsum.photos/id/1020/1200/400',
  ];

  const [steadySellers] = useState([
    {
      id: 1,
      title: '불편한 편의점',
      author: '김호연',
      coverImage: '../productList/images/1.jpg'
    },
    {
      id: 2,
      title: '달러구트 꿈 백화점',
      author: '이미예',
      coverImage: '../productList/images/2.jpg'
    },
    {
      id: 3,
      title: '아몬드',
      author: '손원평',
      coverImage: '../productList/images/3.jpg'
    },
    {
      id: 4,
      title: '미움받을 용기',
      author: '기시미 이치로',
      coverImage: '../productList/images/noimage.jpg'
    },
  ]);
  const [newBooks] = useState([
    {
      id: 5,
      title: '데이터 리터러시',
      author: '강양석',
      coverImage: 'https://image.aladin.co.kr/product/29882/55/cover500/k172935378_1.jpg'
    },
    {
      id: 6,
      title: '챗GPT 질문법',
      author: '이시한',
      coverImage: 'https://image.aladin.co.kr/product/29906/28/cover500/k822935950_1.jpg'
    },
    {
      id: 7,
      title: '세이노의 가르침',
      author: '세이노',
      coverImage: 'https://image.aladin.co.kr/product/29669/86/cover500/k232931734_1.jpg'
    },
    {
      id: 8,
      title: '기분을 관리하면 인생이 관리된다',
      author: '박우진',
      coverImage: 'https://image.aladin.co.kr/product/29721/98/cover500/k842932269_1.jpg'
    },
  ]);
  const [bestSellers] = useState([
    { id: 9, title: '사장학개론', author: '김승호', coverImage: 'https://image.aladin.co.kr/product/27881/2/cover500/k772835055_1.jpg' },
    { id: 10, title: '역행자', author: '자청', coverImage: 'https://image.aladin.co.kr/product/25892/92/cover500/k162732479_1.jpg' },
    { id: 11, title: '세상의 마지막 기차역', author: '무라세 다케시', coverImage: 'https://image.aladin.co.kr/product/27886/90/cover500/k482835208_1.jpg' },
    { id: 12, title: '원씽', author: '게리 켈러, 제이 파파산', coverImage: 'https://image.aladin.co.kr/product/4975/95/cover500/8932574454_1.jpg' },
  ]);
  const [todaysBook] = useState([
    { id: 13, title: '어서 오세요, 휴남동 서점입니다', author: '황보름', coverImage: 'https://image.aladin.co.kr/product/24717/88/cover500/k732630374_1.jpg' },
  ]);

  return (
      <PageContainer>
        <AdBanner images={adImages} />
        <div className="container mx-auto py-10 ">
        <section className="my-12">
          <h2
              className="text-center font-bold"
              style={{
                fontSize: '2.5rem',
                marginBottom: '1.5rem',
                marginTop: '5rem',
                marginLeft: '3.5rem'
              }}
          > 상반기 베스트셀러
          </h2>
          <BookCarousel books={bestSellers} />
        </section>

        <section className="mb-10">
          <h2
              className="text-center font-bold"
              style={{
                fontSize: '2.5rem',
                marginBottom: '1.5rem',
                marginTop: '4.5rem',
                marginLeft: '3.5rem'
              }}
          > 화제의 신상</h2>
          <BookCarousel books={newBooks}/>
        </section>

        <section className="mb-10">
          <h2
              className="text-center font-bold"
              style={{
                fontSize: '2.5rem',
                marginBottom: '1.5rem',
                marginTop: '4.5rem',
                marginLeft: '3.5rem'
              }}
          > 오늘의 책</h2>
          <div className="flex flex-col md:flex-row gap-4"
          style={{
            marginLeft: '50px'
          }}>
            <div className="md:w-1/2">
              <Card key={todaysBook[0].id} sx={{width: 400, margin: 1}}>
                <CardMedia
                    component="img"
                    height="500"
                    image={todaysBook[0].coverImage}
                    alt={todaysBook[0].title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {todaysBook[0].title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {todaysBook[0].author}
                  </Typography>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-1/2">
              {/* 오늘의 책 설명 */}
            </div>
          </div>
        </section>

        <section>
          <h2
              className="text-center font-bold"
              style={{
                fontSize: '2.5rem',
                marginBottom: '1.5rem',
                marginTop: '4.5rem',
                marginLeft: '3.5rem'
              }}
          > 스테디셀러</h2>
          <BookCarousel books={steadySellers}/>
        </section>
      </div>
        <FloatingButton />
      </PageContainer>
  );
}

export default Main;
