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
    <footer className="bg-gradient-to-br from-color1 via-color2 to-color1 dark:bg-gradient-to-br dark:from-color33 dark:via-color22 dark:to-color33 text-white relative overflow-hidden">   
      <div className="z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="col-span-1 lg:col-span-2">
              <Link 
                href="https://fakestoreapi.com/docs" 
                className="flex items-center space-x-2 text-2xl font-bold mb-6 group"
              >
                <div className="bg-gradient-to-r from-color1 to-color2 p-2 rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-lg">
                  <CgShoppingCart className="h-6 w-6 text-color3" />
                </div>
                <span className="text-color3 drop-shadow-sm">Fake Store</span>
              </Link>
              
              <p className="text-color3/90 mb-6 max-w-md leading-relaxed">
                {t('description')}
              </p>
              
              {/* Newsletter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder={t('newsletter')}
                  className="flex-1 px-4 py-3 rounded-xl backdrop-blur-sm border border-color3/30 bg-color3/10 text-color3 focus:outline-none focus:ring-2 focus:bg-opacity-30 transition-all duration-300 placeholder:text-color3/60"
                />
                <button 
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg flex items-center justify-center whitespace-nowrap bg-gradient-to-r from-color1 to-color2 text-color3 hover:opacity-90"
                >
                  <BsMailbox className="h-4 w-4 mr-2" />
                  {t('subscribe')}
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="backdrop-blur-sm rounded-2xl p-6 border border-color3/20 bg-color3/10">
              <h3 className="text-lg font-semibold mb-6 flex items-center text-color3">
                <div className="w-1 h-6 rounded-full mr-3 bg-gradient-to-b from-color1 to-color2"></div>
                {t('quickLinks')}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link 
                    href={`/${locale}`} 
                    className="flex items-center text-color3/80 hover:text-color3 transition-colors duration-300 transform hover:translate-x-2"
                  >
                    <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-r from-color1 to-color2 opacity-0 transition-opacity hover:opacity-100"></div>
                    {t('home')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/products`} 
                    className="flex items-center text-color3/80 hover:text-color3 transition-colors duration-300 transform hover:translate-x-2"
                  >
                    <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-r from-color1 to-color2 opacity-0 transition-opacity hover:opacity-100"></div>
                    {t('products')}
                  </Link>
                </li>
                <li>
                  <Link 
                    href={`/${locale}/cart`} 
                    className="flex items-center text-color3/80 hover:text-color3 transition-colors duration-300 transform hover:translate-x-2"
                  >
                    <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-r from-color1 to-color2 opacity-0 transition-opacity hover:opacity-100"></div>
                    {t('cart')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="backdrop-blur-sm rounded-2xl p-6 border border-color3/20 bg-color3/10">
              <h3 className="text-lg font-semibold mb-6 flex items-center text-color3">
                <div className="w-1 h-6 rounded-full mr-3 bg-gradient-to-b from-color2 to-color1"></div>
                {t('support')}
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#" className="flex items-center text-color3/80 hover:text-color3 transition-colors duration-300 transform hover:translate-x-2">
                    <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-r from-color2 to-color1 opacity-0 transition-opacity hover:opacity-100"></div>
                    {t('aboutUs')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center text-color3/80 hover:text-color3 transition-colors duration-300 transform hover:translate-x-2">
                    <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-r from-color2 to-color1 opacity-0 transition-opacity hover:opacity-100"></div>
                    {t('contactUs')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center text-color3/80 hover:text-color3 transition-colors duration-300 transform hover:translate-x-2">
                    <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-r from-color2 to-color1 opacity-0 transition-opacity hover:opacity-100"></div>
                    {t('privacyPolicy')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center text-color3/80 hover:text-color3 transition-colors duration-300 transform hover:translate-x-2">
                    <div className="w-2 h-2 rounded-full mr-3 bg-gradient-to-r from-color2 to-color1 opacity-0 transition-opacity hover:opacity-100"></div>
                    {t('termsOfService')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-color3/20 py-6 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <Link href="https://www.betulkuyucu.com/" className="text-sm text-color3/70 mb-4 sm:mb-0">
              © 2025 Betül Kuyucu / E-Commerce Store. {t('allRightsReserved')}
            </Link>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-color3/70">{t('followUs')}:</span>
              <div className="flex space-x-3">
                <Link href="#" className="p-2 rounded-lg border border-color3/20 text-color3 bg-color1/30 hover:bg-opacity-75 hover:text-white transition-all duration-300 backdrop-blur-sm transform hover:scale-110">
                  <FaFacebook className="h-4 w-4" />
                </Link>
                <Link href="#" className="p-2 rounded-lg border border-color3/20 text-color3 bg-color2/30 hover:bg-opacity-75 hover:text-white transition-all duration-300 backdrop-blur-sm transform hover:scale-110">
                  <BsTwitterX className="h-4 w-4" />
                </Link>
                <Link href="#" className="p-2 rounded-lg border border-color3/20 text-color3 bg-gradient-to-r from-color1/30 to-color2/30 hover:bg-opacity-75 hover:text-white transition-all duration-300 backdrop-blur-sm transform hover:scale-110">
                  <BsInstagram className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
