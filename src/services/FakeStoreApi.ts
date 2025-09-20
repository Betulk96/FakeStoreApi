import { Product } from '../types/product';

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
        next: { revalidate: 3600 }
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
        next: { revalidate: 86400 }
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
        next: { revalidate: 3600 }
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
        next: { revalidate: 3600 }
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

  // En yüksek puanlı ürünleri getir (rating'e göre sıralı)
  static async getMostPopularProducts(limit: number = 4): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      
      // Rating'e göre sırala (yüksekten alçağa)
      const sortedByRating = allProducts.sort((a, b) => {
        const ratingA = a.rating?.rate || 0;
        const ratingB = b.rating?.rate || 0;
        return ratingB - ratingA;
      });

      return sortedByRating.slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular products by rating:', error);
      throw error;
    }
  }

  // En çok değerlendirilen ürünleri getir (rating count'a göre)
  static async getMostReviewedProducts(limit: number = 4): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      
      // Rating count'a göre sırala (yüksekten alçağa)
      const sortedByReviewCount = allProducts.sort((a, b) => {
        const countA = a.rating?.count || 0;
        const countB = b.rating?.count || 0;
        return countB - countA;
      });

      return sortedByReviewCount.slice(0, limit);
    } catch (error) {
      console.error('Error fetching most reviewed products:', error);
      throw error;
    }
  }

  // Rating * count ile popülerlik skoru hesapla
  static async getTrendingProducts(limit: number = 4): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      
      // Popülerlik skoru hesapla (rating × √count)
      const productsWithScore = allProducts.map(product => ({
        ...product,
        popularityScore: (product.rating?.rate || 0) * Math.sqrt(product.rating?.count || 1)
      }));

      // Popülerlik skoruna göre sırala
      const sortedByPopularity = productsWithScore.sort((a, b) => 
        b.popularityScore - a.popularityScore
      );

      return sortedByPopularity.slice(0, limit);
    } catch (error) {
      console.error('Error fetching trending products:', error);
      throw error;
    }
  }

  // Belirli bir kategoride en popüler ürünleri getir
  static async getPopularProductsByCategory(category: string, limit: number = 4): Promise<Product[]> {
    try {
      const categoryProducts = await this.getProductsByCategory(category);
      
      // Rating'e göre sırala
      const sortedByRating = categoryProducts.sort((a, b) => {
        const ratingA = a.rating?.rate || 0;
        const ratingB = b.rating?.rate || 0;
        return ratingB - ratingA;
      });

      return sortedByRating.slice(0, limit);
    } catch (error) {
      console.error(`Error fetching popular products for category ${category}:`, error);
      throw error;
    }
  }

  // Fiyat aralığında en popüler ürünleri getir
  static async getPopularProductsByPriceRange(
    minPrice: number, 
    maxPrice: number, 
    limit: number = 4
  ): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      
      // Fiyat aralığında filtrele
      const filteredProducts = allProducts.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
      );

      // Rating'e göre sırala
      const sortedByRating = filteredProducts.sort((a, b) => {
        const ratingA = a.rating?.rate || 0;
        const ratingB = b.rating?.rate || 0;
        return ratingB - ratingA;
      });

      return sortedByRating.slice(0, limit);
    } catch (error) {
      console.error('Error fetching popular products by price range:', error);
      throw error;
    }
  }
}