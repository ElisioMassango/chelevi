import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const products = [
    {
      id: 1,
      name: "Lip Butter",
      price: 450,
      originalPrice: 550,
      image: "https://kyliecosmetics.com/cdn/shop/files/KJC_LIP_25_PeachMango_Stylized_Open.jpg?crop=center&height=600&v=1752094667&width=600",
      secondImage: "https://kyliecosmetics.com/cdn/shop/files/KJS_LIB_25_LipMacro_PeachMango_01_WS_800x.jpg?v=1752094667",
      rating: 4.8,
      reviews: 245,
      badge: "NOVIDADE",
      colors: [],
      category: "cabelo"
    },
    {
      id: 2,
      name: "Condicionador Nutritivo com Argan",
      price: 1200,
      image: "https://fentybeauty.com/cdn/shop/files/FS_FALL25_T2PRODUCT_ECOMM_BODY-MILK_SALTED-CARAMEL_1200X1500_72DPI_900x1100.jpg?v=1754005575",
      secondImage: "https://cdn.shopify.com/s/files/1/0341/3458/9485/files/FS689758_GLOBAL_FALL_24_INFOGRAPHICS_1200x1500_BUTTA_DROP_BODY_MILK_BANDA_Mariam_OP1.jpg?v=1754005575&width=2048",
      rating: 4.9,
      reviews: 128,
      badge: "MAIS VENDIDO",
      colors: [],
      category: "cabelo"
    },
    {
      id: 3,
      name: "Gloss Bomb",
      price: 890,
      image: "https://cdn.shopify.com/s/files/1/0341/3458/9485/files/FB_FALL24_T2PRODUCT_ECOMM_GBSTICK_BLACKRBERRY_OPEN_1200x1500_72DPI.jpg?v=1719531134&width=2048",
      secondImage: "https://cdn.shopify.com/s/files/1/0341/3458/9485/files/FB_SMR24_T2BEAUTY_GB-STIX_BLACKRBERRY_PROFILTER-498_LEAH_1200X1500_72DPI_1.jpg?v=1719531134&width=2048",
      rating: 4.7,
      reviews: 89,
      badge: "FAVORITO",
      colors: [],
      category: "cabelo"
    },
    {
      id: 4,
      name: "Óleo de Argan Puro 50ml",
      price: 650,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop2.jpg",  
      secondImage: "https://crm.sparktech.pt/assets/shopfcc/shop4.jpg",
      rating: 4.6,
      reviews: 156,
      badge: "TOP",
      colors: [],
      category: "cabelo"
    },
    {
      id: 5,
      name: "Sérum Anti-Frizz 30ml",
      price: 750,
      image: "https://crm.sparktech.pt/assets/shopfcc/sho12.jpg",
      secondImage: "https://crm.sparktech.pt/assets/shopfcc/shop13.jpg",
      rating: 4.5,
      reviews: 203,
      badge: "MAIS VENDIDO",
      colors: [],
      category: "cabelo"
    },
    {
      id: 6,
      name: "Kit Reconstrutor 3 Passos",
      price: 980,
      image: "https://crm.sparktech.pt/assets/shopfcc/shop14.jpg",
      secondImage: "https://crm.sparktech.pt/assets/shopfcc/shop15.jpg",
      rating: 4.9,
      reviews: 78,
      badge: "EDIÇÃO LIMITADA",
      colors: [],
      category: "cabelo"
    }
  ];
  
  const categories = [
    { name: 'cabelo', count: 12 },
    { name: 'Mais Vendidos', count: 8 },
    { name: 'Shampoos', count: 24 },
    { name: 'Condicionadores', count: 18 },
    { name: 'Tratamentos & Máscaras', count: 16 },
    { name: 'Óleos & Séruns', count: 6 }
  ];
  
  const filteredProducts = category 
    ? products.filter(product => product.category === category)
    : products;

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'All Products';

  const totalProducts = filteredProducts.length;

  return (
    <div className="products-page py-12">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wide">
            {categoryTitle}
          </h1>
          <p className="text-text-secondary text-lg">
            Descubra nossa coleção premium de cosméticos e produtos de beleza
          </p>
        </div>

        {/* Quick Categories */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {categories.map((cat, index) => (
            <button
              key={index}
              className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium hover:border-secondary hover:text-accent transition-all"
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-text-secondary">
              {totalProducts} produtos
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:border-secondary"
              >
                <option value="featured">Ordenar por: Destaque</option>
                <option value="price-low">Preço: Baixo para Alto</option>
                <option value="price-high">Preço: Alto para Baixo</option>
                <option value="newest">Novos</option>
                <option value="rating">Avaliação Mais Alta</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:border-secondary hover:text-accent transition-all"
            >
              <Filter size={16} />
              Filtrar
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-4 gap-8 mb-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="btn btn-outline btn-lg uppercase tracking-widest">
            Carregar Mais Produtos
          </button>
        </div>
      </div>

      {/* Filter Sidebar */}
      {showFilters && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
          <div className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filtros</h2>
                <button onClick={() => setShowFilters(false)} className="text-2xl">×</button>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Faixa de Preço</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Under MT500</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">MT500 - MT1000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">MT1000 - MT1500</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Over MT1500</span>
                  </label>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Categoria</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Lips</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Face</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Eyes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Fragrance</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Skin Care</span>
                  </label>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Marca</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">SI Cosmetics</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Premium Line</span>
                  </label>
                </div>
              </div>

              {/* Apply Filters */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full btn btn-primary"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;