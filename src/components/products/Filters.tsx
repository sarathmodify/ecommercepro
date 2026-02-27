'use client';

import { Product } from '@/src/types/product';

interface FiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    products: Product[];
}

export interface FilterState {
    category: string;
    priceRange: [number, number];
    sortBy: string;
}

export default function Filters({ filters, onFilterChange, products }: FiltersProps) {

    const handleFilterUpdate = (key: keyof FilterState, value: any) => {
        const newFilters = { ...filters, [key]: value };
        onFilterChange(newFilters);
    };

    // Extract unique categories from live API product data
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    const categories = [
        { id: 'all', name: 'All Categories' },
        ...uniqueCategories.map((cat) => ({ id: cat, name: cat })),
    ];

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 space-y-6">
            <h3 className="text-xl font-semibold text-[var(--color-text)]">Filters</h3>

            {/* Category Filter */}
            <div>
                <h4 className="font-medium text-[var(--color-text)] mb-3">Category</h4>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                value={category.id}
                                checked={filters.category === category.id}
                                onChange={(e) => handleFilterUpdate('category', e.target.value)}
                                className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <span className="text-[var(--color-text-light)]">{category.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h4 className="font-medium text-[var(--color-text)] mb-3">
                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </h4>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterUpdate('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>

            {/* Sort By */}
            <div>
                <h4 className="font-medium text-[var(--color-text)] mb-3">Sort By</h4>
                <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterUpdate('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-[var(--color-text)]"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            {/* Clear Filters */}
            <button
                onClick={() => {
                    const defaultFilters = {
                        category: 'all',
                        priceRange: [0, 1000] as [number, number],
                        sortBy: 'featured',
                    };
                    onFilterChange(defaultFilters);
                }}
                className="w-full px-4 py-2 text-primary hover:bg-primary hover:!text-white border-2 border-primary rounded-lg transition-colors font-medium cursor-pointer"
            >
                Clear All Filters
            </button>
        </div>
    );
}
