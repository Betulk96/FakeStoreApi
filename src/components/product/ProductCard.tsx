'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { addToCart, selectCartItemById } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/slices/wishlistSlice';
import { Product } from '@/types';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';
import { BiStar } from 'react-icons/bi';
import { CgShoppingCart } from 'react-icons/cg';
import { CiShoppingCart, CiHeart } from 'react-icons/ci';
import { AiFillHeart } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/hook/redux';

interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
}

export default function ProductCard({ product, isLoading = false }: ProductCardProps) {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Redux selectors
  const cartItem = useAppSelector((state) => 
    product ? selectCartItemById(state, product.id) : undefined
  );
  const isInWishlist = useAppSelector((state) => 
    product ? selectIsInWishlist(state, product.id) : false
  );

  if (isLoading || !product) {
    return <ProductCardSkeleton />;
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsCartLoading(true);
    
    setTimeout(() => {
      dispatch(addToCart(product));
      setIsCartLoading(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }, 300);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <BiStar
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="group relative h-[520px]"> {/* Sabit kart yüksekliği */}
      {/* Bildirim */}
      {showNotification && (
        <div className="absolute top-4 left-4 z-10 bg-color3 text-white px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
          {t('product.addedToCart')}
        </div>
      )}

      <Link href={`/${locale}/products/${product.id}/${product.title}`}>
        <div
          className="card h-full flex flex-col overflow-hidden rounded-xl 
                     bg-color7 text-color8 
                     dark:bg-color8 dark:text-color7 
                     shadow transition-all duration-300 group-hover:shadow-lg"
        >
          {/* Product Image */}
          <div className="relative h-64 bg-color2 dark:bg-color22 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300 p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-color1 text-white capitalize">
                {product.category}
              </span>
            </div>

            {/* Wishlist Button */}
            <div className="absolute top-3 right-3">
              <button
                onClick={handleToggleWishlist}
                className="p-2 bg-white dark:bg-color66 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                {isInWishlist ? (
                  <AiFillHeart className="h-5 w-5 text-red-500" />
                ) : (
                  <CiHeart className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            {/* Quick Add to Cart Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={handleAddToCart}
                disabled={isCartLoading}
                className="opacity-0 group-hover:opacity-100 bg-color1 text-white px-4 py-2 rounded-md font-medium flex items-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 disabled:opacity-50"
              >
                {isCartLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <CgShoppingCart className="h-4 w-4 mr-2" />
                )}
                {cartItem ? `${t('common.addMore')} (${cartItem.quantity})` : t('common.addToCart')}
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4 flex flex-col flex-grow">
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center">
                {renderStars(product.rating.rate)}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.rating.count})
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-color1 transition-colors">
              {truncateText(product.title, 60)}
            </h3>

            {/* Description */}
            <p className="text-sm mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
              {truncateText(product.description, 100)}
            </p>

            {/* Price and Action */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-color1">
                  ${product.price.toFixed(2)}
                </span>
                {cartItem && (
                  <span className="text-sm text-green-600 font-medium">
                    {t('common.inCart')}: {cartItem.quantity}
                  </span>
                )}
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={isCartLoading}
                className="p-2 rounded-md border border-color1 text-color1 dark:border-color2 dark:text-color2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCartLoading ? (
                  <div className="h-4 w-4 border-2 border-color1 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CiShoppingCart className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
