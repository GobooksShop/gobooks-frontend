import { Route, Routes } from 'react-router-dom';

import Cart from './pages/cart/Cart';
import Category from './pages/manager/category/Category';
import Join from './pages/join/Join';
import Login from './pages/login/Login';
import Main from './pages/main/Main';
import MyPage from './pages/myPage/MyPage';
import Order from './pages/order/Order';
import ProductAdd from './pages/manager/product/ProductAdd';
import ProductEdit from './pages/manager/product/ProductEdit';
import ProductDetail from './pages/productDetail/ProductDetail';
import ProductList from './pages/productList/ProductList';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/order" element={<Order />} />
      <Route path="/category/:categoryId" element={<ProductList />} />
      <Route path="/product/detail/:id" element={<ProductDetail />} />
      <Route path="/product/management/add" element={<ProductAdd />} />
      <Route path="/product/management/edit/:id" element={<ProductEdit />} />
      <Route path="/category/management" element={<Category />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/myPage" element={<MyPage />} />
    </Routes>
  );
};

export default Router;
