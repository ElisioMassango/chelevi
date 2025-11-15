import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  product?: {
    name: string;
    price: string;
    image: string;
    description?: string;
    availability?: 'in stock' | 'out of stock' | 'preorder';
  };
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = 'CheLevi - Moda Elegante e Sofisticada',
  description = 'Descubra a elegância e sofisticação da CheLevi. Moda premium, bolsas exclusivas e acessórios únicos. Entrega em Moçambique e Portugal.',
  keywords = 'CheLevi, moda, bolsas, acessórios, elegância, sofisticação, Moçambique, Portugal, e-commerce',
  image = 'https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png',
  type = 'website',
  product,
  structuredData
}) => {
  const location = useLocation();
  const baseUrl = 'https://chelevi.sparktechnology.cloud';
  const currentUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'CheLevi');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('theme-color', '#8B4E6F');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'CheLevi', true);
    updateMetaTag('og:locale', 'pt_BR', true);
    updateMetaTag('og:locale:alternate', 'en_US', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Update lang attribute
    document.documentElement.setAttribute('lang', 'pt-BR');

    // Structured Data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(structuredDataScript);
    }

    // Default structured data
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Store',
      name: 'CheLevi',
      description: 'Moda elegante e sofisticada. Bolsas exclusivas e acessórios únicos.',
      url: baseUrl,
      logo: 'https://chelevi.sparktechnology.cloud/chelevi/Logos/CHE-LEVI-02.png',
      image: image,
      telephone: '+258 85 2232423',
      email: 'info@chelevi.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Rua da Resistência n° 1550, R/C',
        addressLocality: 'Maputo',
        addressCountry: 'MZ'
      },
      sameAs: [
        'https://www.instagram.com/chelevi',
        'https://www.facebook.com/chelevi'
      ],
      priceRange: '$$',
      currenciesAccepted: 'MZN, EUR',
      paymentAccepted: 'Cash, Credit Card, M-Pesa'
    };

    // Product structured data if product is provided
    if (product) {
      const productStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description || description,
        image: product.image,
        offers: {
          '@type': 'Offer',
          price: product.price,
          priceCurrency: 'MZN',
          availability: `https://schema.org/${product.availability === 'in stock' ? 'InStock' : product.availability === 'out of stock' ? 'OutOfStock' : 'PreOrder'}`,
          url: currentUrl,
          seller: {
            '@type': 'Organization',
            name: 'CheLevi'
          }
        },
        brand: {
          '@type': 'Brand',
          name: 'CheLevi'
        }
      };
      structuredDataScript.textContent = JSON.stringify(productStructuredData);
    } else if (structuredData) {
      structuredDataScript.textContent = JSON.stringify(structuredData);
    } else {
      structuredDataScript.textContent = JSON.stringify(defaultStructuredData);
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on cleanup as they should persist
    };
  }, [title, description, keywords, image, type, currentUrl, product, structuredData]);

  return null;
};

export default SEO;



