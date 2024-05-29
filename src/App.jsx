import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import Cart from './pages/cart/Cart';
import Category from './pages/manager/category/Category';
import Footer from './components/Footer';
import Header from './components/Header';
import Join from './pages/join/Join';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import Order from './pages/order/Order';
import Product from './pages/manager/product/Product';
import ProductDetail from './pages/productDetail/ProductDetail';
import ProductList from './pages/productList/ProductList';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ABA5F3',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: '#1cc7d0',
        light: '#F5EBFF',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#47008F',
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/order" element={<Order />} />
            <Route
              path="/product/list/:category1/:category2?"
              element={<ProductList />}
            />
            <Route path="/product/detail" element={<ProductDetail />} />
            <Route path="/product/management" element={<Product />} />
            <Route path="/category/management" element={<Category />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
