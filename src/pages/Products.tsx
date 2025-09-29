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
    },
    {
      id: 5,
      name: "Edileyne Mel",
      price: 7300,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Products/IMG_1278.PNG",
      secondImage: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1252.JPG",
      rating: 4.5,
      reviews: 203,
      badge: "MAIS VENDIDO",
      colors: [],
      category: "bolsas"
    },
    {
      id: 6,
      name: "Edileyne Vermelha",
      price: 980,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Products/IMG_1280.PNG",
      secondImage: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_6390.JPG",
      rating: 4.9,
      reviews: 78,
      badge: "EDIÇÃO LIMITADA",
      colors: [],
      category: "bolsas"
    }
  ];
  
  const categories = [
    { name: 'Bolsas', count: 12 },
    { name: 'Sapatos', count: 8 },
    { name: 'Carteiras', count: 24 },
    { name: 'Coleções', count: 18 },

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
            Descubra nossa coleção premium de bolsas e sapatos feitos à mão com
            materiais de alta qualidade. Elegância e durabilidade em cada peça.
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12">
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
                <div className="space-y-3">
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm font-medium">Até MT500</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">MT500 - MT1000</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">MT1000 - MT1500</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">Acima de MT1500</span>
                  </label>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Categoria</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">Bolsas</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">Sapatos</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">Carteiras</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">Coleções</span>
                  </label>
                </div>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Marca</h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">CheLevi</span>
                  </label>
                  <label className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input type="checkbox" className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary" />
                    <span className="text-sm">Premium Line</span>
                  </label>
                </div>
              </div>

              {/* Apply Filters */}
              <button
                onClick={() => setShowFilters(false)}
                className="w-full btn btn-primary mb-4"
              >
                Aplicar Filtros
              </button>
              
              <button
                onClick={() => setShowFilters(false)}
                className="w-full btn btn-outline"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;