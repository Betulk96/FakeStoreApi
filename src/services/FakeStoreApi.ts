import { Product } from '../types';

const BASE_URL = process.env.FAKE_STORE_API_URL || 'https://fakestoreapi.com';

export class ApiService {
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        next: { revalidate: 3600 }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        next: { revalidate: 3600 } // ISR - revalidate every hour
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`, {
        next: { revalidate: 86400 } // ISR - revalidate every day
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`, {
        next: { revalidate: 3600 } // ISR - revalidate every hour
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching products for category ${category}:`, error);
      throw error;
    }
  }

  static async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}`, {
        next: { revalidate: 3600 } // ISR - revalidate every hour
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  }
}