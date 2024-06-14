import { Route, Routes } from 'react-router-dom';

import Cart from './pages/cart/Cart';
import Category from './pages/manager/category/Category';
import Join from './pages/join/Join';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import MyPage from './pages/myPage/MyPage';
import Order from './pages/order/Order';
import Product from './pages/manager/product/ProductAdd';
import ProductDetailPage from './pages/productDetail/ProductDetailPage';
import ProductList from './pages/productList/ProductList';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/order" element={<Order />} />
      <Route path="/category/:categoryId" element={<ProductList />} />
      <Route path="/product/detail/:id" element={<ProductDetailPage />} />
      <Route path="/product/management" element={<Product />} />
      <Route path="/category/management" element={<Category />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/myPage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;