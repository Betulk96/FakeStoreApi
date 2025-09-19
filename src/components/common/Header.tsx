'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useSelector } from 'react-redux';
import { PiBasket } from "react-icons/pi";
import { RootState } from '../../store';
import { useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { BiGlobe, BiMenu, BiSearch } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import 'flag-icons/css/flag-icons.min.css';
import { usePathname, useRouter } from 'next/navigation';
export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const otherLocale = locale === "en" ? "tr" : "en";

  const handleLocaleSwitch = () => {
    // aynı pathte kalsın ama dil değişsin
    const newPath = `/${otherLocale}${pathname.replace(/^\/(en|tr)/, "")}`;
    router.replace(newPath);
  };
  return (
    <header className="bg-gradient-secondary dark:bg-gradient-dark shadow-sm sticky top-0 z-50">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between my-2">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 text-2xl font-bold text-gradient  text-gray-700 hover:shadow-lg transition-colors rounded-xl bg-color1/30 backdrop-blur-md   p-2  placeholder-gray-400 shadow-sm shadow-color22"
          >

            <span className='text-center text-gradient-animate-dark  '>FAKE STORE</span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center space-x-4">

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <Link
                href={`/${locale}`}
                className="  hover:shadow-lg transition-colors rounded-xl bg-white/10 backdrop-blur-md border dark:border-gray-600 p-2 text-sm placeholder-gray-400 shadow-sm shadow-color22"
              >
                {t('common.home')}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="hover:shadow-lg transition-colors rounded-xl bg-white/10 backdrop-blur-md border dark:border-gray-600 p-2 text-sm placeholder-gray-400 shadow-sm shadow-color22"
              >
                {t('common.products')}
              </Link>
            </nav>
            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-full ">
              <div className="relative w-full">
                {/* Icon */}
                <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-color4 text-lg pointer-events-none z-20" />

                {/* Input */}
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="rounded-xl bg-white/10 backdrop-blur-md border dark:border-gray-600  pl-12 pr-4 py-2 text-sm placeholder-gray-400 shadow-sm shadow-color22
                 focus:border-gray-400 focus:ring-1 focus:ring-gray-400/30 
                 transition-all duration-200 ease-in-out"
                />
              </div>
            </div>
            {/* Language Switcher */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <button
                onClick={handleLocaleSwitch}
                className="flex items-center space-x-2 hover:shadow-lg transition-colors rounded-xl bg-white/10 backdrop-blur-md border dark:border-gray-600 p-2 text-sm placeholder-gray-400 shadow-sm shadow-color22"
              >
                <span
                  className={`fi fi-${otherLocale === "tr" ? "tr" : "gb"} h-5 w-5 rounded-sm`}
                ></span>
                <span className="text-sm font-medium uppercase">{otherLocale}</span>
              </button>
            </div>


            {/* Cart */}
            <Link
              href={`/${locale}/cart`}
              className="relative flex items-center space-x-2  hover:shadow-lg transition-colors rounded-xl bg-white/10 backdrop-blur-md border dark:border-gray-600 p-2 text-sm placeholder-gray-400 shadow-sm shadow-color22 "
            >
              <PiBasket className="w-5 h-auto" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-color3 text-color1  text-xs rounded-lg h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              {/*  <span className="hidden sm:block">{t('common.cart')}</span> */}
            </Link>
            <div className='flex items-center space-x-2  hover:shadow-lg transition-colors rounded-xl bg-white/10 backdrop-blur-md border dark:border-gray-600 p-2 text-sm placeholder-gray-400 shadow-sm shadow-color22'>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className=" rounded-full  transition"
                title="Dark Mode Toggle"
              >
                {theme === 'dark' ? <FaSun className='w-4 h-4 lg:w-5 lg:h-5 text-yellow-400' /> : <FaMoon className='w-4 h-4 lg:w-5 lg:h-5 text-blue-800' />}
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