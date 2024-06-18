import { Box, Checkbox, Typography, Paper, Button, IconButton, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { PageContainer } from '../../components/PageContainer';

const OrdersComplate = () => {
  const initialCartItems = [
    { productId: 1, product_name: '상품 1', img_url: 'https://via.placeholder.com/80', price: 10000, amount: 9000, quantity: 1, isSelected: false },
    { productId: 2, product_name: '상품 2', img_url: 'https://via.placeholder.com/80', price: 20000, amount: 18000, quantity: 1, isSelected: false },
    { productId: 3, product_name: '상품 3', img_url: 'https://via.placeholder.com/80', price: 30000, amount: 27000, quantity: 1, isSelected: false },
  ];
  return (
    <PageContainer>
      <Container>
        <Box sx={{ minHeight: '200px', my: 4 }}>
          <Paper sx={{ p: 2, backgroundColor: 'rgba(128, 128, 128, 0.35)', minHeight: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          </Paper>
          <Box sx={{ mt: 2 }}>
            {initialCartItems.map((item, index) => (
              <Paper key={item.productId} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, borderBottom: '1px solid rgba(128, 128, 128, 0.35)' }}>
                <Box sx={{ flexShrink: 0, height: '100%', overflow: 'hidden', width: '80px', mr: 2 }}>
                  <img src={item.img_url} alt={item.product_name} style={{ width: '100%', height: 'auto' }} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">{item.product_name}</Typography>
                  <Typography variant="body2">
                    <span style={{ color: 'blue' }}>10% </span>
                    <span style={{ textDecoration: 'line-through' }}>{item.price}원</span> {item.price * 0.9}원
                  </Typography>
                </Box>
                <Box sx={{ width: '130px', textAlign: 'center' }}>
                  <Typography>{item.amount}원</Typography>

                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Typography><strong>3일 이내 배송</strong></Typography>
                </Box>
                  <CloseIcon />
              </Paper>
            ))}
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};

export { OrdersComplate };