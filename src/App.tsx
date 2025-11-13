import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useScrollToTop } from './hooks/useScrollToTop';
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
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import OrderTracking from './pages/OrderTracking';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailed from './pages/CheckoutFailed';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import ShippingInfo from './pages/ShippingInfo';
import LocationDemo from './pages/LocationDemo';
import LGPDPopup from './components/LGPDPopup';
import WelcomeManager from './components/WelcomeManager';
import NewsletterPopup from './components/NewsletterPopup';
import './styles/globals.css';
import WhatsAppFloatButton from './components/WhatsAppFloatButton';

// Internal component to handle scroll to top
function ScrollToTop() {
  useScrollToTop();
  return null;
}

function App() {
  return (
    <>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
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
                  </Routes>
                </main>
                <Footer />
 
                <LGPDPopup />
                <WelcomeManager />
                <NewsletterPopup />
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
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