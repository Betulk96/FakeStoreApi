"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types";
import { ApiService } from "@/services/FakeStoreApi";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ApiService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Ürünler alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl h-screen overflow-auto mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white/50 backdrop-blur-md scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent hover:scrollbar-thumb-color4 dark:hover:scrollbar-thumb-color11">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} isLoading />
          ))
        : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  );
};

export default ProductPage;
