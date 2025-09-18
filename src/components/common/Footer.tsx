'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { FaFacebook } from 'react-icons/fa';
import { BsInstagram, BsMailbox, BsTwitterX } from 'react-icons/bs';
import { CgShoppingCart } from 'react-icons/cg';


export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 lg:col-span-2">
              <Link 
                href={`/${locale}`} 
                className="flex items-center space-x-2 text-2xl font-bold mb-4"
              >
                <CgShoppingCart className="h-8 w-8 text-primary-400" />
                <span>Store</span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                Modern e-commerce platform offering the best products at competitive prices. 
                Shop with confidence and enjoy fast, secure delivery.
              </p>
              
              {/* Newsletter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t('newsletter')}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="btn-primary whitespace-nowrap">
                  <BsMailbox className="h-4 w-4 mr-2" />
                  Subscribe
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href={`/${locale}`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/products`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/cart`} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t('aboutUs')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t('contactUs')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t('privacyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {t('termsOfService')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 sm:mb-0">
              © 2024 E-Commerce Store. {t('allRightsReserved')}.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">{t('followUs')}:</span>
              <div className="flex space-x-3">
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaFacebook className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <BsTwitterX className="h-5 w-5" />
                </Link>
                <Link 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <BsInstagram className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}