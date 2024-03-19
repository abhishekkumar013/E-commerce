import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from './pages/Auth/Register'
import LoginPage from './pages/Auth/LoginPage'
import Dashboard from './pages/user/Dashboard'
import PrivateRoutes from './components/Routes/PrivateRoutes'
import ForgotPassPage from './pages/Auth/ForgotPassPage'
import AdminRoutes from './components/Routes/AdminRoutes'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import UserDetails from './pages/Admin/UserDetails'
import Profile from './pages/user/Profile'
import Orders from './pages/user/Orders'
import Product from './pages/Admin/Product'
import UpdateProduct from './pages/Admin/UpdateProduct'
import ProductDetail from './pages/ProductDetail'
import Search from './pages/Search.js'
import Categories from './pages/Categories.js'
import CategoryProduct from './pages/CategoryProduct.js'
import CartPage from './pages/CartPage.js'
import AdminOrders from './pages/Admin/AdminOrders.js'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<UserDetails />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgat-password" element={<ForgotPassPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
