import { ApiService } from "@/services/FakeStoreApi";
import ProductByID from "@/components/product/ProductByID";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { Product } from "@/types/product";

type ProductPageProps = {
  params: Promise<{ 
    id: string;
    locale: string;
  }>;
};

// 🔹 Dinamik metadata (SEO)
export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product: Product = await ApiService.getProduct(Number(resolvedParams.id));
  
  return {
    title: `${product.title} | Premium Store`,
    description: product.description,
    keywords: `${product.category}, ${product.title}, online shopping, premium products`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      type: "website",
      siteName: "Premium Store",
      url: `https://yoursite.com/products/${product.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

// 🔹 Server-side fetch (SEO dostu)
export default async function ProductByIDPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product: Product = await ApiService.getProduct(Number(resolvedParams.id));
  const locale = await getLocale(); // Server component için getLocale kullan

  return (
    <div className="min-h-screen">
      <div className="relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
          <nav className="flex items-center space-x-2 text-sm text-color1/60 dark:text-color4/60">
            <Link href={`/${locale}`} className="hover:text-color1 dark:hover:text-color3 transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${locale}/products`} className="hover:text-color1 dark:hover:text-color3 transition-colors">Products</Link>
            <span>/</span>
            <Link
              href={`/${locale}/products?category=${encodeURIComponent(product.category)}`}
              className="capitalize text-color1 dark:text-color3 font-medium hover:text-color2 dark:hover:text-color2 transition-colors"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-color2 dark:text-color2 font-semibold truncate max-w-xs">
              {product.title.length > 30 ? product.title.substring(0, 30) + "..." : product.title}
            </span>
          </nav>
        </div>

        {/* Product Detail Section */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-white/60 dark:bg-color22/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-color3/20 overflow-hidden">
            <div className="relative h-2 bg-gradient-to-r from-color1 via-color2 to-color1">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>

            <div className="p-8 lg:p-12">
              <ProductByID product={product} />
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href={`/${locale}/products?category=${encodeURIComponent(product.category)}`}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-color1/10 to-color2/10 dark:from-color2/20 dark:to-color1/20 rounded-full backdrop-blur-sm border border-color4/20 dark:border-color3/20 hover:from-color1/20 hover:to-color2/20 dark:hover:from-color2/30 dark:hover:to-color1/30 transition-all duration-300 group"
            >
              <span className="text-color1 dark:text-color3 font-medium group-hover:text-color2 dark:group-hover:text-color2 transition-colors">
                Explore more products in {product.category}
              </span>
              <svg
                className="w-5 h-5 ml-2 text-color2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}