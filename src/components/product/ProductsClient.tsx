"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ProductsClientProps } from "@/types/product";
import ProductCard from "@/components/product/ProductCard";
import { useTranslations } from "next-intl";



const ProductsClient: React.FC<ProductsClientProps> = ({
  products,
  categories,
  searchParams,
}) => {
  const t = useTranslations();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.category || ""
  );
  const [sortOrder, setSortOrder] = useState<
    "price-asc" | "price-desc" | "rating" | "default" | ""
  >((searchParams.sort as any) || "");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");

  // Update state when searchParams change (for direct URL navigation)
  useEffect(() => {
    setSelectedCategory(searchParams.category || "");
    setSortOrder((searchParams.sort as any) || "");
    setMinPrice(searchParams.minPrice || "");
    setMaxPrice(searchParams.maxPrice || "");
  }, [searchParams.category, searchParams.sort, searchParams.minPrice, searchParams.maxPrice]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filtering - make sure to handle case sensitivity
    if (selectedCategory) {
      result = result.filter((p) =>
        p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price filtering
    if (minPrice) {
      const minPriceNum = Number(minPrice);
      if (!isNaN(minPriceNum)) {
        result = result.filter((p) => p.price >= minPriceNum);
      }
    }

    if (maxPrice) {
      const maxPriceNum = Number(maxPrice);
      if (!isNaN(maxPriceNum)) {
        result = result.filter((p) => p.price <= maxPriceNum);
      }
    }

    // Sorting
    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating") {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, selectedCategory, sortOrder, minPrice, maxPrice]);

  // Function to update URL when filters change
  const updateURL = (newParams: Partial<typeof searchParams>) => {
    const url = new URL(window.location.href);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value && value !== "") {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });

    window.history.replaceState({}, '', url.toString());
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category: category || undefined });
  };

  const handleSortChange = (sort: string) => {
    setSortOrder(sort as any);
    updateURL({ sort: sort || undefined });
  };

  const handleMinPriceChange = (price: string) => {
    setMinPrice(price);
    updateURL({ minPrice: price || undefined });
  };

  const handleMaxPriceChange = (price: string) => {
    setMaxPrice(price);
    updateURL({ maxPrice: price || undefined });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <aside className="lg:col-span-1 bg-white/60 backdrop-blur-md dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 h-fit max-h-[calc(100vh-2rem)] overflow-y-auto sticky top-24">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              {t("filters.category")}
            </h2>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition"
            >
              <option value="">{t("filters.all")}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {t(`categories.${cat.toLowerCase()}`)}
                </option>
              ))}

            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              {t("filters.sortBy")}
            </h2>
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition"
            >
              <option value="">{t("filters.default")}</option>
              <option value="price-asc">{t("filters.sortOptions.priceAsc")}</option>
              <option value="price-desc">{t("filters.sortOptions.priceDesc")}</option>
              <option value="rating">{t("filters.sortOptions.ratingDesc")}</option>
            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              {t("filters.price")}
            </h2>
            <div className="flex gap-3">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                className="w-1/2 border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition text-gray-700 dark:text-gray-200"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="w-1/2 border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          {(selectedCategory || sortOrder || minPrice || maxPrice) && (
            <button
              onClick={() => {
                setSelectedCategory("");
                setSortOrder("");
                setMinPrice("");
                setMaxPrice("");
                updateURL({ category: undefined, sort: undefined, minPrice: undefined, maxPrice: undefined });
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-xl transition-colors"
            >
              {t("filters.clearFilters")}
            </button>
          )}
        </div>
        {/* Results Summary */}
        <div className="m-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {t('filters.showing', {
              count: filteredProducts.length,
              category: selectedCategory
                ? t(`categories.${selectedCategory.toLowerCase()}`)
                : 'none'
            })}
          </p>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="lg:col-span-3">


        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              {t("filters.noResults")}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSortOrder("");
                setMinPrice("");
                setMaxPrice("");
                updateURL({ category: undefined, sort: undefined, minPrice: undefined, maxPrice: undefined });
              }}
              className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-xl transition-colors"
            >
              {t("filters.clearFilters")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group">
                <ProductCard
                  product={product}
                  showRating={true}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsClient;