'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Product, ProductByIDProps } from '@/types/product';
import { addToCart, selectCartItemById } from '@/store/slices/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/slices/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/hook/redux';
import { BiStar } from 'react-icons/bi';
import { CgShoppingCart } from 'react-icons/cg';
import { CiHeart } from 'react-icons/ci';
import { AiFillHeart } from 'react-icons/ai';
import { FiMinus, FiPlus } from 'react-icons/fi';


export default function ProductByID({ product }: ProductByIDProps) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  console.log("", product);

  const [quantity, setQuantity] = useState(1);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Redux selectors
  const cartItem = useAppSelector((state) => selectCartItemById(state, product.id));
  const isInWishlist = useAppSelector((state) => selectIsInWishlist(state, product.id));

  const handleAddToCart = async () => {
    setIsCartLoading(true);

    setTimeout(() => {
      // Add multiple quantities
      for (let i = 0; i < quantity; i++) {
        dispatch(addToCart(product));
      }
      setIsCartLoading(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setQuantity(1); // Reset quantity
    }, 800);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <BiStar
        key={index}
        className={`h-5 w-5 transition-colors ${index < Math.floor(rating)
            ? 'text-amber-400 fill-current'
            : 'text-color4/30'
          }`}
      />
    ));
  };

  return (
    <div className="relative">
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-color1 to-color2 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce backdrop-blur-sm ">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <CgShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} item(s) added successfully</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Product Images */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-color5/20 via-white to-color4/20 dark:from-color22/20 dark:via-color44/90 dark:to-color33/20 shadow-2xl ">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain p-8 hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Image Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Thumbnail Images (if multiple images available) */}
          <div className="grid grid-cols-4 gap-4">
            {[product.image, product.image, product.image, product.image].map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === img
                    ? 'border-color2 shadow-lg'
                    : 'border-color4/20 hover:border-color2/50'
                  }`}
              >
                <Image
                  src={img}
                  alt={`${product.title} view ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain p-2 bg-white/50 dark:bg-color5/50"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">

          {/* Category Badge */}
          <div className="inline-flex">
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-color1 to-color2 text-white shadow-lg backdrop-blur-sm  capitalize">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-color1 dark:text-color3 leading-tight mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-lg font-semibold text-color1 dark:text-color3">
                  {product.rating.rate}/5
                </span>
              </div>
              <span className="text-color1/60 dark:text-color4/60 bg-color4/10 dark:bg-color3/10 px-3 py-1 rounded-full text-sm">
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-color5/30 to-color4/20 dark:from-color4/20 dark:to-color3/20 rounded-2xl p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-color1/60 dark:text-color4/60 uppercase tracking-wider">Price</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-color1 to-color2 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              {cartItem && (
                <div className="text-right">
                  <p className="text-sm text-color1/60 dark:text-color4/60">In Cart</p>
                  <p className="text-2xl font-bold text-color1 dark:text-color3">
                    {cartItem.quantity} items
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-color1 dark:text-color3">Description</h2>
            <p className="text-lg text-color1/80 dark:text-color4/80 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-6">

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-color1 dark:text-color3">Quantity:</span>
              <div className="flex items-center bg-white/50 dark:bg-color5/50 rounded-xl  backdrop-blur-sm">
                <button
                  onClick={decrementQuantity}
                  className="p-3 hover:bg-color1/10 dark:hover:bg-color2/10 rounded-l-xl transition-colors"
                >
                  <FiMinus className="w-5 h-5 text-color1 dark:text-color3" />
                </button>
                <span className="px-6 py-3 text-xl font-bold text-color1 dark:text-color3 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  className="p-3 hover:bg-color1/10 dark:hover:bg-color2/10 rounded-r-xl transition-colors"
                >
                  <FiPlus className="w-5 h-5 text-color1 dark:text-color3" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isCartLoading}
                className="flex-1 bg-gradient-to-r from-color1 to-color2 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 shadow-2xl hover:shadow-color1/25 hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed  "
              >
                {isCartLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <CgShoppingCart className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleToggleWishlist}
                className="p-4 bg-white/50 dark:bg-color5/50 rounded-2xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300  backdrop-blur-sm group"
              >
                {isInWishlist ? (
                  <AiFillHeart className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
                ) : (
                  <CiHeart className="w-6 h-6 text-color2 dark:text-color4 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                )}
              </button>
            </div>

            {/* Total Price Display */}
            {quantity > 1 && (
              <div className="bg-gradient-to-r from-color2/10 to-color1/10 dark:from-color2/20 dark:to-color1/20 rounded-xl p-4 border border-color4/10 dark:border-color3/10">
                <div className="flex items-center justify-between">
                  <span className="text-color1 dark:text-color3 font-semibold">
                    Total ({quantity} items):
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-color1 to-color2 bg-clip-text text-transparent">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      {/* Additional Features Section */}
      <div className=" p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Free Shipping */}
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/50 dark:bg-color33/50 backdrop-blur-sm border border-color4/10 dark:border-color3/10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-color1 to-color2 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-color1 dark:text-color3">Free Shipping</h3>
              <p className="text-sm text-color1/70 dark:text-color4/70">Orders over $50</p>
            </div>
          </div>

          {/* 30-Day Returns */}
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/50 dark:bg-color33/50 backdrop-blur-sm border border-color4/10 dark:border-color3/10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-color1 dark:text-color3">30-Day Returns</h3>
              <p className="text-sm text-color1/70 dark:text-color4/70">Easy returns policy</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/50 dark:bg-color33/50 backdrop-blur-sm border border-color4/10 dark:border-color3/10">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-color1 dark:text-color3">Secure Payment</h3>
              <p className="text-sm text-color1/70 dark:text-color4/70">SSL encrypted</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}