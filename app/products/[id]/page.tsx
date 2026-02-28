'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/src/components/ui/Button';
import { useProducts } from '@/src/hooks/useProducts';
import { useCart } from '@/src/hooks/useCart';

// ------------------------------------------------------------------
// Detail Page Skeleton — shown while loading
// ------------------------------------------------------------------
function DetailSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Image skeleton */}
                <div className="aspect-square rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />

                {/* Info skeleton */}
                <div className="space-y-6">
                    <div className="h-6 w-1/4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    <div className="h-10 w-3/4 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    <div className="h-8 w-1/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    <div className="h-4 w-full rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    <div className="h-4 w-5/6 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    <div className="h-4 w-2/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    <div className="flex gap-4 mt-8">
                        <div className="h-12 w-32 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                        <div className="h-12 flex-1 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// Product Detail Page
// ------------------------------------------------------------------
export default function ProductDetailPage() {
    const params = useParams();
    const productId = Number(params.id);

    const {
        selectedProduct: product,
        loading,
        error,
        loadProductById,
        clearProduct,
    } = useProducts();

    const { addItem } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [cartAdded, setCartAdded] = useState(false);

    // ── Fetch product on mount, cleanup on unmount ─────────────────
    useEffect(() => {
        if (productId) {
            loadProductById(productId);
        }
        return () => {
            clearProduct();
        };
    }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddToCart = () => {
        if (product) {
            addItem(product, quantity);
            setCartAdded(true);
            setTimeout(() => setCartAdded(false), 2000);
        }
    };

    // ── Loading State ──────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)]">
                {/* Breadcrumb placeholder */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <nav className="flex items-center gap-2 text-sm">
                            <Link href="/" className="text-[var(--color-text-light)] hover:text-primary">Home</Link>
                            <span className="text-gray-400">/</span>
                            <Link href="/products" className="text-[var(--color-text-light)] hover:text-primary">Products</Link>
                            <span className="text-gray-400">/</span>
                            <span className="text-gray-300">Loading...</span>
                        </nav>
                    </div>
                </div>
                <DetailSkeleton />
            </div>
        );
    }

    // ── Error State ────────────────────────────────────────────────
    if (error) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center">
                <div className="text-center">
                    <svg
                        className="w-24 h-24 mx-auto text-red-400 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                    <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                        Failed to load product
                    </h1>
                    <p className="text-[var(--color-text-light)] mb-6">{error}</p>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => loadProductById(productId)}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium cursor-pointer"
                        >
                            Try Again
                        </button>
                        <Link href="/products">
                            <Button variant="outline">Back to Products</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ── No Product ─────────────────────────────────────────────────
    if (!product) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">
                        Product Not Found
                    </h1>
                    <Link href="/products">
                        <Button variant="primary">Back to Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // ── Stock status ───────────────────────────────────────────────
    const inStock = product.stock > 0;
    const stockLabel =
        product.stock > 20
            ? `In Stock (${product.stock} available)`
            : product.stock > 0
                ? `Low Stock — Only ${product.stock} left`
                : 'Out of Stock';
    const stockColor = product.stock > 20 ? 'text-accent' : product.stock > 0 ? 'text-yellow-600' : 'text-red-500';
    const stockDotColor = product.stock > 20 ? 'bg-accent' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500';

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
                        <span className="text-[var(--color-text)]">{product.productName}</span>
                    </nav>
                </div>
            </div>

            {/* Product Detail */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.productName}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Thumbnail row using thumbnail URL */}
                        <div className="grid grid-cols-4 gap-4">
                            {[product.image, product.thumbnail, product.image, product.thumbnail].map((src, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
                                >
                                    <Image
                                        src={src}
                                        alt={`${product.productName} view ${i + 1}`}
                                        fill
                                        sizes="25vw"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Category Badge */}
                        <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-primary">
                            {product.category}
                        </span>

                        {/* Title */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)]">
                            {product.productName}
                        </h1>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-4xl font-bold text-primary">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            <span className={`w-3 h-3 ${stockDotColor} rounded-full`}></span>
                            <span className={`${stockColor} font-medium`}>{stockLabel}</span>
                        </div>

                        {/* Description */}
                        <div className="border-t border-b border-gray-200 py-6">
                            <p className="text-[var(--color-text-light)] leading-relaxed">
                                {product.description}
                            </p>
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
                                <span className="px-6 py-2 border-x-2 border-gray-300 font-medium">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="px-4 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                            <Button
                                variant={cartAdded ? 'primary' : 'accent'}
                                size="lg"
                                onClick={handleAddToCart}
                                disabled={!inStock}
                                className="flex-1"
                            >
                                {cartAdded ? 'Added to Cart ✓' : 'Add to Cart'}
                            </Button>
                        </div>

                        {/* Buy Now */}
                        <Button
                            variant="primary"
                            size="lg"
                            disabled={!inStock}
                            fullWidth
                        >
                            Buy Now
                        </Button>

                        {/* Product Specifications */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-4">
                                Product Details
                            </h3>
                            <div className="space-y-3">
                                {[
                                    { label: 'Manufacturer', value: product.manufacturer },
                                    { label: 'SKU', value: String(product.sku) },
                                    { label: 'Category', value: product.category },
                                    { label: 'Stock', value: `${product.stock} units` },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                                    >
                                        <span className="font-medium text-[var(--color-text)]">
                                            {item.label}
                                        </span>
                                        <span className="text-[var(--color-text-light)]">
                                            {item.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
