import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ProductsLoading from '@/components/product/ProductsLoading';
import ProductsClient from '@/components/product/ProductsClient';
import { ApiService } from '@/services/FakeStoreApi';

// ✅ Next.js 15 için güncellenmiş tip tanımı
type ProductsPageProps = {
     params: Promise<{
       locale: string;
     }>;
     searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
   };

// ✅ ISR ayarı (sayfa 60 saniyede bir yeniden oluşturulacak)
export const revalidate = 60;

export async function generateMetadata({
  params
}: ProductsPageProps): Promise<Metadata> {
  const { locale } = await params; // ✅ await eklendi
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

export default async function ProductsPage({
  params,
  searchParams
}: ProductsPageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  
  const t = await getTranslations('products');
  
  try {
    // Fetch products and categories in parallel
    const [products, categories] = await Promise.all([
      ApiService.getAllProducts(),
      ApiService.getCategories()
    ]);

    return (
      <div className="min-h-screen">
        <div className="container-custom py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('title')}
            </h1>
          </div>
          
          <Suspense fallback={<ProductsLoading />}>
            <ProductsClient
              products={products}
              categories={categories}
              locale={locale}
              searchParams={resolvedSearchParams}
            />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Error Loading Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We encountered an error while fetching products. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}