import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Main = lazy(() => import('./pages/main/Main'));
const Login = lazy(() => import('./pages/login/Login'));
const Join = lazy(() => import('./pages/join/Join'));
const Order = lazy(() => import('./pages/order/Order'));
const OrdersComplete = lazy(() => import('./pages/order/OrdersComplete'));
const OrderList = lazy(() => import('./pages/order/OrderList'));
const ProductList = lazy(() => import('./pages/productList/ProductList'));
const ProductDetail = lazy(() => import('./pages/productDetail/ProductDetail'));
const ProductAdd = lazy(() => import('./pages/manager/product/ProductAdd'));
const ProductEdit = lazy(() => import('./pages/manager/product/ProductEdit'));
const UserManagement = lazy(() => import('./pages/manager/users/UserManagement'));
const Category = lazy(() => import('./pages/manager/category/Category'));
const ManagerDashboard = lazy(() => import('./pages/manager/ManagerPanel'));
const Cart = lazy(() => import('./pages/cart/Cart'));
const MyPagePanel = lazy(() => import('./pages/myPage/MyPagePanel'));
const PrivateRoute = lazy(() => import('./router/PrivateRoute'));

const Router = () => {
  return (
    <Suspense fallback={<CircularProgress color="secondary" />}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route element={<PrivateRoute />}>
          <Route path="/order" element={<Order />} />
          <Route path="/order/complete" element={<OrdersComplete />} />
          <Route path="/order/:userId" element={<OrderList />} />
        </Route>
        <Route path="/product/list/:categoryId" element={<ProductList />} />
        <Route path="/product/detail/:id" element={<ProductDetail />} />
        <Route path="/admin/product/add" element={<ProductAdd />} />
        <Route path="/admin/product/edit/:id" element={<ProductEdit />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/manager" element={<ManagerDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myPage" element={<MyPagePanel />} />
      </Routes>
    </Suspense>
  );
};

export default Router;