"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types";

interface ProductsClientProps {
  products: Product[];
  categories: string[];
  locale: string;
  searchParams: {
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

const ProductsClient: React.FC<ProductsClientProps> = ({
  products,
  categories,
  searchParams,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.category || ""
  );
  const [sortOrder, setSortOrder] = useState<
    "price-asc" | "price-desc" | "rating" | "default" | ""
  >((searchParams.sort as any) || "");
  const [minPrice, setMinPrice] = useState(searchParams.minPrice || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.maxPrice || "");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (minPrice) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (sortOrder === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating") {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, selectedCategory, sortOrder, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <aside className="lg:col-span-1 bg-white/60 backdrop-blur-md dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-8 border border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Categories
          </h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Sort
          </h2>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as any)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Price Range
          </h2>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 border border-gray-300 dark:border-gray-700 rounded-xl p-2.5 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-600 focus:border-primary-600 outline-none transition"
            />
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="lg:col-span-3">
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center text-lg">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white/60 backdrop-blur-md dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
              >
                <div className="relative bg-gray-50 dark:bg-gray-800 flex items-center justify-center h-48">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-auto object-contain p-4"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-lg font-bold text-primary-600">
                    ${product.price}
                  </p>
                  <p className="text-sm text-yellow-500 mt-1">
                    ⭐ {product.rating.rate} ({product.rating.count})
                  </p>
                  <button className="mt-auto w-full py-2.5 rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsClient;
