import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeMenu } from './services/menuService';
import { CartProvider } from './hooks/useCart';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer pages
import HomePage from './pages/customer/HomePage';
import MenuPage from './pages/customer/MenuPage';
import CartPage from './pages/customer/CartPage';
import OrderStatusPage from './pages/customer/OrderStatusPage';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import MenuManagementPage from './pages/admin/MenuManagementPage';
import OrderManagementPage from './pages/admin/OrderManagementPage';

// Shared
import NotFoundPage from './pages/NotFoundPage';

// Initialize seed data on first visit
initializeMenu();

export default function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        {/* Customer routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderStatusPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="menu" element={<MenuManagementPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}
