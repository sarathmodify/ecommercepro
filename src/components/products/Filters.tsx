'use client';


interface FiltersProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
    category: string;
    priceRange: [number, number];
    rating: number;
    sortBy: string;
}

export default function Filters({ filters, onFilterChange }: FiltersProps) {


    const handleFilterUpdate = (key: keyof FilterState, value: any) => {
        const newFilters = { ...filters, [key]: value };
        onFilterChange(newFilters);
    };

    const categories = [
        { id: 'all', name: 'All Categories' },
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Fashion' },
        { id: '3', name: 'Home & Garden' },
        { id: '4', name: 'Sports & Fitness' },
        { id: '5', name: 'Books & Media' },
        { id: '6', name: 'Toys & Games' },
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

            {/* Rating Filter */}
            <div>
                <h4 className="font-medium text-[var(--color-text)] mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                    {[4, 3, 2, 1, 0].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="rating"
                                value={rating}
                                checked={filters.rating === rating}
                                onChange={(e) => handleFilterUpdate('rating', parseInt(e.target.value))}
                                className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                ))}
                                <span className="text-sm text-[var(--color-text-light)] ml-1">& up</span>
                            </div>
                        </label>
                    ))}
                </div>
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
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                </select>
            </div>

            {/* Clear Filters */}
            <button
                onClick={() => {
                    const defaultFilters = {
                        category: 'all',
                        priceRange: [0, 1000] as [number, number],
                        rating: 0,
                        sortBy: 'featured',
                    };
                    onFilterChange(defaultFilters);
                }}
                className="w-full px-4 py-2 text-primary hover:bg-primary hover:text-white border-2 border-primary rounded-lg transition-colors font-medium cursor-pointer"
            >
                Clear All Filters
            </button>
        </div>
    );
}
