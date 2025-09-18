import Image from "next/image";
import { Product } from "@/types";

type Props = {
  product: Product; // ✅ Düzeltme: 'id: string' yerine 'product: Product'
};

export default function ProductByID({ product }: Props) { // ✅ async kaldırıldı
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        <div className="flex-1">
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-lg font-semibold text-green-600 mb-2">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500">Kategori: {product.category}</p>
        </div>
      </div>
    </div>
  );
}