import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
const Footer = () => {
  const location = useLocation();
  const handleShopLinkClick = e => {
    if (location.pathname === '/shop') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    // If not on /shop, the Link component will handle navigation and ScrollToTop will trigger
  };
  return <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-xl font-light tracking-tight text-gray-900">Home decor</span>
            <p className="mt-4 text-sm text-gray-600">
              Curated vintage home decor from Berlin.
            </p>
          </div>

          <div>
            <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Shop
            </span>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/shop" onClick={handleShopLinkClick} className="text-sm text-gray-600 hover:text-gray-900">All products</Link>
              </li>
              <li>
                <Link to="/shop" onClick={handleShopLinkClick} className="text-sm text-gray-600 hover:text-gray-900">Furniture</Link>
              </li>
              <li>
                <Link to="/shop" onClick={handleShopLinkClick} className="text-sm text-gray-600 hover:text-gray-900">Lighting</Link>
              </li>
              <li>
                <Link to="/shop" onClick={handleShopLinkClick} className="text-sm text-gray-600 hover:text-gray-900">Decor</Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </span>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">About us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-sm text-gray-600 hover:text-gray-900">
                  Shipping policy
                </Link>
              </li>
              <li>
                <Link to="/returns-policy" className="text-sm text-gray-600 hover:text-gray-900">
                  Returns policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Connect
            </span>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">© 2026 Dolfyn Brands LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;