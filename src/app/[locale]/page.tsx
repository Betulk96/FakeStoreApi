"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";
import { ApiService } from "@/services/FakeStoreApi";

const SKELETON_COUNT = 4;

type PopularityMethod = 'rating' | 'reviews' | 'trending' | 'featured';

const PopularProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMethod, setCurrentMethod] = useState<PopularityMethod>('rating');
  
  const t = useTranslations();

  const getMethodLabel = (method: PopularityMethod): string => {
    switch (method) {
      case 'rating':
        return t('products.methods.rating');
      case 'reviews':
        return t('products.methods.reviews');
      case 'trending':
        return t('products.methods.trending');
      case 'featured':
        return t('products.methods.featured');
      default:
        return '';
    }
  };


  useEffect(() => {
    const fetchPopularProducts = async () => {
      setLoading(true);
      try {
        let data: Product[];
        
        switch (currentMethod) {
          case 'rating':
            data = await ApiService.getMostPopularProducts(4);
            break;
          case 'reviews':
            data = await ApiService.getMostReviewedProducts(4);
            break;
          case 'trending':
            data = await ApiService.getTrendingProducts(4);
            break;
          case 'featured':
          default:
            data = await ApiService.getFeaturedProducts(4);
            break;
        }
        
        setProducts(data);
      } catch (error) {
        console.error(t('products.errors.fetchFailed'), error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularProducts();
  }, [currentMethod, t]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 h-auto overflow-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-color1 dark:text-color3">
          {t('products.title')}
        </h1>
        
        {/* Method Selector */}
        <div className="flex flex-wrap gap-2 my-6">
          {(['rating', 'reviews', 'trending', 'featured'] as PopularityMethod[]).map((method) => (
            <button
              key={method}
              onClick={() => setCurrentMethod(method)}
              className={`px-4 py-2 flex items-center space-x-2  hover:shadow-lg transition-colors rounded-xl  backdrop-blur-md  p-2 text-sm  shadow-sm shadow-color22 font-medium  duration-200 ${
                currentMethod === method
                  ? 'bg-color1 text-white border-none'
                  : 'bg-white/10  hover:bg-color3'
              }`}
            >
              {getMethodLabel(method)}
            </button>
          ))}
        </div>       
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ProductCard key={i} isLoading />
            ))
          : products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                showRating={currentMethod !== 'featured'}
              />
            ))}
      </div>

      {/* Loading state message */}
      {loading && (
        <div className="text-center mt-8">
          <p className="text-gray-600">{t('products.loading')}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">{t('products.noProducts')}</p>
        </div>
      )}

      {/* Statistics */}
      {!loading && products.length > 0 && (
        <div className="mt-8 p-4 bg-gradient-to-br from-color1/50 via-color1/80 to-color1/90 dark:bg-gradient-to-br dark:from-color33/20 dark:via-color33/50 dark:to-color33/80 text-white  rounded-lg">
          <h3 className="text-lg font-semibold   mb-2">
            {t('products.statistics.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="">{t('products.statistics.averageRating')}:</span>
              <span className="ml-2 font-semibold">
                {(products.reduce((acc, p) => acc + (p.rating?.rate || 0), 0) / products.length).toFixed(1)}
              </span>
            </div>
            <div>
              <span className="">{t('products.statistics.totalReviews')}:</span>
              <span className="ml-2 font-semibold">
                {products.reduce((acc, p) => acc + (p.rating?.count || 0), 0)}
              </span>
            </div>
            <div>
              <span className="">{t('products.statistics.averagePrice')}:</span>
              <span className="ml-2 font-semibold">
                ${(products.reduce((acc, p) => acc + p.price, 0) / products.length).toFixed(2)}
              </span>
            </div>
            <div>
              <span className="">{t('products.statistics.categoryCount')}:</span>
              <span className="ml-2 font-semibold">
                {new Set(products.map(p => p.category)).size}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularProductsPage;