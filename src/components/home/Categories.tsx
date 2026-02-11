'use client';

import Link from 'next/link';

interface Category {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    itemCount: number;
    color: string;
}

export default function Categories() {
    const categories: Category[] = [
        {
            id: '1',
            name: 'Electronics',
            description: 'Latest gadgets and tech',
            itemCount: 1250,
            color: 'from-blue-500 to-indigo-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            id: '2',
            name: 'Fashion',
            description: 'Trending styles & apparel',
            itemCount: 2100,
            color: 'from-pink-500 to-rose-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
        {
            id: '3',
            name: 'Home & Garden',
            description: 'Decor and essentials',
            itemCount: 890,
            color: 'from-green-500 to-emerald-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            id: '4',
            name: 'Sports & Fitness',
            description: 'Gear for active lifestyle',
            itemCount: 750,
            color: 'from-orange-500 to-red-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
            ),
        },
        {
            id: '5',
            name: 'Books & Media',
            description: 'Expand your knowledge',
            itemCount: 1500,
            color: 'from-purple-500 to-violet-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
        {
            id: '6',
            name: 'Toys & Games',
            description: 'Fun for all ages',
            itemCount: 620,
            color: 'from-yellow-500 to-amber-600',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-16 bg-[var(--color-background-light)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
                        Explore our wide range of products across different categories
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            className="group"
                        >
                            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:-translate-y-1">
                                {/* Gradient Header */}
                                <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                                    <div className="flex items-center justify-between">
                                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                                            {category.icon}
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">{category.itemCount}</div>
                                            <div className="text-sm opacity-90">Items</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2 group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-[var(--color-text-light)] mb-4">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                                        <span>Browse</span>
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Link */}
                <div className="text-center mt-12">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold text-lg transition-colors"
                    >
                        View All Products
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
