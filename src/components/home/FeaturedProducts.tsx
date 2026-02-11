'use client';

import Link from 'next/link';
import Button from '../ui/Button';

interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    badge?: string;
    imageAlt: string;
}

export default function FeaturedProducts() {
    const products: Product[] = [
        {
            id: '1',
            name: 'Wireless Noise-Cancelling Headphones',
            price: 199.99,
            originalPrice: 299.99,
            rating: 4.8,
            reviews: 342,
            badge: 'Best Seller',
            imageAlt: 'Premium headphones',
        },
        {
            id: '2',
            name: 'Smart Fitness Watch Pro',
            price: 149.99,
            rating: 4.6,
            reviews: 218,
            badge: 'New',
            imageAlt: 'Fitness smartwatch',
        },
        {
            id: '3',
            name: 'Ultra HD 4K Action Camera',
            price: 279.99,
            originalPrice: 349.99,
            rating: 4.9,
            reviews: 156,
            imageAlt: 'Action camera',
        },
        {
            id: '4',
            name: 'Premium Leather Backpack',
            price: 89.99,
            rating: 4.7,
            reviews: 428,
            badge: 'Trending',
            imageAlt: 'Leather backpack',
        },
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-2">
                            Featured Products
                        </h2>
                        <p className="text-lg text-[var(--color-text-light)]">
                            Hand-picked items just for you
                        </p>
                    </div>
                    <Button variant="outline" size="md">
                        View All
                    </Button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => {
                        const discount = product.originalPrice
                            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                            : 0;

                        return (
                            <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                className="group"
                            >
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
                                            {product.badge && (
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${product.badge === 'Best Seller' ? 'bg-accent' :
                                                        product.badge === 'New' ? 'bg-primary' :
                                                            'bg-secondary'
                                                    }`}>
                                                    {product.badge}
                                                </span>
                                            )}
                                            {discount > 0 && (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                                                    -{discount}%
                                                </span>
                                            )}
                                        </div>

                                        {/* Quick Action Button */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="accent" size="sm">
                                                Quick View
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="font-semibold text-[var(--color-text)] mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(product.rating)
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
                                                {product.rating} ({product.reviews})
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="mt-auto flex items-center gap-2">
                                            <span className="text-2xl font-bold text-primary">
                                                ${product.price}
                                            </span>
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    ${product.originalPrice}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
