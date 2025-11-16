import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Clock } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from '../contexts/LanguageContext';
import { Product } from '../services/api';
import { reservationService } from '../services/reservationService';
import ReservationPopup from './ReservationPopup';
import { useCurrency } from '../contexts/CurrencyContext';
import { VariantPriceInfo } from '../utils/productVariantPricing';

interface ProductCardProps {
  product: Product;
  variantPriceInfo?: VariantPriceInfo;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variantPriceInfo }) => {
  const t = useTranslation();
  const { formatPrice } = useCurrency();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.cover_image_url);
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const isOutOfStock = reservationService.isOutOfStock(product.id);
  
  // Determine if product has variants and get price
  const hasVariants = variantPriceInfo?.hasVariants || product.variant_product === 1;
  
  // Get display price - use variantPriceInfo if available, otherwise use product price
  // For variant products with price 0, default to 7300 for guest users
  let displayPrice = variantPriceInfo?.price ?? parseFloat((product.final_price || product.price || '0').toString());
  
  // If price is 0 and product has variants, use default 7300
  if (displayPrice === 0 && hasVariants) {
    displayPrice = 7300;
  }
  
  const displaySalePrice = variantPriceInfo?.salePrice ?? (product.sale_price ? parseFloat(product.sale_price.toString()) : null);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: parseFloat(product.final_price),
        image: product.cover_image_url
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Products with variants must be added from product detail page
    if (hasVariants) {
      return;
    }
    
    if (isOutOfStock) {
      setShowReservationPopup(true);
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: displayPrice,
      image: product.cover_image_url,
      quantity: 1
    });
  };

  const handleReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowReservationPopup(true);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // For now, we'll use the same image since the API structure doesn't have secondImage
    // This could be enhanced later to use product images array
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImage(product.cover_image_url);
  };

  return (
    <>
      <Link to={`/product/${product.id}`} className="group">
        <div 
          className="card overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badge - Show if product is trending */}
          {product.trending === 1 && !isOutOfStock && (
            <div className="absolute top-3 left-3">
              <span className="bg-secondary text-text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {t.productCard.trending}
              </span>
            </div>
          )}

          {/* Out of Stock Badge */}
          {isOutOfStock && (
            <div className="absolute top-3 left-3">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                <Clock size={12} />
                {t.productCard.availableSoon}
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isInWishlist(product.id)
                ? 'bg-accent text-white'
                : 'bg-white bg-opacity-80 hover:bg-opacity-100 text-text-primary hover:text-accent'
            }`}
          >
            <Heart 
              size={18} 
              className={isInWishlist(product.id) ? 'fill-current' : ''} 
            />
          </button>

          {/* Quick Add to Cart / Reserve - Shows on Hover */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {isOutOfStock ? (
              <button
                onClick={handleReserve}
                className="w-full bg-orange-500 text-white py-2 rounded-md font-medium uppercase tracking-wide text-sm hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <Clock size={16} />
                {t.productCard.reserve}
              </button>
            ) : hasVariants ? (
              <Link
                to={`/product/${product.id}`}
                className="w-full bg-text-primary text-black py-2 rounded-md font-medium text-black bg-secondary uppercase tracking-wide text-sm hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingBag size={16} />
                {t.productCard.selectVariant}
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full bg-text-primary text-black py-2 rounded-md font-medium text-black bg-secondary uppercase tracking-wide text-sm hover:bg-accent transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                {t.productCard.addToCart}
              </button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="card-body">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${
                    i < Math.floor(product.average_rating)
                      ? 'fill-current text-warning'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-text-secondary">
              ({product.average_rating})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>


          {/* Price */}
          <div className="flex items-center gap-2">
            {displaySalePrice && displaySalePrice < displayPrice ? (
              <>
                <span className="font-bold text-text-primary">
                  {formatPrice(displaySalePrice)}
                </span>
                <span className="text-sm text-text-secondary line-through">
                  {formatPrice(displayPrice)}
                </span>
              </>
            ) : (
              <span className="font-bold text-text-primary">
                {formatPrice(displayPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
      </Link>

      {/* Reservation Popup */}
      <ReservationPopup
        isOpen={showReservationPopup}
        onClose={() => setShowReservationPopup(false)}
        productId={product.id}
        productName={product.name}
        productImage={product.cover_image_url}
      />
    </>
  );
};

export default ProductCard;