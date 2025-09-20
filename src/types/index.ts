import { CartState } from "./cart";
import { FilterState } from "./filter";

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


export interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}