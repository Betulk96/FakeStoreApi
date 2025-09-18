import { ApiService } from "@/services/FakeStoreApi";
import { Product } from "@/types";
import ProductByID from "@/components/product/ProductByID";

type ProductPageProps = {
  params: { id: string };
};

// 🔹 Dinamik metadata (SEO)
export async function generateMetadata({ params }: ProductPageProps) {
  const product: Product = await ApiService.getProduct(Number(params.id));

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

// 🔹 Server-side fetch (SEO dostu)
export default async function ProductByIDPage({ params }: ProductPageProps) {
  const product: Product = await ApiService.getProduct(Number(params.id));

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProductByID product={product} />
    </div>
  );
}
