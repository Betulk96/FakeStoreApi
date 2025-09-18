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
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';

export default function Cart() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  
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
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-4">{t('cart.empty')}</h2>
        <p className="text-gray-600">{t('cart.emptyMessage')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {t('cart.title')} ({totalItems} {t('common.items')})
        </h1>
        <button
          onClick={handleClearCart}
          className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
        >
          {t('cart.clearAll')}
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="card p-4">
            <div className="flex items-center space-x-4">
              {/* Product Image */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain rounded"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <p className="text-lg font-bold text-primary-600">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  className="p-2 border rounded-md hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  <AiOutlineMinus className="w-4 h-4" />
                </button>
                
                <span className="w-12 text-center font-semibold">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  className="p-2 border rounded-md hover:bg-gray-100"
                >
                  <AiOutlinePlus className="w-4 h-4" />
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right">
                <p className="font-bold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <AiOutlineDelete className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="card p-6 mt-8">
        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-xl font-bold">
            <span>{t('cart.total')}:</span>
            <span className="text-primary-600">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-6 space-y-3">
          <button className="w-full btn-primary">
            {t('cart.checkout')}
          </button>
          <button className="w-full btn-outline">
            {t('common.continueShopping')}
          </button>
        </div>
      </div>
    </div>
  );
}