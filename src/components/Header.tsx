import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, Search, ShoppingBag, Menu, X, Minus, Plus, ChevronRight, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useSearchDebounced } from '../hooks/useSearch';
import { useTranslation } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import CurrencySelector from './CurrencySelector';
import { useCategories } from '../hooks/useCategories';
import { useCurrency } from '../contexts/CurrencyContext';
import { translateCategoryName } from '../utils/categoryTranslations';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const { user, logout } = useAuth();
  const { items, updateQuantity, removeFromCart, total, cartData } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const t = useTranslation();
  const { formatPrice } = useCurrency();
  const { categories, loading: categoriesLoading } = useCategories();
  const { language } = useLanguage();
  
  // Search functionality
  const { 
    results: searchResults, 
    isSearching, 
    error: searchError,
    searchProducts, 
    clearResults,
    hasSearched 
  } = useSearchDebounced(300);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Debug effect for menu state
  useEffect(() => {
    console.log('Menu state changed:', isMenuOpen);
  }, [isMenuOpen]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      searchProducts(query);
    } else {
      clearResults();
    }
  };

  // Clear search when closing
  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    clearResults();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
    
      {/* Top Banner 
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
      */}

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container">
          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between py-4">
            {/* Language and Currency Selectors */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <CurrencySelector />
            </div>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center">
              <img src='https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png' alt="CheLevi" className="w-30 h-20" />
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
                      {t.header.myProfile}
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-light transition-colors">
                      {t.header.myOrders}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-light transition-colors"
                    >
                      {t.nav.logout}
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hover:text-accent transition-colors">
                  <User size={20} />
                </Link>
              )}

              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:text-accent transition-colors"
              >
                <Search size={20} />
              </button>

              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative hover:text-accent transition-colors"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden lg:block border-t border-gray-light">
            <ul className="flex items-center justify-center gap-12 py-4">
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>

              <li>
                <Link
                  to="/products/"
                  className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
                >
                  {t.nav.products}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>

            </ul>

          </nav>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between py-4">
            <button
              onClick={() => {
                console.log('Menu button clicked, opening menu...');
                setIsMenuOpen(true);
              }}
              className="hover:text-accent transition-colors"
            >
              <Menu size={24} />
            </button>

            <Link to="/" className="flex flex-col items-center">
              <img src='https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png' alt="CheLevi" className="w-25 h-10" />
            </Link>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative hover:text-accent transition-colors"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-[60] lg:hidden"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
          >
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsMenuOpen(false)}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            />
            <div
              className="fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto"
              style={{ position: 'fixed', top: 0, left: 0, width: '320px', height: '100vh', backgroundColor: 'white', zIndex: 10000 }}
            >
              {/* Header do Menu Mobile */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-50 sticky top-0 z-10">
                <h2 className="text-lg font-bold text-gray-900">{t.header.menu}</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-700" />
                </button>
              </div>

              <div className="overflow-y-auto pb-20">
                {/* Search Box */}
                <div className="p-4 border-b bg-white">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder={t.header.searchPlaceholder}
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Language and Currency Selectors */}
                <div className="p-4 border-b bg-white space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">{t.header.language || 'Idioma'}</p>
                    <LanguageSelector />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2">{t.header.currency || 'Moeda'}</p>
                    <CurrencySelector />
                  </div>
                </div>

                {/* User Profile Info (when logged in) */}
                {user && (
                  <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <User className="text-gray-700" size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {user.first_name && user.last_name 
                            ? `${user.first_name} ${user.last_name}`
                            : user.name || user.email?.split('@')[0] || t.header.user}
                        </p>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="p-4">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/"
                        className="flex items-center justify-between py-3 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{t.nav.home}</span>
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        className="flex items-center justify-between py-3 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{t.nav.about}</span>
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>
                    </li>
                    
                    {/* Collections with Categories */}
                    <li>
                      <div className="py-3 px-3">
                        <button
                          onClick={() => {
                            const routeSlug = 'products';
                            const category = categories.find((c: any) => {
                              const slug = c.slug?.split('/').pop()?.toLowerCase() || c.name.toLowerCase();
                              return slug === routeSlug.toLowerCase();
                            });
                            if (category) {
                              navigate(`/products/${routeSlug}`);
                              setIsMenuOpen(false);
                            } else {
                              navigate('/products');
                              setIsMenuOpen(false);
                            }
                          }}
                          className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent rounded-lg transition-colors"
                        >
                          <span>{t.nav.products}</span>
                          <ChevronRight size={18} className="text-gray-400" />
                        </button>
                        
                        {/* Categories List */}
                        {categories.length > 0 && (
                          <div className="mt-2 ml-4 space-y-1">
                            {categories.slice(0, 6).map((category: any) => {
                              const routeSlug = category.slug?.split('/').pop()?.toLowerCase() || category.name.toLowerCase();
                              const translatedName = translateCategoryName(category.id, category.name, language);
                              return (
                                <Link
                                  key={category.id}
                                  to={`/products/${routeSlug}`}
                                  className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-accent rounded-md transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {translatedName}
                                  {category.total_product && (
                                    <span className="text-xs text-gray-400 ml-2">({category.total_product})</span>
                                  )}
                                </Link>
                              );
                            })}
                            {categories.length > 6 && (
                              <Link
                                to="/products"
                                className="block py-2 px-3 text-sm text-primary font-medium hover:bg-gray-50 rounded-md transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {t.header.viewAllCategories}
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </li>

                    <li>
                      <Link
                        to="/contact"
                        className="flex items-center justify-between py-3 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{t.nav.contact}</span>
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>
                    </li>
                  </ul>

                  {/* Wishlist */}
                  <div className="mt-4 pt-4 border-t">
                    <Link
                      to="/wishlist"
                      className="flex items-center justify-between py-3 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <Heart size={20} className={wishlistItems.length > 0 ? 'fill-current text-red-500' : ''} />
                        <span>{t.nav.wishlist}</span>
                      </div>
                      {wishlistItems.length > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Link>
                  </div>

                  {/* User Account Section */}
                  <div className="mt-4 pt-4 border-t space-y-1">
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="flex items-center justify-between py-3 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <User size={18} />
                            <span>{t.nav.profile}</span>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center justify-between py-3 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <ShoppingBag size={18} />
                            <span>{t.nav.orders}</span>
                          </div>
                          <ChevronRight size={18} className="text-gray-400" />
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between py-3 px-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                        >
                          <span>{t.nav.logout}</span>
                          <ChevronRight size={18} className="text-red-400" />
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        className="flex items-center justify-between py-3 px-3 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-accent rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <User size={18} />
                          <span>{t.nav.login}</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-400" />
                      </Link>
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={handleCloseSearch}>
            <div className="bg-white p-6 max-w-2xl mx-auto mt-20 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-6">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder={t.header.searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                <button onClick={handleCloseSearch}>
                  <X size={20} />
                </button>
              </div>

              {(searchQuery || hasSearched) && (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin w-6 h-6 border-2 border-secondary border-t-transparent rounded-full"></div>
                      <span className="ml-2 text-gray-500">{t.header.searching}</span>
                    </div>
                  ) : searchError ? (
                    <div className="text-center py-8">
                      <p className="text-red-500 mb-2">{t.header.searchError}</p>
                      <p className="text-sm text-gray-500">{searchError}</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={handleCloseSearch}
                      >
                        <img
                          src={product.cover_image_url}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48?text=No+Image';
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-600">MT{product.final_price}</p>
                          {product.category_name && (
                            <p className="text-xs text-gray-400">{product.category_name}</p>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : hasSearched ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">{t.header.noResults}</p>
                      <p className="text-sm text-gray-400 mt-1">{t.header.tryDifferent}</p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 lg:z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
            <div className="fixed top-0 right-0 h-full w-full lg:w-96 max-w-full bg-white shadow-xl overflow-y-auto animate-slideInRight">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{t.header.cart} ({totalItems})</h2>
                  <button onClick={() => setIsCartOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-6">
                {items.length > 0 ? (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.variant || ''}`} className="flex gap-4 p-4 border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100"
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-700 text-sm"
                            >
                              {t.common.remove}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">{t.header.emptyCart}</p>
                  </div>
                )}
              </div>

              {items.length > 0 && (() => {
                // Calculate totals for sidebar
                const sidebarSubtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                const sidebarDiscount = cartData?.coupon_info?.coupon_discount_amount 
                  ? parseFloat(cartData.coupon_info.coupon_discount_amount.toString()) 
                  : 0;
                const sidebarTotal = cartData?.final_price 
                  ? (() => {
                      const parsed = parseFloat(cartData.final_price.toString());
                      const calculated = sidebarSubtotal - sidebarDiscount;
                      // Only use API value if it makes sense
                      if (!isNaN(parsed) && parsed > 0 && calculated > 0 && 
                          Math.abs(parsed - calculated) < (calculated * 0.5)) {
                        return parsed;
                      }
                      return calculated;
                    })()
                  : (sidebarSubtotal - sidebarDiscount);
                
                return (
                  <div className="border-t p-6 space-y-4 bg-gray-50">
                    {/* Show coupon info if applied */}
                    {cartData?.coupon_info && (cartData.coupon_info.coupon_id > 0 || cartData.coupon_info.coupon_code) && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-green-700 font-semibold text-xs">
                            Cupom: {cartData.coupon_info.coupon_name}
                          </span>
                          {sidebarDiscount > 0 && (
                            <span className="text-green-600 font-bold text-sm">
                              -{formatPrice(sidebarDiscount)}
                            </span>
                          )}
                        </div>
                        <p className="text-green-600 text-xs">
                          {cartData.coupon_info.coupon_code}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t.header.total}:</span>
                      <span>{formatPrice(sidebarTotal > 0 ? sidebarTotal : total)}</span>
                    </div>
                    
                    <Link
                      to="/checkout"
                      className="btn btn-primary w-full"
                      onClick={() => setIsCartOpen(false)}
                    >
                      {t.nav.checkout}
                    </Link>
                    <Link
                      to="/cart"
                      className="btn btn-outline w-full"
                      onClick={() => setIsCartOpen(false)}
                    >
                      {t.header.viewCart}
                    </Link>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;