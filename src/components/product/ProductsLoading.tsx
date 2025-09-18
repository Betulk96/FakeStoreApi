"use client";

import React from "react";

const ProductsLoading = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
        >
          <div className="h-40 bg-gray-200 rounded-md"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded mt-2"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductsLoading;
