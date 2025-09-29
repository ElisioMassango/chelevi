import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import Login from './pages/Login';
import Wishlist from './pages/Wishlist';
import OrderTracking from './pages/OrderTracking';
import CheckoutSuccess from './pages/CheckoutSuccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LGPDPopup from './components/LGPDPopup';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="App">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:category" element={<Products />} />
                  <Route path="/products/category/:categoryId" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout-success" element={<CheckoutSuccess />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
              </main>
              <Footer />
              <ChatBot />
              <LGPDPopup />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;