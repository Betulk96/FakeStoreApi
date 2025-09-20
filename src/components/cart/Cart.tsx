'use client';

import { useAppDispatch, useAppSelector } from '@/hook/redux';
import {
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalAmount,
  removeFromCart,
  updateQuantity,
  clearCart
} from '@/store/slices/cartSlice';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';

export default function Cart() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const locale = useLocale();
  const cartItems = useAppSelector(selectCartItems);
  const totalItems = useAppSelector(selectCartTotalItems);
  const totalAmount = useAppSelector(selectCartTotalAmount);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">{t('cart.empty')}</h2>
          <p className="text-gray-500">{t('cart.emptyMessage')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {t('cart.title')}
          <span className="text-primary-600"> ({totalItems} {t('common.items')})</span>
        </h1>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 text-sm font-medium border border-red-700 text-red-800 rounded-lg hover:bg-red-700 hover:text-white transition-colors"
        >
          {t('cart.clearAll')}
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
          >
            {/* Product Image */}
            <Link href={`/${locale}/products/${item.id}/${item.title}`}>
              <div className="relative w-20 h-20 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <Link href={`/${locale}/products/${item.id}/${item.title}`}>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate cursor-pointer hover:text-primary-600 transition-colors  hover:color1">
                  {item.title}
                </h3>
              </Link>
              <p className="text-gray-500 text-sm">{t(`categories.${item.category.toLowerCase()}`)}</p>
              <p className="text-lg font-bold text-primary-600">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                disabled={item.quantity <= 1}
              >
                <AiOutlineMinus className="w-4 h-4" />
              </button>

              <span className="w-10 text-center font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <AiOutlinePlus className="w-4 h-4" />
              </button>
            </div>

            {/* Item Total */}
            <div className="text-right min-w-[80px]">
              <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="p-2 text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
            >
              <AiOutlineDelete className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-10 p-6 bg-white/50 backdrop-blur-md dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xl font-bold mb-6 gap-2">
          {/* Total Price */}
          <div className="flex items-center gap-2">
            <span className="text-gray-900 dark:text-gray-100">
              {t('cart.total')}:
            </span>
            <span className="text-primary-600">
              ${totalAmount.toFixed(2)}
            </span>
          </div>

          {/* Total Items */}
          <div className="text-gray-600 dark:text-gray-300 text-base font-medium">
            <span>{t('cart.totalItems')}:</span>
            {totalItems} {t('common.items')}
          </div>
        </div>

        <div className="space-y-3 flex items-center justify-end">
          <Link href={`/${locale}/products`}>
            <button className="p-3 bg-gradient-to-r from-color1 to-color2 rounded-lg border border-color1 text-color3 hover:bg-color1/50 hover:text-white font-semibold transition-colors">
              {t('common.continueShopping')}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}