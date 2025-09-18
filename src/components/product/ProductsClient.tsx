"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types"; // senin tipleri koyduğun dosyanın yolu
// import { Category } from "@/types"; // eğer ayrı tanımlarsan

interface Category {
    id: string;
    name: string;
}

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
    >(searchParams.sort as any || "");
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1 bg-white shadow rounded-lg p-4 space-y-6">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Categories</h2>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full border rounded p-2"
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
                    <h2 className="text-lg font-semibold mb-2">Sort</h2>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as any)}
                        className="w-full border rounded p-2"
                    >
                        <option value="">Default</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="rating">Rating</option>
                    </select>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Price Range</h2>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-1/2 border rounded p-2"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-1/2 border rounded p-2"
                        />
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <main className="lg:col-span-3">
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500">No products found.</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{product.title}</h3>
                                    <p className="text-gray-500">${product.price}</p>
                                    <p className="text-sm text-yellow-600">
                                        ⭐ {product.rating.rate} ({product.rating.count})
                                    </p>
                                    <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
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
