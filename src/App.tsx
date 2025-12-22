import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { useScrollToTop } from './hooks/useScrollToTop';
import { env } from './config/environment';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import LaunchCountdown from './components/LaunchCountdown';
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
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import OrderTracking from './pages/OrderTracking';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailed from './pages/CheckoutFailed';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ShippingInfo from './pages/ShippingInfo';
import LocationDemo from './pages/LocationDemo';
import AdminNewsletter from './pages/AdminNewsletter';
import LGPDPopup from './components/LGPDPopup';
import WelcomeManager from './components/WelcomeManager';
import NewsletterPopup from './components/NewsletterPopup';
import LoadingScreen from './components/LoadingScreen';
import './styles/globals.css';
import WhatsAppFloatButton from './components/WhatsAppFloatButton';

// Internal component to handle scroll to top
function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  const [showCountdown, setShowCountdown] = useState(() => {
    // Se o countdown não está habilitado, não mostrar
    if (!env.countdown.enabled) {
      return false;
    }

    // Verificar se a data de lançamento já passou
    try {
      const launchDateStr = `${env.countdown.launchDate}T${env.countdown.launchTime}:00+02:00`;
      const launchDate = new Date(launchDateStr);
      
      // Verificar se a data é válida
      if (isNaN(launchDate.getTime())) {
        console.warn('Invalid launch date, disabling countdown');
        return false;
      }

      // Obter hora atual em Moçambique (UTC+2)
      const now = new Date();
      const mozambiqueOffset = 2 * 60; // UTC+2 em minutos
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const mozambiqueTime = new Date(utc + (mozambiqueOffset * 60000));

      // Mostrar countdown apenas se ainda não passou a data
      return mozambiqueTime.getTime() < launchDate.getTime();
    } catch (error) {
      console.error('Error checking launch date:', error);
      return false;
    }
  });

  const handleLaunch = () => {
    setShowCountdown(false);
  };

  return (
    <>
      <LanguageProvider>
        <LoadingScreen />
        <CurrencyProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {/* Mostrar countdown se estiver habilitado e data não passou */}
                {showCountdown && <LaunchCountdown onLaunch={handleLaunch} />}
                
                {/* Renderizar o app normalmente se countdown não estiver ativo */}
                {!showCountdown && (
                  <Router>
                    <ScrollToTop />
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
                          <Route path="/checkout-failed" element={<CheckoutFailed />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/orders" element={<Orders />} />
                          <Route path="/orders/:orderId" element={<OrderDetail />} />
                          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                          <Route path="/terms" element={<TermsOfUse />} />
                          <Route path="/shipping" element={<ShippingInfo />} />
                          <Route path="/location-demo" element={<LocationDemo />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/admin/newsletter" element={<AdminNewsletter />} />
                        </Routes>
                      </main>
                      <Footer />
      
                      <LGPDPopup />
                      <WelcomeManager />
                      <NewsletterPopup />
                    </div>
                  </Router>
                )}
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </CurrencyProvider>
        </LanguageProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
        <WhatsAppFloatButton />
    </>
  );
}

export default App;