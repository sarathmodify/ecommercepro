import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/src/types/product';

// ------------------------------------------------------------------
// ProductCard — Displays a single product from live API data
// Uses real images from picsum.photos (provided by the API)
// ------------------------------------------------------------------
interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const {
        id,
        productName,
        price,
        category,
        stock,
        manufacturer,
        image,
    } = product;

    // Stock status badge
    const stockBadge =
        stock > 20
            ? { label: 'In Stock', color: 'bg-accent' }
            : stock > 0
                ? { label: `Only ${stock} left`, color: 'bg-yellow-500' }
                : { label: 'Out of Stock', color: 'bg-red-500' };

    return (
        <Link href={`/products/${id}`} className="group">
            <div className="bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Product Image */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <Image
                        src={image}
                        alt={productName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                            {category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${stockBadge.color}`}>
                            {stockBadge.label}
                        </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-[var(--color-text)] mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {productName}
                    </h3>

                    {/* Manufacturer */}
                    <p className="text-sm text-[var(--color-text-light)] mb-3">
                        by {manufacturer}
                    </p>

                    {/* Price */}
                    <div className="mt-auto flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                            ${price.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
