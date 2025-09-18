import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ProductsLoading from '@/components/product/ProductsLoading';
import ProductsClient from '@/components/product/ProductsClient';
import { ApiService } from '@/services/FakeStoreApi';


interface ProductsPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export async function generateMetadata({ params: { locale } }: ProductsPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products' });
  
  return {
    title: t('title'),
    description: 'Browse our complete collection of products with filters and sorting options.',
    openGraph: {
      title: t('title'),
      description: 'Browse our complete collection of products with filters and sorting options.',
      type: 'website',
    },
  };
}

export default async function ProductsPage({ params: { locale }, searchParams }: ProductsPageProps) {
  const t = await getTranslations('products');
  
  try {
    // Fetch products and categories in parallel
    const [products, categories] = await Promise.all([
      ApiService.getAllProducts(),
      ApiService.getCategories()
    ]);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-8">
          {/* Page Header */}
          <div className="mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900
                    text-gradient">{t('title')}</h1>
          </div>

          <Suspense fallback={<ProductsLoading />}>
            <ProductsClient
              products={products}
              categories={categories}
              locale={locale}
              searchParams={searchParams}
            />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Error fetching products</div>;
  }
}