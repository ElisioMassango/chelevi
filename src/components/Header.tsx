import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, User, Search, ShoppingBag, Menu, X, ChevronDown, Globe, Minus, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const { user, logout } = useAuth();
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Debug effect for menu state
  useEffect(() => {
    console.log('Menu state changed:', isMenuOpen);
  }, [isMenuOpen]);

  // Mock search results
  const searchResults = [
    {
      id: 1,
      name: "Lip Butter",
      price: 450,
      image: "https://kyliecosmetics.com/cdn/shop/files/KJC_LIP_25_PeachMango_Stylized_Open.jpg?crop=center&height=100&v=1752094667&width=100"
    },
    {
      id: 2,
      name: "Condicionador Nutritivo",
      price: 1200,
      image: "https://fentybeauty.com/cdn/shop/files/FS_FALL25_T2PRODUCT_ECOMM_BODY-MILK_SALTED-CARAMEL_1200X1500_72DPI_900x1100.jpg?v=1754005575&width=100&height=100"
    }
  ].filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                    MZ | PT
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
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>

              <li>
                <Link
                  to="/products/"
                  className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
                >
                  Coleções
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm font-medium uppercase tracking-wide hover:text-accent transition-colors"
                >
                  Contacto
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
              className="fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl"
              style={{ position: 'fixed', top: 0, left: 0, width: '320px', height: '100vh', backgroundColor: 'white', zIndex: 10000 }}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-bold">Menu</h2>
                <button onClick={() => {
                  console.log('Closing menu...');
                  setIsMenuOpen(false);
                }}>
                  <X size={24} />
                </button>
              </div>

              <nav className="p-6">
                <ul className="space-y-6">
                  <li>
                    <Link
                      to="/"
                      className="block text-lg font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Início
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="block text-lg font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sobre Nós
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products/"
                      className="block text-lg font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Coleções
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="block text-lg font-medium hover:text-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contacto
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
                        Perfil
                      </Link>
                      <Link
                        to="/orders"
                        className="block text-lg font-medium hover:text-accent transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Meus Pedidos
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

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsSearchOpen(false)}>
            <div className="bg-white p-6 max-w-2xl mx-auto mt-20 rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-4 mb-6">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg outline-none"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              {searchQuery && (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-600">MT{product.price}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No products found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Cart Sidebar */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
            <div className="fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-xl overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Carrinho ({totalItems})</h2>
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
                          <p className="text-sm text-gray-600">MT{item.price}</p>
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
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">O seu carrinho está vazio</p>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t p-6 space-y-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>MT{total.toFixed(2)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="btn btn-primary w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Checkout
                  </Link>
                  <Link
                    to="/cart"
                    className="btn btn-outline w-full"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Ver Carrinho
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;