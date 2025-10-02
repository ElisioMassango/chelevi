import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import {
  useCategoryProducts,
  useBestsellerProducts,
  useFeaturedProducts,
  useAllProducts,
} from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  category_id: number;
  brand_id?: number | null;
  cover_image_url?: string;
  final_price?: string | number;
  price?: number;
  sale_price?: number;
  [key: string]: any;
}

interface ApiCategoryItem {
  id: number;
  name: string;
  slug: string;
  total_product?: number;
}

// Pre-defined price ranges for filtering
const priceRanges = [
  { id: 'range1', label: 'Até MT500', min: 0, max: 500 },
  { id: 'range2', label: 'MT500 - MT1000', min: 500, max: 1000 },
  { id: 'range3', label: 'MT1000 - MT1500', min: 1000, max: 1500 },
  { id: 'range4', label: 'Acima de MT1500', min: 1500, max: Infinity },
];

// Mapping of brand IDs to human-readable names
const brandMapping: Record<number, string> = {
  1: 'CheLevi',
  2: 'Premium Line',
};

const Products: React.FC = () => {
  // React Router param for category slug
  const { category: categoryParam } = useParams<{ category?: string }>();

  // State for sorting option
  const [sortBy, setSortBy] = useState('all');
  // Sidebar visibility
  const [showFilters, setShowFilters] = useState(false);
  // States for selected filters
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  // Load categories from API
  const { categories: apiCategories = [] } = useCategories();

  // Normalize categories, creating a clean route slug
  const categories = useMemo(() => {
    return (apiCategories as ApiCategoryItem[]).map((cat) => {
      // Extract route slug: remove any prefix like "collections/"
      const routeSlug = cat.slug?.split('/').pop()?.toLowerCase() || cat.name.toLowerCase();
      return {
        id: cat.id,
        name: cat.name,
        count: cat.total_product || 0,
        apiSlug: cat.slug,
        routeSlug,
      };
    });
  }, [apiCategories]);

  // Determine selected category based on route
  const selectedCategory = useMemo(() => {
    if (!categoryParam) return undefined;
    return categories.find((c) => c.routeSlug === categoryParam.toLowerCase());
  }, [categories, categoryParam]);

  // Load products from hooks
  const categoryHookKey = selectedCategory?.apiSlug || categoryParam || '';
  const {
    products: catHookProducts,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryProducts(categoryHookKey);
  const {
    products: bestsellerProducts,
    loading: bestsellerLoading,
    error: bestsellerError,
  } = useBestsellerProducts();
  const {
    products: featuredProducts,
    loading: featuredLoading,
    error: featuredError,
  } = useFeaturedProducts();
  const {
    products: allProductsRaw,
    loading: allLoading,
    error: allError,
  } = useAllProducts();

  // Normalize data lists (some APIs return data.data)
  const normalizeList = (src: any): ApiProduct[] => {
    if (!src) return [];
    if (Array.isArray(src)) return src;
    if (src.data?.data && Array.isArray(src.data.data)) return src.data.data;
    if (src.data && Array.isArray(src.data)) return src.data;
    return [];
  };

  const allProducts = normalizeList(allProductsRaw);
  const categoryProducts = normalizeList(catHookProducts);
  const bestsellers = normalizeList(bestsellerProducts);
  const featured = normalizeList(featuredProducts);

  // Fallback: if useCategoryProducts hook doesn't filter by category, filter client-side
  const clientFilteredByCategory = useMemo(() => {
    if (!selectedCategory) return [];
    return allProducts.filter((p) => p.category_id === selectedCategory.id);
  }, [allProducts, selectedCategory]);

  // Decide which base products list to show, based on sort & category
  const getProductsToShow = (): ApiProduct[] => {
    if (selectedCategory) {
      // Prioritize hook result; fallback to client filter
      if (categoryProducts && categoryProducts.length > 0) return categoryProducts;
      return clientFilteredByCategory;
    }

    let list: ApiProduct[] = [];
    switch (sortBy) {
      case 'bestsellers':
        list = bestsellers;
        break;
      case 'featured':
        list = featured;
        break;
      case 'price-low':
        list = [...allProducts].sort(
          (a, b) =>
            Number(a.final_price ?? a.price ?? 0) -
            Number(b.final_price ?? b.price ?? 0),
        );
        break;
      case 'price-high':
        list = [...allProducts].sort(
          (a, b) =>
            Number(b.final_price ?? b.price ?? 0) -
            Number(a.final_price ?? a.price ?? 0),
        );
        break;
      case 'newest':
        list = [...allProducts].sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case 'rating':
        list = [...allProducts].sort(
          (a, b) => Number(b.average_rating ?? 0) - Number(a.average_rating ?? 0),
        );
        break;
      case 'all':
      default:
        list = allProducts;
        break;
    }
    return list;
  };

  const baseProducts = getProductsToShow();

  // Apply filters to base list
  const filteredByFilters = useMemo(() => {
    let filtered: ApiProduct[] = baseProducts;

    // Category filter (checkbox) – this is separate from the route-based filter
    if (selectedCategoryFilters.length > 0) {
      filtered = filtered.filter((p) => selectedCategoryFilters.includes(p.category_id));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => {
        if (p.brand_id === null || p.brand_id === undefined) return false;
        return selectedBrands.includes(p.brand_id);
      });
    }

    // Price ranges
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) => {
        const price = Number(p.final_price ?? p.price ?? 0);
        return selectedPriceRanges.some((rangeId) => {
          const range = priceRanges.find((r) => r.id === rangeId);
          if (!range) return true;
          return price >= range.min && price <= range.max;
        });
      });
    }

    return filtered;
  }, [baseProducts, selectedCategoryFilters, selectedBrands, selectedPriceRanges]);

  const finalProducts = filteredByFilters && filteredByFilters.length > 0 ? filteredByFilters : [];

  // Determine loading and error state
  const loading = selectedCategory
    ? categoryLoading && clientFilteredByCategory.length === 0
    : sortBy === 'bestsellers'
    ? bestsellerLoading
    : sortBy === 'featured'
    ? featuredLoading
    : allLoading;

  const error = selectedCategory
    ? categoryError
    : sortBy === 'bestsellers'
    ? bestsellerError
    : sortBy === 'featured'
    ? featuredError
    : allError;

  // Category title for the page
  const categoryTitle = selectedCategory ? selectedCategory.name : 'Todos os Produtos';

  // Count of products shown
  const totalProducts = finalProducts.length;

  // Generate brand list from brandMapping for the filter panel
  const brandList = useMemo(() => {
    return Object.entries(brandMapping).map(([id, name]) => ({
      id: Number(id),
      name,
    }));
  }, []);

  // Filter change handlers
  const handlePriceRangeChange = (id: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const handleCategoryFilterChange = (id: number) => {
    setSelectedCategoryFilters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleBrandChange = (id: number) => {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setSelectedPriceRanges([]);
    setSelectedCategoryFilters([]);
    setSelectedBrands([]);
    setShowFilters(false);
  };

  // Fallback to mock products if API returns nothing or error
  const mockProducts: ApiProduct[] = [];
  const displayProducts = !error && finalProducts.length > 0 ? finalProducts : mockProducts;

  return (
    <div className="products-page py-12">
      <div className="container">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 uppercase tracking-wide">
            {categoryTitle}
          </h1>
          <p className="text-text-secondary text-lg">
            Descubra a nossa coleção premium de bolsas e sapatos feitos à mão com materiais de alta qualidade. Elegância e durabilidade em cada peça.
          </p>
        </div>

        {/* Quick Categories */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {/* All Products button */}
          <Link
            to="/products"
            className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
              !selectedCategory
                ? 'border-secondary text-accent bg-secondary/10'
                : 'border-gray-300 hover:border-secondary hover:text-accent'
            }`}
            onClick={() => setSortBy('all')}
          >
            Todos os Produtos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products/${cat.routeSlug}`}
              className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${
                selectedCategory?.routeSlug === cat.routeSlug
                  ? 'border-secondary text-accent bg-secondary/10'
                  : 'border-gray-300 hover:border-secondary hover:text-accent'
              }`}
              onClick={() => setSortBy('all')}
            >
              {cat.name} ({cat.count})
            </Link>
          ))}
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-text-secondary">{totalProducts} produtos</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm font-medium focus:outline-none focus:border-secondary"
              >
                <option value="all">Ordenar por: Todos</option>
                <option value="featured">Destaque</option>
                <option value="bestsellers">Mais Vendidos</option>
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
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-text-secondary">Carregando produtos...</p>
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 mb-4">Erro ao carregar produtos: {String(error)}</p>
              <p className="text-text-secondary mb-4">Mostrando produtos de exemplo:</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {mockProducts.map((product) => (
                  <ProductCard key={product.id} product={product as any} />
                ))}
              </div>
            </div>
          ) : finalProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-text-secondary mb-4">Nenhum produto encontrado nos filtros selecionados.</p>
            </div>
          ) : (
            finalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Load More (placeholder) */}
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
                <button onClick={() => setShowFilters(false)} className="text-2xl">
                  ×
                </button>
              </div>
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Faixa de Preço</h3>
                <div className="space-y-3">
                  {priceRanges.map((range) => (
                    <label
                      key={range.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary"
                        checked={selectedPriceRanges.includes(range.id)}
                        onChange={() => handlePriceRangeChange(range.id)}
                      />
                      <span className="text-sm font-medium">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Category Filters */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Categoria</h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary"
                        checked={selectedCategoryFilters.includes(cat.id)}
                        onChange={() => handleCategoryFilterChange(cat.id)}
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Brand Filters */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Marca</h3>
                <div className="space-y-3">
                  {brandList.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4 text-secondary rounded focus:ring-secondary"
                        checked={selectedBrands.includes(brand.id)}
                        onChange={() => handleBrandChange(brand.id)}
                      />
                      <span className="text-sm">{brand.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Apply and Clear Filters */}
              <button
                onClick={handleApplyFilters}
                className="w-full btn btn-primary mb-4"
              >
                Aplicar Filtros
              </button>
              <button
                onClick={handleClearFilters}
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
