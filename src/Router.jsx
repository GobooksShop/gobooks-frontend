import { Route, Routes } from 'react-router-dom';

import Cart from './pages/cart/Cart';
import Category from './pages/manager/category/Category';
import Join from './pages/join/Join';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import MyPage from './pages/myPage/MyPage';
import Order from './pages/order/Order';
import Product from './pages/manager/product/Product';
import ProductDetail from './pages/productDetail/ProductDetail';
import ProductList from './pages/productList/ProductList';

const Router = () => {
  return (
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
      <Route path="/myPage" element={<MyPage />} />
    </Routes>
  );
};
export default Router;
