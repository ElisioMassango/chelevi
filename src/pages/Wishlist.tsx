import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X, ArrowLeft, Star } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from '../contexts/LanguageContext';

const Wishlist: React.FC = () => {
  const t = useTranslation();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    });
  };

  const relatedProducts = [
  {
      id: 1,
      name: "Liane Handbag",
      price: 6500,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Products/IMG_1301.PNG",
      secondImage: "https://chelevi.sparktechnology.cloud/chelevi/Products/IMG_1300.PNG",
      rating: 4.8,
      reviews: 245,
      badge: "NOVIDADE",
      colors: [],
      category: "bolsas"
    },
    {
      id: 2,
      name: "Sapato Siena",
      price: 7300,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_6392.JPG",
      secondImage: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_0646.JPG",
      rating: 4.9,
      reviews: 128,
      badge: "MAIS VENDIDO",
      colors: [],
      category: "sapatos"
    },
    {
      id: 3,
      name: "Edileyne Preta",
      price: 7300,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Products/IMG_1277.PNG",
      secondImage: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1251.JPG",
      rating: 4.7,
      reviews: 89,
      badge: "FAVORITO",
      colors: [],
      category: "bolsas"
    },
    {
      id: 4,
      name: "Sapato Siena",
      price: 7300,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_6393.JPG",  
      secondImage: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_0647.JPG",
      rating: 4.6,
      reviews: 156,
      badge: "TOP",
      colors: [],
      category: "sapatos"
    }
];
  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
  };

  if (items.length === 0) {
    return (
      <div className="wishlist-page py-20 min-h-screen bg-gray-50">
        <div className="container text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart size={64} className="text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{t.wishlist.emptyTitle}</h1>
            <p className="text-text-secondary mb-8 text-lg">
              {t.wishlist.emptyDescription}
            </p>
            <Link to="/products" className="btn btn-primary btn-lg inline-flex items-center gap-2">
              <ArrowLeft size={20} />
              {t.wishlist.discoverProducts}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page py-8 min-h-screen bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/products" className="text-accent hover:text-accent/70 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{t.wishlist.title}</h1>
              <p className="text-text-secondary">{items.length} {items.length === 1 ? t.wishlist.item : t.wishlist.items} {t.wishlist.itemsSaved}</p>
            </div>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
            >
              {t.wishlist.clearList}
            </button>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden group">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center text-red-500 hover:text-red-700 transition-all shadow-sm"
                >
                  <X size={16} />
                </button>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-text-primary text-white py-2 rounded-md font-medium text-sm hover:bg-accent transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    {t.wishlist.addToCart}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-semibold text-gray-800 mb-2 hover:text-accent transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                {/* Rating (mock data) */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={`${
                          i < 4 ? 'fill-current text-warning' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">(4.5)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800">
                      MT{item.price}
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {t.wishlist.inStock}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 btn btn-primary btn-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    {t.wishlist.add}
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="btn btn-outline btn-sm px-3"
                  >
                    <Heart size={14} className="fill-current text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">{t.wishlist.continueDiscovering}</h3>
            <p className="text-text-secondary mb-6">
              {t.wishlist.continueText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn btn-primary">
                {t.wishlist.viewAllProducts}
              </Link>
              <Link to="/products/cabelo" className="btn btn-outline">
                {t.wishlist.hairProducts}
              </Link>
            </div>
          </div>
        </div>

        {/* Recommendations */}
            {/* You May Also Like */}
      
     
      </div>
    </div>
  );
};

export default Wishlist;