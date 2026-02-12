import Link from 'next/link';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    badge?: string;
    imageAlt: string;
}

export default function ProductCard({
    id,
    name,
    price,
    originalPrice,
    rating,
    reviews,
    badge,
    imageAlt
}: ProductCardProps) {
    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <Link href={`/products/${id}`} className="group">
            <div className="bg-white rounded-xl border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Image Placeholder */}
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {/* Product Image Placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {badge && (
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${badge === 'Best Seller' ? 'bg-accent' :
                                    badge === 'New' ? 'bg-primary' :
                                        'bg-secondary'
                                }`}>
                                {badge}
                            </span>
                        )}
                        {discount > 0 && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                                -{discount}%
                            </span>
                        )}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-[var(--color-text)] mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < Math.floor(rating)
                                            ? 'text-yellow-400 fill-current'
                                            : 'text-gray-300'
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                    />
                                </svg>
                            ))}
                        </div>
                        <span className="text-sm text-[var(--color-text-light)]">
                            {rating} ({reviews})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mt-auto flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">
                            ${price}
                        </span>
                        {originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                ${originalPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
