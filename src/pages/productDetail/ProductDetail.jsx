import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  ButtonGroup,
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, Toolbar, AppBar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import useCartOrderStore from '../../store/useCartOrderStore';
import useProductStore from '../../store/useProductStore';
import {PageContainer} from "../../components/PageContainer";

const ProductDetail = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const addCart = useCartOrderStore((state) => state.addCart);
  const {fetchProductDetails} = useProductStore();
  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await fetchProductDetails(id);
        setProduct(productData);
        if (productData) {
          setTotalPrice(productData.fixedPrice * quantity);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, fetchProductDetails, quantity]);

  const handleAddToCart = () => {
    if (product) {
      addCart(product.id, quantity, product.fixedPrice);
      // alert(`${product.title}이(가) 장바구니에 추가되었습니다.`);
      setOpenDialog(true);
    }
  };

  const handleBuyNow = () => {
    navigate(`/order`, {state: {productId: id, buyNow: true, quantity}});
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading the product.</p>;
  }
  if (!product) {
    return <p>No product found</p>;
  }

  return (
      <PageContainer>
        <Card
            className="tw-max-w-5xl tw-mx-auto tw-my-8 tw-p-5 tw-overflow-hidden">
          <Grid container spacing={3} className="tw-p-4 tw-md:p-8">
            <Grid item md={6}>
              {product.pictureUrl && (
                  <img
                      src={product.pictureUrl}
                      alt={product.title}
                      className="tw-w-full tw-h-auto object-cover tw-rounded-lg tw-shadow-md"
                  />
              )}
            </Grid>
            <Grid item md={6}
                  className="tw-flex tw-flex-col tw-justify-between">
              <CardContent className="tw-space-y-6">
                <Typography variant="h4" component="h1"
                            className="tw-font-bold">
                  {product.title}
                </Typography>
                <Typography variant="h6" className="tw-text-gray-600">
                  {product.fixedPrice}원
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {product.author}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Description: {product.content}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Published: {product.publicationYear}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>


        <AppBar position="fixed" color="default"
                sx={{top: 'auto', bottom: 0, backgroundColor: 'white'}}>
          <Toolbar sx={{ width: '100%'}}>
            {/* 총 상품 금액 */}
            <Typography variant="body2" sx={{
              flex: 1,
              minWidth: 140,
              textAlign: 'right',
              marginRight: 8
            }}>
              총 상품 금액: {' '}
              <Typography component="span" variant="h6" fontWeight="bold" sx={{ color: 'primary.main' }}>
                {totalPrice.toLocaleString()}원
              </Typography>
            </Typography>

            {/* 구매 권수 TextField */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <ButtonGroup variant="outlined" size="small"
                         sx={{border: 'none', align: 'center'}}>
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
                <RemoveIcon/>
              </IconButton>
              <TextField
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  inputProps={{
                    min: 1,
                    style: {textAlign: 'center', width: '30px'}
                  }}
                  sx={{border: 'none', '& fieldset': {border: 'none'}}}
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
                <AddIcon/>
              </IconButton>
            </ButtonGroup>
            </Box>
            {/* 장바구니 버튼 */}
            <Box sx={{ display: 'flex', justifyContent: 'left', flex: 1, gap: 1 }}>
              <Button variant="outlined" onClick={handleAddToCart} sx={{px: 4}}>
                장바구니
              </Button>
              <Button variant="contained" color="primary" onClick={handleBuyNow}
                      sx={{px: 4}}>
                바로구매
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle></DialogTitle>
          <DialogContent className="tw-mx-6 tw-my-4">
            <Typography variant="body1" align="center">
              <Typography component="span" variant="body1" fontWeight="bold">
                {product?.title}
              </Typography>{' '}{quantity}권이<br/>장바구니에 추가되었습니다.
            </Typography>
          </DialogContent>
          <DialogActions
              sx={{justifyContent: 'center', marginBottom: 2, gap: 1}}>
            <Button variant="outlined" onClick={handleCloseDialog}>계속
              쇼핑</Button>
            <Button variant="contained" onClick={handleGoToCart}>장바구니로
              이동</Button>
          </DialogActions>
        </Dialog>
      </PageContainer>
  );
};

export default ProductDetail;