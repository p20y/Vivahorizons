
import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProducts, getProductQuantities } from '@/api/EcommerceApi';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const isFeatureEnabled = searchParams.get('feature') === 'show';

  // Static images for featured collection
  const featuredCollectionImages = [
    '/images/Bergamot featured collection.png',
    '/images/Frankincense featured collection.png',
    '/images/jojoba oul featured collection.png',
    '/images/Orange featured collection.jpg'
  ];

  // Title mappings for featured collection based on image index
  const featuredCollectionTitles = [
    'Bergamot Oil',
    'Frankincense Oil',
    'Jojoba Oil',
    'Brazilian Orange Oil'
  ];

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch 4 products to be displayed in the featured collection
        const response = await getProducts({
          limit: 4
        });
        
        if (response.products.length > 0) {
           const productIds = response.products.map(p => p.id);
           const quantitiesResponse = await getProductQuantities({
             fields: 'inventory_quantity',
             product_ids: productIds
           });
           
           const variantQuantityMap = new Map();
           quantitiesResponse.variants.forEach(v => variantQuantityMap.set(v.id, v.inventory_quantity));
           
           const productsWithQuantities = response.products.map(product => ({
             ...product,
             variants: product.variants.map(variant => ({
               ...variant,
               inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
             }))
           }));

          setFeaturedProducts(productsWithQuantities);
        }
      } catch (err) {
        setError(err.message || "Failed to load featured products.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Handle scrolling to featured collection when navigating from other pages
  useEffect(() => {
    if (location.state?.scrollToFeatured || location.hash === '#featured-collection') {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const featuredSection = document.getElementById('featured-collection');
        if (featuredSection) {
          featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      // Clear the state to prevent scrolling on subsequent renders
      if (location.state?.scrollToFeatured) {
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, location.hash, navigate, location.pathname]);

  const handleSeeDetails = useCallback((e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFeatureEnabled) {
      navigate(`/product/${product.id}`, {
        state: {
          featuredImage: product.image
        }
      });
    }
  }, [navigate, isFeatureEnabled]);

  return (
    <>
      <Helmet>
        <title>Viva Earth - Naturally Crafted Products</title>
        <meta name="description" content="Discover naturally crafted products from Viva Earth, bringing sustainable and high-quality items to your space." />
      </Helmet>

      <div className="bg-white">
        <section className="relative min-h-[85vh] flex items-center pt-16 lg:pt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 mb-6">
                  Purely Crafted by Nature, For You.
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-lg text-gray-600 mb-8 max-w-lg"
                >
                  Premium essential oils and natural wellness products, responsibly sourced and thoughtfully crafted to elevate everyday rituals.
                </motion.p>
                <a href="https://www.amazon.com/s?k=Viva+Earth&ref=bl_dp_s_web_0" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6 text-base">
                    Shop Now on Amazon
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img
                      src="https://horizons-cdn.hostinger.com/3cba9943-6ccc-4d25-8e75-95aac06a5962/19c9c153918adc9a926310285dd75e60.png"
                      alt="Woman holding bottle of lavender essential oil and smiling"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                    <img
                      src="https://horizons-cdn.hostinger.com/3cba9943-6ccc-4d25-8e75-95aac06a5962/f9fea93c097dc8cf4b31654f63ea37cb.png"
                      alt="Two women conversing while one prepares essential oil drops"
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="space-y-4 pt-8">
                    <img
                      src="https://horizons-cdn.hostinger.com/3cba9943-6ccc-4d25-8e75-95aac06a5962/d26b7e930c44a498e3b0cdf2b9095d8f.png"
                      alt="Woman applying tea tree oil to her face with a dropper"
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                    <img
                      src="https://horizons-cdn.hostinger.com/3cba9943-6ccc-4d25-8e75-95aac06a5962/71b5f20e85bdf6ea0d220aa6a26e4464.png"
                      alt="Man holding a bottle of spearmint essential oil and smiling"
                      className="w-full h-64 object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="featured-collection" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-4">Featured collection</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Essential and Carrier Oils</p>
            </motion.div>

            {loading && (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 text-gray-900 animate-spin" />
              </div>
            )}

            {error && (
              <p className="text-center text-red-500">{error}</p>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
                {featuredProducts.map((product, index) => {
                  const featuredImage = featuredCollectionImages[index] || product.image;
                  // Use the title from the mapping array based on image index
                  const displayTitle = featuredCollectionTitles[index] || product.title;

                  const productContent = (
                    <>
                      <div className="relative overflow-hidden rounded-2xl mb-4 bg-gray-100 aspect-square">
                        <img
                          src={featuredImage}
                          alt={displayTitle}
                          className={`w-full h-full object-cover transition-transform duration-500 ${isFeatureEnabled ? 'group-hover:scale-105' : ''}`}
                        />
                        {isFeatureEnabled && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:hidden">
                            <Button 
                              onClick={(e) => handleSeeDetails(e, product)}
                              className="bg-white text-gray-900 hover:bg-white/90 rounded-full px-6 py-3 shadow-lg transform group-hover:scale-100 scale-90 transition-transform"
                              aria-label="See product details"
                            >
                              See Details
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1 text-center">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {displayTitle}
                        </h3>
                      </div>
                    </>
                  );

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group"
                    >
                      {isFeatureEnabled ? (
                        <Link to={`/product/${product.id}`} state={{ featuredImage: product.image }} className="block cursor-pointer">
                          {productContent}
                        </Link>
                      ) : (
                        <div className="block cursor-default">
                          {productContent}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="text-center mt-12">
              <a href="https://www.amazon.com/s?k=Viva+Earth&ref=bl_dp_s_web_0" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6">
                  Shop Now on Amazon
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex justify-start"
              >
                <img
                  src="https://horizons-cdn.hostinger.com/3cba9943-6ccc-4d25-8e75-95aac06a5962/29f6edb8a28577efba10408cfb2e0b4a.jpg"
                  alt="Four bottles of Viva Earth carrier oils (Jojoba, Castor, Moroccan Argan, Rosehip) with a message to try premium carrier oils for all your needs"
                  className="w-auto max-w-full h-[500px] object-cover rounded-2xl object-left"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-6">Curated with care</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Every product in our collection is thoughtfully chosen with intention and respect for nature. We focus on quality, integrity, and authenticity—selecting ingredients and formulations that feel timeless, purposeful, and true to their origins.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Viva Earth brings together nature-inspired wellness essentials designed to support everyday rituals. Each offering reflects our belief that wellness should feel warm, grounded, and naturally integrated into modern living.
                </p>
                <Link to="/about">
                  <Button className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6">
                    Learn More About Us
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
