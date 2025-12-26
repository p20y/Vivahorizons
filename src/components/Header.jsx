
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Instagram, Facebook, Twitter, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { AnimatePresence, motion } from 'framer-motion';

const Header = ({ setIsCartOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cartItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isFeatureEnabled = searchParams.get('feature') === 'show';
  const isHomePage = location.pathname === '/';

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleShopClick = (e) => {
    // If feature is not "show", scroll to featured collection on home page
    if (!isFeatureEnabled) {
      e.preventDefault();
      if (isHomePage) {
        // We're already on home page, just scroll
        const featuredSection = document.getElementById('featured-collection');
        if (featuredSection) {
          featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // We're on a different page, navigate to home with hash, then scroll
        navigate('/', { state: { scrollToFeatured: true } });
      }
    }
    // If feature is "show", let the default Link behavior handle navigation to /shop
  };

  const navLinks = [
    { path: '/shop', label: 'Shop', isShop: true },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  
    useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img src="https://horizons-cdn.hostinger.com/3cba9943-6ccc-4d25-8e75-95aac06a5962/2f7934ce578af57d6a7394ad4f085172.png" alt="Viva Earth logo" className="h-20 sm:h-24 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                link.isShop ? (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleShopClick}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-gray-900'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            <div className="flex items-center space-x-4">
               <div className="hidden sm:flex items-center space-x-4">
                   <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-900 hover:text-gray-600 transition-colors"
                aria-label={`Open cart with ${totalItems} items`}
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-gray-900 hover:text-gray-600 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 h-full w-full max-w-xs bg-white shadow-lg flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b">
                 <img src="https://horizons-cdn.hostinger.com/3cba9943-6ccc-4d25-8e75-95aac06a5962/2f7934ce578af57d6a7394ad4f085172.png" alt="Viva Earth logo" className="h-16 w-auto" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  aria-label="Close menu"
                >
                  <X size={36} />
                </button>
              </div>
              <nav className="flex-grow p-4">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.path}>
                      {link.isShop ? (
                        <Link
                          to={link.path}
                          onClick={handleShopClick}
                          className={`block w-full text-left px-4 py-3 text-lg font-medium rounded-lg ${
                            location.pathname === link.path
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          to={link.path}
                          className={`block w-full text-left px-4 py-3 text-lg font-medium rounded-lg ${
                            location.pathname === link.path
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
