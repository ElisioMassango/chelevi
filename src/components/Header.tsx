import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, Search, ShoppingBag, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { user, logout } = useAuth();
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    setIsLanguageOpen(false);
    // Here you would implement language switching logic
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-secondary text-center py-2 px-4 relative">
        <p className="text-sm font-medium">
          💋 NEW ARRIVALS JUST DROPPED 💋 FREE SHIPPING ON ORDERS OVER MT500 💋
        </p>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg leading-none hover:opacity-70 transition-opacity"
          onClick={() => {}}
        >
          ×
        </button>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between py-4">
            {/* Language/Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
              >
                <Globe size={16} />
                <span>{currentLanguage === 'en' ? 'MZ | EN' : 'MZ | PT'}</span>
                <ChevronDown size={14} className={`transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLanguageOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray rounded-md shadow-lg py-2 w-32">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-light transition-colors"
                  >
                    MZ | EN
                  </button>
                  <button
                    onClick={() => handleLanguageChange('pt')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-light transition-colors"
                  >
                    MZ | PT
                  </button>
                </div>
              )}
            </div>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center">
              <img src='https://crm.sparktech.pt/assets/shopfcc/shopfcclogo.png' alt="ShopFCC" className="w-30 h-20" />
            </Link>

            {/* Action Icons */}
            <div className="flex items-center gap-6">
              <Link to="/wishlist" className="relative hover:text-accent transition-colors">
                <Heart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="relative group">
                  <button className="hover:text-accent transition-colors">
                    <User size={20} />
                  </button>
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray rounded-md shadow-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-light transition-colors">
                      My Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-light transition-colors">
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-light transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hover:text-accent transition-colors">
                  <User size={20} />
                </Link>
              )}

              <button className="hover:text-accent transition-colors">
                <Search size={20} />
              </button>

              <Link to="/cart" className="relative hover:text-accent transition-colors">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:block border-t border-gray-light">
          <ul className="flex items-center justify-center gap-12 py-4">
  <li>
    <Link 
      to="/products/cabelo" 
      className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
    >
      Pele
    </Link>
  </li>
  <li>
    <Link 
      to="/products/cabelo" 
      className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
    >
      Cabelos
    </Link>
  </li>
  <li>
    <Link 
      to="/products/cabelo" 
      className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
    >
      Maquiagem
    </Link>
  </li>
  <li>
    <Link 
      to="/products/cabelo" 
      className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
    >
      Óleos & Séruns
    </Link>
  </li>
  <li>
    <Link 
      to="/products/cabelo" 
      className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
    >
      Descobrir
    </Link>
  </li>
  <li>
    <Link 
      to="/products/cabelo" 
      className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
    >
      Recompensas
    </Link>
  </li>
</ul>

          </nav>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between py-4">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="hover:text-accent transition-colors"
            >
              <Menu size={24} />
            </button>

            <Link to="/" className="flex flex-col items-center">
              <h1 className="text-lg font-bold tracking-wider uppercase">SHOPFCC</h1>
              <p className="text-xs font-medium tracking-widest">SHOPFCC.STORE</p>
            </Link>

            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative hover:text-accent transition-colors">
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              
              <nav className="p-6">
              <ul className="space-y-6">
  <li>
    <Link
      to="/products/shampoos"
      className="block text-lg font-medium hover:text-accent transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      Shampoos
    </Link>
  </li>
  <li>
    <Link
      to="/products/condicionadores"
      className="block text-lg font-medium hover:text-accent transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      Condicionadores
    </Link>
  </li>
  <li>
    <Link
      to="/products/mascaras"
      className="block text-lg font-medium hover:text-accent transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      Máscaras & Tratamentos
    </Link>
  </li>
  <li>
    <Link
      to="/products/oleos"
      className="block text-lg font-medium hover:text-accent transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      Óleos & Séruns
    </Link>
  </li>
  <li>
    <Link
      to="/discover"
      className="block text-lg font-medium hover:text-accent transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      Descobrir
    </Link>
  </li>
  <li>
    <Link
      to="/rewards"
      className="block text-lg font-medium hover:text-accent transition-colors"
      onClick={() => setIsMenuOpen(false)}
    >
      Recompensas
    </Link>
  </li>
</ul>


                <div className="mt-8 pt-8 border-t space-y-4">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block text-lg font-medium hover:text-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block text-lg font-medium hover:text-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left text-lg font-medium hover:text-accent transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block text-lg font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                  
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-2 text-lg font-medium hover:text-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={20} />
                    Wishlist ({wishlistItems.length})
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;