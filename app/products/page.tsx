'use client';

import { useState } from 'react';
import ProductCard from '@/src/components/products/ProductCard';
import Filters, { FilterState } from '@/src/components/products/Filters';

// Mock product data
const allProducts = [
    {
        id: '1',
        name: 'Wireless Noise-Cancelling Headphones',
        price: 199.99,
        originalPrice: 299.99,
        rating: 4.8,
        reviews: 342,
        badge: 'Best Seller',
        imageAlt: 'Premium headphones',
        category: '1',
    },
    {
        id: '2',
        name: 'Smart Fitness Watch Pro',
        price: 149.99,
        rating: 4.6,
        reviews: 218,
        badge: 'New',
        imageAlt: 'Fitness smartwatch',
        category: '1',
    },
    {
        id: '3',
        name: 'Ultra HD 4K Action Camera',
        price: 279.99,
        originalPrice: 349.99,
        rating: 4.9,
        reviews: 156,
        imageAlt: 'Action camera',
        category: '1',
    },
    {
        id: '4',
        name: 'Premium Leather Backpack',
        price: 89.99,
        rating: 4.7,
        reviews: 428,
        badge: 'Trending',
        imageAlt: 'Leather backpack',
        category: '2',
    },
    {
        id: '5',
        name: 'Ergonomic Office Chair',
        price: 249.99,
        originalPrice: 349.99,
        rating: 4.5,
        reviews: 189,
        imageAlt: 'Office chair',
        category: '3',
    },
    {
        id: '6',
        name: 'Professional DSLR Camera',
        price: 799.99,
        rating: 4.8,
        reviews: 267,
        badge: 'Best Seller',
        imageAlt: 'DSLR camera',
        category: '1',
    },
    {
        id: '7',
        name: 'Wireless Gaming Mouse',
        price: 59.99,
        originalPrice: 79.99,
        rating: 4.6,
        reviews: 534,
        imageAlt: 'Gaming mouse',
        category: '1',
    },
    {
        id: '8',
        name: 'Portable Bluetooth Speaker',
        price: 79.99,
        rating: 4.4,
        reviews: 421,
        badge: 'New',
        imageAlt: 'Bluetooth speaker',
        category: '1',
    },
];

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FilterState>({
        category: 'all',
        priceRange: [0, 1000],
        rating: 0,
        sortBy: 'featured',
    });

    const handleFilterChange = (updateFilters: FilterState) => {
        setFilters((prev) => ({
            ...prev,
            ...updateFilters
        }));
    }

    // Filter and sort products
    const filteredProducts = allProducts
        .filter((product) => {
            // Search filter
            if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            // Category filter
            if (filters.category !== 'all' && product.category !== filters.category) {
                return false;
            }
            // Price filter
            if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
                return false;
            }
            // Rating filter
            if (product.rating < filters.rating) {
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
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

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
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[var(--color-text)]"
                        />
                        <svg
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Products Grid with Sidebar */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <Filters filters={filters} onFilterChange={handleFilterChange} />
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-[var(--color-text-light)]">
                                Showing {filteredProducts.length} of {allProducts.length} products
                            </p>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
