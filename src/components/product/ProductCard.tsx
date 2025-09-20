'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { addToCart, selectCartItemById } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/slices/wishlistSlice';
import { Product } from '@/types/product';
import ProductCardSkeleton from '@/components/product/ProductCardSkeleton';
import { BiStar } from 'react-icons/bi';
import { CgShoppingCart } from 'react-icons/cg';
import { CiShoppingCart, CiHeart } from 'react-icons/ci';
import { AiFillHeart } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@/hook/redux';
import slugify from 'slugify';
import { ProductCardProps } from '@/types/cart';


export default function ProductCard({ product, isLoading = false, showRating = false }: ProductCardProps) {
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
      setTimeout(() => setShowNotification(false), 3000);
    }, 500);
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
        className={`h-3.5 w-3.5 transition-colors ${index < Math.floor(rating)
            ? 'text-amber-400 fill-current'
            : 'text-color4/30'
          }`}
      />
    ));
  };

  // SEO-friendly slug
  const slug = slugify(product.title, { lower: true, strict: true });

  return (
    <div className="card relative">
      {/* Success Notification */}
      {showNotification && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-color1 to-color2 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce backdrop-blur-sm ">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
              <CgShoppingCart className="w-2.5 h-2.5" />
            </div>
            <span>{t('product.addedToCart')}</span>
          </div>
        </div>
      )}

      <Link href={`/${locale}/products/${product.id}/${slug}`} className="block h-full">
        <div className="relative h-full bg-gradient-to-br from-white via-color5/5 to-color4/10 dark:from-color5 dark:via-color4/10 dark:to-color3/5 rounded-2xl border border-color4/10 dark:border-color3/20 shadow-sm hover:shadow-2xl hover:shadow-color1/10 dark:hover:shadow-color2/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 overflow-hidden backdrop-blur-sm">

          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-color1/5 dark:from-color5/40 dark:to-color2/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

          {/* Product Image Container */}
          <div className="relative h-56 overflow-hidden rounded-t-2xl bg-gradient-to-br from-color5/20 via-white to-color4/20 dark:from-color4/20 dark:via-color5 dark:to-color3/20">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-110 transition-all duration-700 p-6 filter group-hover:saturate-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Floating Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-color1 to-color2 text-white shadow-lg backdrop-blur-sm border border-white/20 capitalize tracking-wide">
                {t(`categories.${product.category.toLowerCase()}`)}
              </span>
            </div>

            {/* Floating Wishlist Button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleToggleWishlist}
                className="p-2.5 bg-white/90 dark:bg-color5/90 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 border border-color4/20 backdrop-blur-sm group/btn"
              >
                {isInWishlist ? (
                  <AiFillHeart className="h-5 w-5 text-red-500 group-hover/btn:scale-110 transition-transform" />
                ) : (
                  <CiHeart className="h-5 w-5 text-color2 dark:text-color4 group-hover/btn:text-red-500 group-hover/btn:scale-110 transition-all" />
                )}
              </button>
            </div>

            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />


          </div>

          {/* Product Details */}
          <div className="relative p-5 flex flex-col flex-grow z-10">

            {/* Rating Section */}
            {showRating && (
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-0.5">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-xs text-color1/70 dark:text-color4/70 font-medium">
                    {product.rating.rate}/5
                  </span>
                </div>
                <span className="text-xs text-color1/60 dark:text-color4/60 bg-color4/10 dark:bg-color3/10 px-2 py-1 rounded-full">
                  {product.rating.count} reviews
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="font-bold text-lg mb-3 line-clamp-2 text-color1 dark:text-color5 group-hover:text-color1 dark:group-hover:text-color2 transition-colors duration-300 leading-tight">
              {truncateText(product.title, 60)}
            </h3>

            {/* Description */}
            <p className="text-sm mb-4 line-clamp-2 text-color1/80 dark:text-color4/80 leading-relaxed">
              {truncateText(product.description, 100)}
            </p>

            {/* Price and Action Section */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-color4/10 dark:border-color3/10">
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-color1 to-color1/60  dark:from-color3 dark:to-color2/80 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                {cartItem && (
                  <span className="text-xs font-medium text-color1 dark:text-color2  dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                    {t('common.inCart')}: {cartItem.quantity}
                  </span>
                )}
              </div>

              {/* Mini Add Button */}
              <button
                onClick={handleAddToCart}
                disabled={isCartLoading}
                className="p-3 rounded-xl border-2 border-color1/20 dark:border-color2/20 text-color1 dark:text-color2 hover:bg-gradient-to-r hover:from-color1 hover:to-color2 hover:text-white hover:border-transparent hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-lg group/add"
              >
                {isCartLoading ? (
                  <div className="h-5 w-5 border-2 border-color1 dark:border-color2 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CiShoppingCart className="h-5 w-5 group-hover/add:scale-110 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {/* Subtle shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
        </div>
      </Link>
    </div>
  );
}
