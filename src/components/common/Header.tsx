'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { BiGlobe, BiMenu, BiSearch } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const otherLocale = locale === 'en' ? 'tr' : 'en';

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 text-2xl font-bold text-gradient"
          >
            <CiShoppingCart className="h-8 w-8 text-primary-600" />
            <span>Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t('common.home')}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              {t('common.products')}
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input-field pl-10"
                placeholder={t('common.search')}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <Link
              href={`/${otherLocale}`}
              className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <BiGlobe className="h-5 w-5" />
              <span className="text-sm font-medium uppercase">{otherLocale}</span>
            </Link>

            {/* Cart */}
            <Link
              href={`/${locale}/cart`}
              className="relative flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <CiShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden sm:block">{t('common.cart')}</span>
            </Link>
            <div>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-1  rounded-full hover:bg-gray-300 dark:hover:bg-gray-100 transition"
                title="Dark Mode Toggle"
              >
                {theme === 'dark' ? <FaSun className='w-4 h-4 lg:w-5 lg:h-5 text-yellow-400'  /> : <FaMoon className='w-4 h-4 lg:w-5 lg:h-5 text-blue-800'  />}
              </button>

            
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <IoMdClose className="h-6 w-6" />
              ) : (
                <BiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href={`/${locale}`}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-4"
                onClick={toggleMobileMenu}
              >
                {t('common.home')}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-4"
                onClick={toggleMobileMenu}
              >
                {t('common.products')}
              </Link>

              {/* Mobile Search */}
              <div className="px-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-10"
                    placeholder={t('common.search')}
                  />
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}