import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useFeaturedProducts, useBestsellerProducts } from '../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  // API hooks for real data
  const { products: featuredProducts, loading: featuredLoading, error: featuredError } = useFeaturedProducts();
  const { products: bestsellerProducts, loading: bestsellerLoading, error: bestsellerError } = useBestsellerProducts();

  // Fallback products if API fails
  const fallbackProducts = [
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
    }
  ];

  // Use API products or fallback
  const displayFeaturedProducts = featuredProducts.length > 0 ? featuredProducts : fallbackProducts;
  const displayBestsellerProducts = bestsellerProducts.length > 0 ? bestsellerProducts : fallbackProducts;

  const heroSlides = [
    {
      id: 1,
      title: "EDILEYNE",
      subtitle: "BOLSAS PREMIUM",
      description: "Há nomes que definem um legado. Esta coleção não é sobre moda, é sobre o poder que escolhemos carregar, a identidade que revelamos ao mundo. Não se usa. Afirma-se.",
      buttonText: "O Ícone",
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG",
      link: "/products/bolsas"
    }
  ];

  const collections = [
    {
      id: 1,
      category: "Elegância que nunca sai de moda.",
      title: "Coleção",
      buttonText: "",
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_2065.PNG",
      link: "/products/bolsas",
      size: "large"
    },
    {
      id: 2,
      category: "",
      title: "Tendências",
      buttonText: "",
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_6392.JPG",
      link: "/products/sapatos",
      size: "medium"
    },
    {
      id: 3,
      category: "",
      title: "Novidades",
      buttonText: "",
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_0647.JPG",
      link: "/products/sapatos",
      size: "medium"
    },
    {
      id: 4,
      category: "",
      title: "Coleção",
      buttonText: "O seu próximo acessório espera por si.",
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG",
      link: "/products/bolsas",
      size: "hero"
    }
  ];
  

 const videos = [
  {
    id: 1,
    title: "",
    src: "https://chelevi.sparktechnology.cloud/chelevi/Videos/v1.mp4",
    thumbnail: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1252.JPG",
    duration: "",
  },
  {
    id: 2,
    title: "",
    src: "https://chelevi.sparktechnology.cloud/chelevi/Videos/v2.mp4",
    thumbnail: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1251.JPG",
    duration: "",
  },
  {
    id: 3,
    title: "",
    src: "https://chelevi.sparktechnology.cloud/chelevi/Videos/v3.mp4",
    thumbnail: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_2065.PNG",
    duration: "",
  },
];


  const instagramPosts = [
    {
      id: 1,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_2065.PNG",
      productId: 1
    },
    {
      id: 2,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG",
      productId: 2
    },
    {
      id: 3,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_6392.JPG",
      productId: 3
    },
    {
      id: 4,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1251.JPG",
      productId: 4
    },
    {
      id: 5,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_0646.JPG",
      productId: 2
    },
    {
      id: 6,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_2065.PNG",
      productId: 1
    }
    , {
      id: 7,
      image: "https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_2065.PNG",
      productId: 1
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="relative h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${slide.image})`
                }}
              >
                <div className="container h-full flex items-center">
                  <div className="max-w-lg text-white animate-fadeIn">
                    <p className="text-sm font-medium uppercase tracking-widest mb-4 opacity-90">
                      Novo Lançamento
                    </p>
                    <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl lg:text-3xl font-light mb-6 tracking-wide uppercase">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg mb-8 opacity-90 leading-relaxed">
                      {slide.description}
                    </p>
                    <Link
                      to={slide.link}
                      className="btn btn-primary btn-lg uppercase tracking-widest font-bold hover:scale-105 transition-transform"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-white'
                    : 'bg-white bg-opacity-40 hover:bg-opacity-60'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Collections Section - Replacing Shop by Category */}
      <section className="py-20 bg-white ">
        <div className="container">
          <div className="collections-grid mb-0">
            {/* Large Featured Collection */}
            <Link
              to={collections[0].link}
              className="collections-item collections-large group"
            >
              <div
                className="w-full h-full bg-cover bg-center rounded-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${collections[0].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                <div className="absolute top-8 left-8 text-white">
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight max-w-xs">
                    {collections[0].title} 
                  </h2>
                  <p className="text-sm font-medium mb-2 opacity-90">{collections[0].category}</p>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all">
                    <span>{collections[0].buttonText}</span>
                    
                  </div>
                </div>
              </div>
            </Link>

            {/* Medium Collections */}
            <Link
              to={collections[1].link}
              className="collections-item collections-medium group"
            >
              <div
                className="w-full h-full bg-cover bg-center rounded-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${collections[1].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-medium mb-1 opacity-90">{collections[1].category}</p>
                  <h3 className="text-xl font-bold leading-tight">
                    {collections[1].title}
                  </h3>
                </div>
              </div>
            </Link>

            <Link
              to={collections[2].link}
              className="collections-item collections-medium group"
            >
              <div
                className="w-full h-full bg-cover bg-center rounded-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${collections[2].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs font-medium mb-1 opacity-90">{collections[2].category}</p>
                  <h3 className="text-xl font-bold leading-tight">
                    {collections[2].title}
                  </h3>
                </div>
              </div>
            </Link>

            {/* Hero Collection */}
            <Link
              to={collections[3].link}
              className="collections-item collections-hero group"
            >
              <div
                className="w-full h-full bg-cover bg-center rounded-2xl overflow-hidden relative"
                style={{ backgroundImage: `url(${collections[3].image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-white max-w-md">
                  <p className="text-sm font-medium mb-2 opacity-90">{collections[3].category}</p>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                    {collections[3].title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-4 transition-all">
                    <span>{collections[3].buttonText}</span>
                   
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Product Showcase */}
      <section className="py-16 bg-gray-50 ">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
            O Coração do Atelier.
            </h2>
            <p className="text-center text-text-secondary mb-8 text-lg">
            Da arte do desenho à perícia da mão que cose, cada peça é uma sinfonia de dedicação. As nossas coleções não são produzidas, são compostas e pensadas para a mulher que reconhece a beleza que reside no detalhe
            </p>
          </div>
          
          {/* Responsive Product Grid */}
          <div className="relative">
            {/* Desktop: Horizontal Scroll */}
            <div className="hidden lg:flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth" id="products-scroll">
              {bestsellerLoading ? (
                <div className="flex items-center justify-center w-full py-8">
                  <div className="animate-spin w-6 h-6 border-2 border-secondary border-t-transparent rounded-full"></div>
                </div>
              ) : (
                bestsellerProducts.map((product: any) => (
                <div key={product.id} className="flex-none w-72 snap-start">
                  <ProductCard product={product} />
                </div>
                ))
              )}
            </div>
            
            {/* Mobile: Grid 2x2 */}
            <div className="grid grid-cols-2 gap-4 lg:hidden">
              {bestsellerProducts.slice(0, 6).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Navigation Arrows - Desktop Only */}
            <button
              onClick={() => {
                const container = document.getElementById('products-scroll');
                if (container) {
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
              className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => {
                const container = document.getElementById('products-scroll');
                if (container) {
                  container.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
              className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all z-10"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Scroll indicators - Desktop Only */}
            <div className="hidden lg:flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(featuredProducts.length / 3) }).map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-outline btn-lg uppercase tracking-widest">
              VER TODOS OS PRODUTOS
            </Link>
          </div>
        </div>
      </section>


      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
            A Alma em Movimento.
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Uma peça <strong>CheLevi</strong>  não é estática. Ganha vida nas suas mãos, em cada gesto, em cada passo. Os nossos vídeos não mostram acessórios. Mostram energia, detalhe e a alma vibrante da marca.
            </p>
          </div>

         <div className="grid lg:grid-cols-3 gap-8">
  {videos.map((video) => (
    <div key={video.id} className="group cursor-pointer">
      <div className="relative h-[460px] sm:h-[520px] lg:h-[560px] rounded-2xl overflow-hidden mb-4">
        {/* TROCA AQUI */}
        <video
          src={video.src}
          poster={video.thumbnail}          // usa o mesmo thumbnail como poster
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        {/* resto fica exatamente como já tens */}
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
        <div className="absolute inset-0 flex items-center justify-center">
         
        </div>
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
          {video.duration}
        </div>
      </div>
      <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">
        {video.title}
      </h3>
    </div>
  ))}
</div>

        </div>
      </section>
     {/* Best Sellers Section with Horizontal Scroll */}
     <section className="py-20 bg-white">
  <div className="container">
    <div className="text-center mb-16">
      <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-wide">
      O Coração do Atelier.
      </h2>
      <p className="text-center text-text-secondary mb-8 text-lg">
        Os produtos favoritos dos nossos clientes
      </p>
    </div>

    <div className="relative">
      {/* Horizontal Scroll Container */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth" id="bestsellers-scroll">
        {bestsellerLoading ? (
          <div className="flex items-center justify-center w-full py-8">
            <div className="animate-spin w-6 h-6 border-2 border-secondary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          // Duplica os produtos se houver menos de 3 para preencher o espaço
          [...displayBestsellerProducts, ...displayBestsellerProducts].map((product: any, index: number) => (
            <div key={`bestseller-${product.id}-${index}`} className="flex-none w-72 snap-start">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          const container = document.getElementById('bestsellers-scroll');
          if (container) {
            container.scrollBy({ left: -300, behavior: 'smooth' });
          }
        }}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all z-10 hover:scale-110"
      >
        <ChevronLeft size={20} className="text-gray-600" />
      </button>
      <button
        onClick={() => {
          const container = document.getElementById('bestsellers-scroll');
          if (container) {
            container.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition-all z-10 hover:scale-110"
      >
        <ChevronRight size={20} className="text-gray-600" />
      </button>

      {/* Scroll Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: Math.ceil(displayBestsellerProducts.length / 3) }).map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-gray-300 hover:bg-secondary transition-colors cursor-pointer"></div>
        ))}
      </div>
    </div>

    <div className="text-center mt-12">
      <Link to="/products" className="btn btn-primary btn-lg uppercase tracking-widest">
        VER MAIS VENDIDOS
      </Link>
    </div>
  </div>
</section>


      {/* Dessert in a Mist Section */}
      <section className="py-20 bg-gradient-to-r from-[#f5f5dc] to-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Product Image */}
            <div className="relative">
              <div className="bg-gradient-to-br  rounded-3xl p-8 h-106 flex items-center justify-center">
                <img
                  src="https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_2065.PNG"
                  alt="poder, elegância e identidade"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl  text-black uppercase tracking-wide">
              Uma Vida, Uma Peça.
              </h2>
              
              <div className="space-y-4 text-gray-600">
                <p className="text-lg leading-relaxed">
                As suas conquistas, as suas noites, os seus sonhos, cada peça {' '}
                  <span className="font-semibold text-gray-800">CheLevi</span>{' '}é um fragmento da sua vida. Não as criamos para as vitrinas; criamo-las para as suas mãos, para a sua jornada. Para serem as guardiãs silenciosas da sua história.
                 
                </p>
                
                <p className="leading-relaxed font-semibold">
                Encontre a sua Guardiã
                </p>
              </div>

              
              <button onClick={() => navigate('/products/')} className="btn btn-outline border-gray-400 text-gray-700 hover:bg-gray-700 hover:text-white px-8 py-3 rounded-none uppercase tracking-wider">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>
      

      {/* The Cosmic Universe */}
      <section className="py-20 bg-gray-500 text-white overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slideUp">
              <h2 className="text-4xl lg:text-5xl font-semi bold tracking-wide uppercase">
                O
                <br />
                <span className="text-secondary text-white">UNIVERSO CHELEVI</span>
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
              Cada peça é uma constelação. Juntas, formam um universo de estilo e poder.
              <br />
              Aqui não se encontram apenas acessórios, encontram-se afirmações. Cada uma delas à espera de ser a sua.

              </p>
              <Link
                to="/products/bolsas"
                className="btn btn-primary btn-lg uppercase tracking-widest"
              >
                EXPLORAR
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://chelevi.sparktechnology.cloud/chelevi/Banners/IMG_1276.JPG"
                alt="Cosmic Universe Collection"
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed - Bento Grid */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl  text-center mb-16 uppercase tracking-wide text-">
          Looks Que Inspiram
          </h2>
          
          {/* Instagram Bento Grid Layout */}
          <div className="bento-grid">
            {/* Large featured post */}
            <Link
              to={`/product/${instagramPosts[0].productId}`}
              className="bento-item bento-large group"
            >
              <img
                src={instagramPosts[0].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={32} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Medium posts */}
            <Link
              to={`/product/${instagramPosts[1].productId}`}
              className="bento-item bento-medium group"
            >
              <img
                src={instagramPosts[1].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            <Link
              to={`/product/${instagramPosts[2].productId}`}
              className="bento-item bento-medium group"
            >
              <img
                src={instagramPosts[2].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Small posts */}
            <Link
              to={`/product/${instagramPosts[3].productId}`}
              className="bento-item bento-small group"
            >
              <img
                src={instagramPosts[3].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={20} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            <Link
              to={`/product/${instagramPosts[4].productId}`}
              className="bento-item bento-small group"
            >
              <img
                src={instagramPosts[4].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={20} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            <Link
              to={`/product/${instagramPosts[5].productId}`}
              className="bento-item bento-small group"
            >
              <img
                src={instagramPosts[5].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={20} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Wide post */}
            <Link
              to={`/product/${instagramPosts[0].productId}`}
              className="bento-item bento-wide group"
            >
              <img
                src={instagramPosts[1].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>

            {/* Tall post */}
            <Link
              to={`/product/${instagramPosts[2].productId}`}
              className="bento-item bento-tall group"
            >
              <img
                src={instagramPosts[2].image}
                alt="Instagram post"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <ShoppingBag 
                  size={28} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"
                />
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg uppercase tracking-widest border-black-400 text-black hover:bg-black hover:text-white"
            >
              FOLLOW @CheLevi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;