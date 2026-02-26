'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/src/components/products/ProductCard';
import ProductSkeleton from '@/src/components/product/ProductSkeleton';
import Filters, { FilterState } from '@/src/components/products/Filters';
import { useProducts } from '@/src/hooks/useProducts';

const PRODUCTS_PER_PAGE = 6;

export default function ProductsPage() {
    const {
        products,
        loading,
        error,
        currentPage,
        loadProducts,
        changePage,
    } = useProducts();

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FilterState>({
        category: 'all',
        priceRange: [0, 1000],
        sortBy: 'featured',
    });

    // ── Fetch products on mount ────────────────────────────────────
    useEffect(() => {
        loadProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleFilterChange = (updatedFilters: FilterState) => {
        setFilters((prev) => ({
            ...prev,
            ...updatedFilters,
        }));
        // Reset to page 1 when filters change
        changePage(1);
    };

    // ── Filter and sort products ───────────────────────────────────
    const filteredProducts = products
        .filter((product) => {
            // Search filter
            if (
                searchQuery &&
                !product.productName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            ) {
                return false;
            }
            // Category filter (uses category string from API)
            if (
                filters.category !== 'all' &&
                product.category !== filters.category
            ) {
                return false;
            }
            // Price filter
            if (
                product.price < filters.priceRange[0] ||
                product.price > filters.priceRange[1]
            ) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            switch (filters.sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'newest':
                    return b.id - a.id;
                default:
                    return 0;
            }
        });

    // ── Pagination ─────────────────────────────────────────────────
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    return (
        <div className="min-h-screen bg-[var(--color-background-light)]">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-4">All Products</h1>
                    <p className="text-lg text-white/90">
                        Discover amazing products at unbeatable prices
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                changePage(1); // Reset to page 1 on search
                            }}
                            className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[var(--color-text)]"
                        />
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Products Grid with Sidebar */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <Filters
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            products={products}
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-[var(--color-text-light)]">
                                Showing{' '}
                                {loading
                                    ? '...'
                                    : `${paginatedProducts.length} of ${filteredProducts.length}`}{' '}
                                products
                            </p>
                        </div>

                        {/* ── Error State ──────────────────────────────────── */}
                        {error && (
                            <div className="text-center py-12">
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
                                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                                    Something went wrong
                                </h3>
                                <p className="text-[var(--color-text-light)] mb-4">
                                    {error}
                                </p>
                                <button
                                    onClick={() => loadProducts()}
                                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium cursor-pointer"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* ── Loading State ─────────────────────────────────── */}
                        {loading && !error && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                <ProductSkeleton count={6} />
                            </div>
                        )}

                        {/* ── Product Grid ──────────────────────────────────── */}
                        {!loading && !error && paginatedProducts.length > 0 && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* ── Pagination ──────────────────────────────── */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-10">
                                        <button
                                            onClick={() => changePage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-[var(--color-text)] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                        >
                                            « Prev
                                        </button>

                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => changePage(i + 1)}
                                                className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${currentPage === i + 1
                                                    ? 'bg-primary text-white'
                                                    : 'border border-gray-300 text-[var(--color-text)] hover:bg-gray-100'
                                                    }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => changePage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 rounded-lg border border-gray-300 text-[var(--color-text)] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                        >
                                            Next »
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        {/* ── Empty State ──────────────────────────────────── */}
                        {!loading && !error && paginatedProducts.length === 0 && (
                            <div className="text-center py-12">
                                <svg
                                    className="w-24 h-24 mx-auto text-gray-400 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
                                    No products found
                                </h3>
                                <p className="text-[var(--color-text-light)]">
                                    Try adjusting your filters or search query
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
