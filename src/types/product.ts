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
export interface ProductsPageProps {
    params: {
    id: string;
    locale: string;
  };
  searchParams: {
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export interface ProductsClientProps {
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
export interface ProductByIDProps {
  product: Product;
}