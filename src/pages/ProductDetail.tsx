import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Minus, Plus, Clock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { useProductDetail } from '../hooks/useProducts';
import { useProductVariants } from '../hooks/useProductVariants';
import { apiService } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useTranslation } from '../contexts/LanguageContext';
import { reservationService } from '../services/reservationService';
import ReservationPopup from '../components/ReservationPopup';

/**
 * This component has been refactored to satisfy React's Rules of Hooks.
 * All hooks are called unconditionally and before any early return.
 */
const ProductDetail: React.FC = () => {
  const t = useTranslation();
  // Router params
  const { id } = useParams<{ id: string }>();

  // Local UI state
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<{ [key: string]: number }>({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', description: '' });
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  
  // Use variant hook for better variant management
  const { 
    variantInfo, 
    loading: loadingVariant, 
    getVariantInfo, 
    getSizeNote 
  } = useProductVariants();

  // Contexts
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();

  // Product data hook
  const { product: productData, loading, error } = useProductDetail(id || '1');

  // Derive product, images, reviews, and related products from the response
  const product = productData?.product_info;
  const productImages = productData?.product_image || [];
  const productReviews = productData?.product_Review || [];
  const relatedProducts = productData?.releted_products || [];

  // Event handlers for variants
  const handleVariantChange = (variantName: string, variantId: number) => {
    setSelectedVariant((prev) => ({
      ...prev,
      [variantName]: variantId,
    }));
  };

  const getSelectedVariantId = () => {
    const variantValues = Object.values(selectedVariant);
    return variantValues.length > 0 ? variantValues[0] : 0;
  };


  /**
   * Fetch variant pricing and stock info from the API. Runs whenever the
   * user selects a new variant or changes the quantity. The API call will
   * only run when all required data is present (user logged in and a
   * product exists with at least one selected variant).
   */

  // Always call useEffect unconditionally; this satisfies the Rules of Hooks.
  useEffect(() => {
    if (product && Object.keys(selectedVariant).length > 0) {
      getVariantInfo(product.id.toString(), selectedVariant, quantity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant, quantity, user, product]);

  // Get the price from first variant if product has variants
  const getProductPrice = () => {
    if (!product) return { price: '0', salePrice: '0', currency: 'MT' };
    
    if (product.variant_product === 1 && (productData as any).variant && (productData as any).variant.length > 0) {
      // For variant products, use variant info if available
      if (variantInfo) {
        return {
          price: variantInfo.price,
          salePrice: variantInfo.sale_price,
          currency: variantInfo.currency
        };
      }
      // Fallback to product price for variant products
      return {
        price: product.final_price || product.price,
        salePrice: product.sale_price,
        currency: 'MT'
      };
    }
    
    // Default product pricing for non-variant products
    return {
      price: product.final_price || product.price,
      salePrice: product.sale_price,
      currency: 'MT'
    };
  };

  // Check if product is out of stock
  const isOutOfStock = product ? reservationService.isOutOfStock(product.id) : false;

  // Add to cart handler
  const handleAddToCart = () => {
    if (!product) return;
    
    if (isOutOfStock) {
      setShowReservationPopup(true);
      return;
    }
    
    const variantId = getSelectedVariantId();
    
    // Get size note using the new hook
    const sizeNote = getSizeNote(selectedVariant, (productData as any).variant || []);
    
    const priceInfo = getProductPrice();
    const finalPrice = priceInfo.salePrice && priceInfo.salePrice !== priceInfo.price 
      ? parseFloat(priceInfo.salePrice.toString()) 
      : parseFloat(priceInfo.price.toString());
    
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.cover_image_url,
      quantity,
      variant: product.variant_product ? `Variant-${variantId}` : 'Standard',
      variantId,
      sizeNote, // Add size note for checkout
    });
  };

  // Wishlist toggle handler
  const handleWishlistToggle = () => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: parseFloat(product.final_price),
        image: product.cover_image_url,
      });
    }
  };

  // Review submit handler
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert(t.productDetail.loginToReview);
      return;
    }
    if (!product) return;
    try {
      const response = await apiService.productRating({
        id: product.id.toString(),
        user_id: user.id.toString(),
        rating_no: reviewForm.rating.toString(),
        title: reviewForm.title,
        description: reviewForm.description,
      });
      if (response.status === 1) {
        setReviewForm({ rating: 5, title: '', description: '' });
        setShowReviewForm(false);
        alert(t.productDetail.reviewSuccess);
        window.location.reload();
      } else {
        alert(t.productDetail.reviewError + ' ' + response.message);
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
      alert(t.productDetail.reviewErrorGeneric);
    }
  };

  // Determine display images with fallback
  const displayImages = productImages.length > 0
    ? productImages
    : [
        {
          image_url: product?.cover_image_url ||
            'https://via.placeholder.com/600x600?text=No+Image',
        },
      ];

  // Show loading state early
  if (loading) {
    return (
      <div className="product-detail-page py-12">
        <div className="container">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show error or missing data state after hooks
  if (error || !productData) {
    return (
      <div className="product-detail-page py-12">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t.productDetail.productNotFound}</h1>
            <p className="text-text-secondary">{t.productDetail.productNotFoundText}</p>
            {error && <p className="text-red-500 mt-2">Erro: {error}</p>}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page py-12">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{t.productDetail.invalidProductData}</h1>
            <p className="text-text-secondary">{t.productDetail.invalidProductDataText}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page py-12">
      <div className="container">
        <div className="grid grid-2 gap-16 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden rounded-xl">
              <img
                src={
                  (displayImages[selectedImage] as any)?.image_url ||
                  (displayImages[selectedImage] as any)?.image_path_full_url ||
                  product.cover_image_url
                }
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-secondary' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={(image as any).image_url || (image as any).image_path_full_url || product.cover_image_url}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                {loadingVariant && Object.keys(selectedVariant).length > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-secondary border-t-transparent rounded-full"></div>
                    <span className="text-lg">{t.productDetail.loadingPrice}</span>
                  </div>
                ) : (() => {
                  const priceInfo = getProductPrice();
                  const displayPrice = priceInfo.salePrice && priceInfo.salePrice !== priceInfo.price ? priceInfo.salePrice : priceInfo.price;
                  return (
                    <>
                      <span className="text-2xl font-bold">{priceInfo.currency}{displayPrice}</span>
                      {priceInfo.salePrice && priceInfo.salePrice !== priceInfo.price && (
                        <span className="text-xl text-text-secondary line-through">
                          {priceInfo.currency}{priceInfo.price}
                        </span>
                      )}
                    </>
                  );
                })()}
              </div>
              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.average_rating)
                          ? 'fill-current text-warning'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{product.average_rating}</span>
                </div>
                <span className="text-text-secondary">({productReviews.length} {t.productDetail.reviews})</span>
              </div>
            </div>
            {/* Variant Selection */}
            {product.variant_product === 1 && (productData as any).variant && (productData as any).variant.length > 0 && (
              <div className="space-y-6">
                {(productData as any).variant.map((variantGroup: any, groupIndex: number) => (
                  <div key={groupIndex}>
                    <h3 className="font-semibold mb-3">{variantGroup.variant_name}</h3>
                    <div className="flex gap-3 flex-wrap">
                      {variantGroup.variant_list_data.map((variant: any) => (
                        <button
                          key={variant.id}
                          onClick={() => handleVariantChange(variantGroup.variant_name, variant.id)}
                          className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-all ${
                            selectedVariant[variantGroup.variant_name] === variant.id
                              ? 'border-secondary bg-primary text-white'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <span className="font-medium">{variant.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Selected Variants Summary */}
                {Object.keys(selectedVariant).length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">{t.productDetail.selected}</h4>
                    <div className="space-y-1">
                      {Object.entries(selectedVariant).map(([variantName, variantId]) => {
                        const variantGroup = (productData as any).variant.find((vg: any) => vg.variant_name === variantName);
                        const selectedOption = variantGroup?.variant_list_data.find((v: any) => v.id === variantId);
                        return (
                          <p key={variantName} className="text-sm text-text-secondary">
                            <span className="font-medium">{variantName}:</span> {selectedOption?.name}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}
                {/* Variant Info Display */}
                {variantInfo && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium mb-2">Informações da Variação:</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Estoque:</span> {variantInfo.product_stock > 0 ? `${variantInfo.product_stock} disponíveis` : 'Indisponível'}</p>
                      <p><span className="font-medium">Status:</span> {variantInfo.stock_order_status}</p>
                      {variantInfo.description && (
                        <p><span className="font-medium">Descrição:</span> {variantInfo.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            {/* Quantity Selector */}
            <div>
              <h3 className="font-semibold mb-3">{t.productDetail.quantity}</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
            {/* Out of Stock Badge */}
            {isOutOfStock && (
              <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-3">
                <Clock className="text-orange-600" size={24} />
                <div>
                  <p className="font-semibold text-orange-900">{t.productDetail.availableSoon}</p>
                  <p className="text-sm text-orange-700">{t.productDetail.availableSoonText}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              {isOutOfStock ? (
                <button
                  onClick={() => setShowReservationPopup(true)}
                  className="btn btn-lg flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Clock size={20} />
                  {t.productDetail.reserve}
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary btn-lg flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={20} />
                  {t.productDetail.addToCart}
                </button>
              )}
              <button
                onClick={handleWishlistToggle}
                className={`btn btn-lg w-14 flex items-center justify-center ${
                  isInWishlist(product.id)
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                <Heart size={20} className={isInWishlist(product.id) ? 'fill-current' : ''} />
              </button>
            </div>
            {/* Product Features */}
            <div className="bg-primary p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-text-primary">Por que amamos</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  Qualidade premium
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  Design elegante
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="w-2 h-2 bg-secondary rounded-full" />
                  Durabilidade garantida
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Product Information Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'details'
                    ? 'border-secondary text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {t.productDetail.description}
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'ingredients'
                    ? 'border-secondary text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {t.productDetail.specifications}
              </button>
            </nav>
          </div>
          <div className="py-8">
            {activeTab === 'details' && (
              <div className="prose max-w-none">
                <div
                  className="text-text-secondary leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <div
                  className="text-text-secondary leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: product.detail }}
                />
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div>
                <h4 className="font-semibold mb-4">{t.productDetail.specifications}:</h4>
                <div
                  className="text-text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.specification }}
                />
              </div>
            )}
          </div>
        </div>
        {/* Ratings Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{t.productDetail.reviewsTab}</h2>
            {user ? (
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="btn btn-secondary"
              >
                {showReviewForm ? t.productDetail.cancelReview : t.productDetail.writeReview}
              </button>
            ) : (
              <div className="text-sm text-text-secondary">
                <span>{t.productDetail.loginToReview}</span>
              </div>
            )}
          </div>
          {/* Rating Form */}
          {showReviewForm && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">{t.productDetail.writeReview}</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t.productDetail.rating}</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                        className="text-2xl"
                      >
                        <Star
                          size={24}
                          className={`$${
                            star <= reviewForm.rating ? 'fill-current text-warning' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-text-secondary">
                      {reviewForm.rating} estrela{reviewForm.rating !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.productDetail.reviewTitle}</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder={t.productDetail.reviewTitlePlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t.productDetail.reviewDescription}</label>
                  <textarea
                    value={reviewForm.description}
                    onChange={(e) => setReviewForm((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    rows={4}
                    placeholder={t.productDetail.reviewDescriptionPlaceholder}
                    required
                  />
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="btn btn-primary">
                    {t.productDetail.submitReview}
                  </button>
                  <button type="button" onClick={() => setShowReviewForm(false)} className="btn btn-secondary">
                    {t.productDetail.cancelReview}
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="space-y-6">
            {productReviews.map((review, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${i < review.rating ? 'fill-current text-warning' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.user_name}</span>
                    </div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed mb-4">{review.review}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.cover_image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium">{product.name}</h5>
                      <p className="text-sm text-text-secondary">MT{product.price}</p>
                    </div>
                    <button className="btn btn-sm btn-primary">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* You May Also Like */}
        <div>
          <h2 className="text-2xl font-bold text-center mb-12">{t.productDetail.relatedProducts}</h2>
          <div className="grid grid-4 gap-8">
            {relatedProducts.map((relProd) => (
              <ProductCard key={relProd.id} product={relProd} />
            ))}
          </div>
        </div>
      </div>

      {/* Reservation Popup */}
      {product && (
        <ReservationPopup
          isOpen={showReservationPopup}
          onClose={() => setShowReservationPopup(false)}
          productId={product.id}
          productName={product.name}
          productImage={product.cover_image_url}
        />
      )}
    </div>
  );
};

export default ProductDetail;
