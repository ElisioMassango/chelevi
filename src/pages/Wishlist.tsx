import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X, ArrowLeft, Star } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

const Wishlist: React.FC = () => {
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
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Sua Lista de Desejos está Vazia</h1>
            <p className="text-text-secondary mb-8 text-lg">
              Adicione produtos que você ama à sua lista de desejos para encontrá-los facilmente mais tarde.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg inline-flex items-center gap-2">
              <ArrowLeft size={20} />
              Descobrir Produtos
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
              <h1 className="text-3xl font-bold text-gray-800">Lista de Desejos</h1>
              <p className="text-text-secondary">{items.length} {items.length === 1 ? 'item' : 'itens'} salvos</p>
            </div>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm text-red-500 hover:text-red-700 transition-colors font-medium"
            >
              Limpar Lista
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
                    Adicionar ao Carrinho
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
                    Em estoque
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 btn btn-primary btn-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    Adicionar
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
            <h3 className="text-xl font-bold mb-4">Continue Descobrindo</h3>
            <p className="text-text-secondary mb-6">
              Explore nossa coleção completa e encontre mais produtos incríveis para adicionar à sua lista de desejos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn btn-primary">
                Ver Todos os Produtos
              </Link>
              <Link to="/products/cabelo" className="btn btn-outline">
                Produtos para Cabelo
              </Link>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {items.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Você Também Pode Gostar</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Mock recommended products */}
                {[1, 2, 3, 4].map((id) => (
                  <Link key={id} to={`/product/${id}`} className="group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <img
                        src={`https://crm.sparktech.pt/assets/shopfcc/shop${id}.jpg`}
                        alt={`Produto ${id}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-medium text-sm mb-1 group-hover:text-accent transition-colors">
                      Produto Recomendado {id}
                    </h4>
                    <p className="text-sm font-bold">MT{450 + id * 100}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;