import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useProductDetail } from '../hooks/useProducts';
import { apiService } from '../services/api';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<{ [key: string]: number }>({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    description: ''
  });
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Use real API data
  const { product: productData, loading, error } = useProductDetail(id || '1');

  // Debug logging
  console.log('ProductDetail Debug:', { productData, loading, error, id });

  // Show loading state
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

  // Show error state
  if (error || !productData) {
    return (
      <div className="product-detail-page py-12">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <p className="text-text-secondary">O produto que você está procurando não existe ou foi removido.</p>
            {error && <p className="text-red-500 mt-2">Erro: {error}</p>}
          </div>
        </div>
      </div>
    );
  }

  // Check if product data is valid
  if (!productData.product_info) {
    return (
      <div className="product-detail-page py-12">
        <div className="container">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Dados do produto inválidos</h1>
            <p className="text-text-secondary">Os dados do produto não estão no formato esperado.</p>
          </div>
        </div>
      </div>
    );
  }

  const product = productData.product_info;
  const productImages = productData.product_image || [];
  const productReviews = productData.product_Review || [];
  const relatedProducts = productData.releted_products || [];

  // Fallback images if none provided
  const displayImages = productImages.length > 0 ? productImages : [
    { image_url: product.cover_image_url || 'https://via.placeholder.com/600x600?text=No+Image' }
  ];



  const handleVariantChange = (variantName: string, variantId: number) => {
    setSelectedVariant(prev => ({
      ...prev,
      [variantName]: variantId
    }));
  };

  const getSelectedVariantId = () => {
    const variantValues = Object.values(selectedVariant);
    return variantValues.length > 0 ? variantValues[0] : 0;
  };

  const handleAddToCart = () => {
    const variantId = getSelectedVariantId();
    addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.final_price),
      image: product.cover_image_url,
      quantity,
      variant: product.variant_product ? `Variant-${variantId}` : 'Standard',
      variantId: variantId
    });
  };

  const handleWishlistToggle = () => {
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

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiService.addReview({
        category_id: product.category_id.toString(),
        subcategory_id: '1', // Default subcategory
        product_id: product.id.toString(),
        rating_no: reviewForm.rating.toString(),
        title: reviewForm.title,
        description: reviewForm.description,
        status: '1'
      });

      if (response.status === 1) {
        // Reset form
        setReviewForm({ rating: 5, title: '', description: '' });
        setShowReviewForm(false);
        
        // Show success message
        alert('Review adicionado com sucesso!');
        
        // Refresh page to show new review
        window.location.reload();
      } else {
        alert('Erro ao adicionar review: ' + response.message);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Erro ao adicionar review. Tente novamente.');
    }
  };

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
                <span className="text-2xl font-bold">MT{product.final_price}</span>
                {product.sale_price && product.sale_price < product.price && (
                  <span className="text-xl text-text-secondary line-through">
                    MT{product.price}
                  </span>
                )}
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
                <span className="text-text-secondary">
                  ({productReviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Variant Selection - Only show if product has variants */}
            {product.variant_product === 1 && (productData as any).variant && (productData as any).variant.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">{(productData as any).variant[0].variant_name}</h3>
                <div className="flex gap-3 flex-wrap">
                  {(productData as any).variant[0].variant_list_data.map((variant: any) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange((productData as any).variant[0].variant_name, variant.id)}
                      className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-all ${
                        selectedVariant[(productData as any).variant[0].variant_name] === variant.id
                          ? 'border-secondary bg-primary text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span className="font-medium">{variant.name}</span>
                    </button>
                  ))}
                </div>
                {Object.keys(selectedVariant).length > 0 && (
                  <p className="text-sm text-text-secondary mt-2">
                    Variação selecionada: {(productData as any).variant[0].variant_list_data.find((v: any) => v.id === selectedVariant[(productData as any).variant[0].variant_name])?.name}
                  </p>
                )}
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="font-semibold mb-3">Quantidade</h3>
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

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-lg flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                ADICIONAR AO CARRINHO
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`btn btn-lg w-14 flex items-center justify-center ${
                  isInWishlist(product.id) 
                    ? 'btn-primary' 
                    : 'btn-secondary'
                }`}
              >
                <Heart 
                  size={20} 
                  className={isInWishlist(product.id) ? 'fill-current' : ''} 
                />
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
                Detalhes
              </button>
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'ingredients'
                    ? 'border-secondary text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                Material
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
                <h4 className="font-semibold mb-4">Especificações:</h4>
                <div 
                  className="text-text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: product.specification }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn btn-secondary"
            >
              {showReviewForm ? 'Cancelar' : 'Escrever Review'}
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Adicionar Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Avaliação</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                        className="text-2xl"
                      >
                        <Star
                          size={24}
                          className={`${
                            star <= reviewForm.rating
                              ? 'fill-current text-warning'
                              : 'text-gray-300'
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
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    placeholder="Ex: Excelente produto!"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descrição</label>
                  <textarea
                    value={reviewForm.description}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                    rows={4}
                    placeholder="Conte-nos sobre sua experiência com este produto..."
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Enviar Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancelar
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
                            className={`${
                              i < review.rating
                                ? 'fill-current text-warning'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.user_name}</span>
                    </div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                  </div>
                </div>

                <p className="text-text-secondary leading-relaxed mb-4">
                  {review.review}
                </p>

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
          <h2 className="text-2xl font-bold text-center mb-12">Você Também Pode Gostar</h2>
          <div className="grid grid-4 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;