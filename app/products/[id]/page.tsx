'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';

// Mock product data (in a real app, this would come from API/database)
const productData: Record<string, any> = {
    '1': {
        id: '1',
        name: 'Wireless Noise-Cancelling Headphones',
        price: 199.99,
        originalPrice: 299.99,
        rating: 4.8,
        reviews: 342,
        badge: 'Best Seller',
        description: 'Experience premium sound quality with our wireless noise-cancelling headphones. Perfect for travel, work, or relaxation. Features 30-hour battery life, comfortable ear cushions, and crystal-clear audio.',
        features: [
            'Active Noise Cancellation (ANC)',
            '30-hour battery life',
            'Bluetooth 5.0 connectivity',
            'Premium leather ear cushions',
            'Foldable design with carrying case',
            'Built-in microphone for calls',
        ],
        specifications: {
            'Driver Size': '40mm',
            'Frequency Response': '20Hz - 20kHz',
            'Impedance': '32 Ohms',
            'Weight': '250g',
            'Connectivity': 'Bluetooth 5.0, 3.5mm jack',
            'Battery': '30 hours (ANC on), 40 hours (ANC off)',
        },
        inStock: true,
        stock: 47,
    },
};

export default function ProductDetailPage() {
    const params = useParams();
    console.log(params, ':params')
    const productId = params.id as string;
    const product = productData[productId];

    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">Product Not Found</h1>
                    <Link href="/products">
                        <Button variant="primary">Back to Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = () => {
        // TODO: Implement cart functionality
        alert(`Added ${quantity} item(s) to cart!`);
    };

    return (
        <div className="min-h-screen bg-[var(--color-background-light)]">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-[var(--color-text-light)] hover:text-primary">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/products" className="text-[var(--color-text-light)] hover:text-primary">Products</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[var(--color-text)]">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Product Detail */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                            <svg className="w-48 h-48 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i - 1)}
                                    className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center cursor-pointer border-2 transition-colors ${selectedImage === i - 1 ? 'border-primary' : 'border-transparent hover:border-gray-300'
                                        }`}
                                >
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Badge and Title */}
                        {product.badge && (
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-accent">
                                {product.badge}
                            </span>
                        )}
                        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)]">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                ))}
                                <span className="ml-2 text-[var(--color-text)] font-medium">{product.rating}</span>
                            </div>
                            <span className="text-[var(--color-text-light)]">({product.reviews} reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold text-primary">${product.price}</span>
                            {product.originalPrice && (
                                <>
                                    <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-red-500 text-white">
                                        Save {discount}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.inStock ? (
                                <>
                                    <span className="w-3 h-3 bg-accent rounded-full"></span>
                                    <span className="text-accent font-medium">In Stock ({product.stock} available)</span>
                                </>
                            ) : (
                                <>
                                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                    <span className="text-red-500 font-medium">Out of Stock</span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <div className="border-t border-b border-gray-200 py-6">
                            <p className="text-[var(--color-text-light)] leading-relaxed">{product.description}</p>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    −
                                </button>
                                <span className="px-6 py-2 border-x-2 border-gray-300 font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                            <Button
                                variant="accent"
                                size="lg"
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className="flex-1"
                            >
                                Add to Cart
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features.map((feature: string, index: number) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[var(--color-text-light)]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="mt-12 bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-6">Specifications</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                                <span className="font-medium text-[var(--color-text)]">{key}:</span>
                                <span className="text-[var(--color-text-light)]">{value as string}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
