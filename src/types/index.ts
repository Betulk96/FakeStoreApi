// Product Types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Cart Types
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

// Filter Types
export interface FilterState {
  category: string;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'default';
}

// App State
export interface RootState {
  cart: CartState;
  filters: FilterState;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Component Props
export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}