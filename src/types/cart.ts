import { Product } from "./product";

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


// Component Props
export interface ProductCardProps {
  product?: Product;
  isLoading?: boolean;
  showRating?: boolean;
}
