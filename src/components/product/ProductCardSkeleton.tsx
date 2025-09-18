function ProductCardSkeleton() {
  return (
    <div className="group relative">
      <div className="card overflow-hidden">
        {/* Image Skeleton */}
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          
          {/* Category Badge Skeleton */}
          <div className="absolute top-3 left-3">
            <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Product Details Skeleton */}
        <div className="p-4">
          {/* Rating Skeleton */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-4 w-4 bg-gray-300 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Title Skeleton */}
          <div className="mb-2">
            <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Description Skeleton */}
          <div className="mb-4">
            <div className="h-3 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="h-3 w-5/6 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Price and Action Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSkeleton;