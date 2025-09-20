// Filter Types
export interface FilterState {
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'default';
}
