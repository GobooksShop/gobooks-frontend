import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import review from '../../api/product/review';

import AddIcon from '@mui/icons-material/Add';
import { PageContainer } from '../../components/PageContainer';
import RemoveIcon from '@mui/icons-material/Remove';
import ReturnPolicy from '../../components/product/ReturnPolicy';
import useCartOrderStore from '../../store/useCartOrderStore';
import useProductStore from '../../store/useProductStore';
import useUserStore from '../../store/useUserStore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const [product, setProduct] = useState(null);
  const [productImgDetail, setProductImgDetail] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addCart, addOrder, resetMerchantUid } = useCartOrderStore((state) => state);
  const { fetchProductDetails, fetchProductImgDetail, deleteProduct } =
    useProductStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUserStore((state) => state);
  const [isSoldOut, setIsSoldOut] = useState(null);
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await review.getReviewsByProductId(id); // Use review to fetch reviews
        setReviews(reviewsData);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleAddReview = async (content, rating) => {
    try {
      await review.addReview(id, content, rating); // Use review to add a review
    } catch (error) {
      console.error('Failed to add review', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductDetails(id);
        const imgDetailData = await fetchProductImgDetail(id);

        setProduct(productData);
        setProductImgDetail(imgDetailData);

        if (productData) {
          const price = productData.discount
            ? productData.fixedPrice * 0.9
            : productData.fixedPrice;
          setTotalPrice(price * quantity);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, fetchProductDetails, fetchProductImgDetail, quantity]);

  useEffect(() => {
    if (product) {
      setIsSoldOut(product.stockQuantity <= 0);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addCart(product.id, quantity, product.fixedPrice, 'cart');
      setOpenDialog(true);
    }
  };

  const handleBuyNow = () => {
    resetMerchantUid();
    addOrder(product.id, quantity, product.fixedPrice, 'order');
    navigate(`/order`);
  };

  const handleQuantityChange = (newValue) => {
    setQuantity(Math.max(1, newValue)); // 최소값 1 유지
  };

  const [openDialog, setOpenDialog] = useState(false); // 모달 열림/닫힘 상태 관리

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleGoToCart = () => {
    setOpenDialog(false);
    navigate('/cart');
  };

  const handleDeleteProduct = async () => {
    if (window.confirm('!!상품을 정말 삭제하시겠습니까?')) {
      try {
        await deleteProduct(id);
        alert('상품이 삭제되었습니다.');
        navigate(from);
      } catch (error) {
        console.error('Failed to delete product', error);
        alert('상품 삭제에 실패했습니다.');
      }
    }
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formattedTomorrow = tomorrow.toLocaleDateString('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading the product.</p>;
  }
  if (!product) {
    return <p>No product found</p>;
  }

  const pictureUrl = `${baseURL}/api/images/${product.pictureUrl}`;

  return (
    <PageContainer>
      {/* 상품 카드 */}
      <Card className="tw-max-w-5xl tw-mx-auto tw-my-8 tw-p-5 tw-overflow-hidden">
        <Grid container className="tw-p-2" justifyContent="space-between">
          <Grid item className="tw-p-10">
            <div>
              {product.pictureUrl && (
                <img
                  src={pictureUrl}
                  alt={product.title}
                  style={{
                    width: 'auto',
                    height: '500px',
                    objectFit: 'contain',
                  }}
                  className="tw-w-full tw-h-auto object-contain tw-shadow-xl"
                />
              )}
            </div>
          </Grid>
          <Grid item className="tw-p-5" sx={{width:'50%'}}>
            <CardContent className="tw-space-y-6 tw-p-0">
              {user.role === 'ROLE_ADMIN' && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/admin/product/edit/${id}`)}
                    sx={{ mt: 2, mr: 2 }}
                  >
                    상품 수정
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteProduct}
                    sx={{ mt: 2 }}
                  >
                    상품 삭제
                  </Button>
                </Box>
              )}
              <Typography variant="h4" component="h1" fontWeight="bold">
                {product.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.author} · {product.publicationYear}
              </Typography>
              <Divider />
              {product.discount ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{mr: 1}}>
                      10%
                    </Typography>
                    <Typography variant="body1" sx={{mr: 1, textDecoration: 'line-through', color: 'gray'}}>
                      {product.fixedPrice.toLocaleString()}원
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {(product.fixedPrice * 0.9).toLocaleString()}원
                    </Typography>
                  </Box>
              ) : (
                  <Typography variant="h5" fontWeight="bold" align="right">
                  {product.fixedPrice.toLocaleString()}원
                  </Typography>
              )}

              <Divider/>
              <Stack spacing={1} direction="column">
                <Stack
                    spacing={1}
                    direction="row"
                    justifyContent="space-between"
                >
                  <Typography variant="body1" fontWeight="bold">
                    배송 안내
                  </Typography>
                  <Typography>내일 {formattedTomorrow} 도착 예정</Typography>
                </Stack>
                <Stack alignItems="flex-end">
                  <Typography variant="body2" color="textSecondary">
                    기본배송지 기준
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack spacing={1} direction="row" justifyContent="space-between">
                <Typography variant="body2">ISBN</Typography>
                <Typography variant="body2" color="textSecondary">
                  {product.isbn}
                </Typography>
              </Stack>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {/* 상품 추가 정보 */}
      <Box className="tw-max-w-5xl tw-mx-auto tw-p-4 tw-md:p-8 tw-mb-10">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              상품 정보
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" sx={{ lineHeight: 1.6 }} gutterBottom>
              {product.content}
            </Typography>
          </Grid>
          <Box className="tw-w-full tw-relative tw-flex tw-justify-center tw-items-center">
            {productImgDetail && (
              <img
                src={productImgDetail}
                alt="상품 정보 이미지"
                className="object-contain"
                style={{
                  width: '700px',
                  height: 'auto',
                  marginBottom: '1rem',
                  paddingTop: '50px',
                  paddingLeft: '50px',
                  paddingRight: '50px',
                }}
              />
            )}
          </Box>
        </Grid>
      </Box>

      {/* 교환/환불 정책 */}
      <Box className="tw-max-w-5xl tw-mx-auto tw-p-4 tw-md:p-8">
        <ReturnPolicy />
      </Box>

      {/* 하단 바 */}
      <AppBar
        position="fixed"
        color="default"
        sx={{ top: 'auto', bottom: 0, backgroundColor: 'white' }}
      >
        <Toolbar sx={{ width: '100%' }}>
          {/* 총 상품 금액 */}
          <Typography
            variant="body2"
            sx={{
              flex: 1,
              minWidth: 140,
              textAlign: 'right',
              marginRight: 8,
            }}
          >
            총 상품 금액:{' '}
            <Typography
              component="span"
              variant="h6"
              fontWeight="bold"
              sx={{ color: 'primary.main' }}
            >
              {totalPrice.toLocaleString()}원
            </Typography>
          </Typography>

          {/* 구매 권수 TextField */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <ButtonGroup
              variant="outlined"
              size="small"
              sx={{ border: 'none', align: 'center' }}
            >
              <IconButton
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                sx={{
                  borderRadius: '50%',
                  color: 'inherit',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.main', // hover 시 아이콘 색상 변경
                  },
                }}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                value={quantity}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                inputProps={{
                  min: 1,
                  style: { textAlign: 'center', width: '30px' },
                }}
                sx={{ border: 'none', '& fieldset': { border: 'none' } }}
              />
              <IconButton
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                sx={{
                  borderRadius: '50%',
                  color: 'inherit',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.main',
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            </ButtonGroup>
          </Box>
          {/* 장바구니 버튼 */}
          <Box
            sx={{ display: 'flex', justifyContent: 'left', flex: 1, gap: 1 }}
          >
            <Button
              variant="outlined"
              onClick={handleAddToCart}
              sx={{ px: 4 }}
              disabled={isSoldOut}
            >
              {isSoldOut ? '품절' : '장바구니'}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBuyNow}
              sx={{ px: 4 }}
              disabled={isSoldOut}
            >
              바로구매
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 버튼 클릭 시 다이얼로그 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle></DialogTitle>
        <DialogContent className="tw-mx-6 tw-my-4">
          <Typography variant="body1" align="center">
            <Typography component="span" variant="body1" fontWeight="bold">
              {product?.title}
            </Typography>{' '}
            {quantity}권이
            <br />
            장바구니에 추가되었습니다.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: 'center', marginBottom: 2, gap: 1 }}
        >
          <Button variant="outlined" onClick={handleCloseDialog}>
            계속 쇼핑
          </Button>
          <Button variant="contained" onClick={handleGoToCart}>
            장바구니로 이동
          </Button>
        </DialogActions>
      </Dialog>
      <Box>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            상품 리뷰
          </Typography>
          {reviews.length > 0 ? (
              reviews.map((review) => (
                  <Box key={review.id} mb={2}>
                    <Typography variant="body1">{review.content}</Typography>
                    <Typography variant="body2">Rating: {review.rating}</Typography>
                    {/* Display other review details as needed */}
                  </Box>
              ))
          ) : (
              <Typography variant="body2">리뷰가 없습니다.</Typography>
          )}
        </Box>

        {/* Add a form or UI to allow adding a review */}
        {/* Example form to add a review */}
        {/* Replace with your UI for adding a review */}
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            리뷰 작성
          </Typography>
          <form
              onSubmit={(e) => {
                e.preventDefault();
                // Replace with your form state or handlers
                handleAddReview('Test review content', 5); // Example values, replace with actual form values
              }}
          >
            {/* Example form fields */}
            {/* Replace with your form inputs */}
            <textarea rows="4" cols="50" placeholder="리뷰를 작성해주세요." />
            <input type="number" placeholder="평점 (1-5)" />
            <button type="submit">리뷰 작성</button>
          </form>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default ProductDetail;
