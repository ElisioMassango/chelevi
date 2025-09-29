import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Minus, Plus, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Mock product data
 // Dados mockados de produto
const product = {
  id: parseInt(id || '1'),
  name: "Edileyne Preta",
  price: 7300,
  rating: 4.8,
  reviews: 245,
  images: [
     "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1251.JPG",
    "https://chelevi.sparktechnology.cloud/chelevi/Products/IMG_1277.PNG", 
    "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1289.PNG"
  ],
  variants: [
    { name: "Preta", color: "#030302ff" },

  ],
  description: "A Edileyne é mais do que uma bolsa é uma afirmação. Feita para mulheres que sabem o que querem, ela mistura sofisticação atemporal com um design moderno e funcional.Com estrutura firme, acabamento impecável e um interior surpreendentemente espaçoso, é perfeita para o dia a dia de quem não abdica da elegância, mesmo nas rotinas mais intensas. Seja para um brunch de negócios ou um evento especial, a Edileyne adapta-se com graciosidade."
,
  features: [
    "Alça confortável, fecho seguro e detalhes metálicos com assinatura CheLev",

  ],
  ingredients: "Couro sintético premium de alta durabilidade"
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

const reviews = [

];


  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: `${product.name} - ${product.variants[selectedVariant].name}`,
      price: product.price,
      image: product.images[0],
      quantity,
      variant: product.variants[selectedVariant].name
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
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
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-secondary' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
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
                <span className="text-2xl font-bold">MT{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-text-secondary line-through">
                    MT{product.originalPrice}
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
                        i < Math.floor(product.rating)
                          ? 'fill-current text-warning'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{product.rating}</span>
                </div>
                <span className="text-text-secondary">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Variant Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(index)}
                    className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-all ${
                      selectedVariant === index 
                        ? 'border-secondary bg-primary' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: variant.color }}
                    />
                    <span className="text-sm font-medium">{variant.name}</span>
                  </button>
                ))}
              </div>
            </div>

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
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="w-2 h-2 bg-secondary rounded-full" />
                    {feature}
                  </li>
                ))}
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
                <p className="text-text-secondary leading-relaxed mb-6">
                  {product.description}
                </p>
                <h4 className="font-semibold mb-4">Product Features:</h4>
                <ul className="grid grid-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h4 className="font-semibold mb-4">Lista Completa de Materiais:</h4>
                <p className="text-text-secondary leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <button className="btn btn-secondary">Write a Review</button>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-6">
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
                      <span className="font-medium">{review.author}</span>
                      <span className="text-sm text-text-secondary">{review.date}</span>
                    </div>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                  </div>
                </div>

                {review.hasVideo && (
                  <div className="mb-4">
                    <div className="w-48 h-36 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={review.videoThumbnail}
                        alt="Review video"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <p className="text-text-secondary leading-relaxed mb-4">
                  {review.content}
                </p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.images[0]}
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