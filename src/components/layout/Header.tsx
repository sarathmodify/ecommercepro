'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { useCart } from '@/src/hooks/useCart';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { totalItems, hydrate } = useCart();

    // Hydrate cart from localStorage on app boot
    useEffect(() => {
        hydrate();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">E</span>
                        </div>
                        <span className="text-xl font-bold text-[var(--color-text)] hidden sm:block">
                            E-Commerce Pro
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-[var(--color-text)] hover:text-primary transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="text-[var(--color-text)] hover:text-primary transition-colors font-medium"
                        >
                            Products
                        </Link>
                        <Link
                            href="/cart"
                            className="text-[var(--color-text)] hover:text-primary transition-colors font-medium relative flex items-center gap-1"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Cart
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-4 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </Link>
                        <Link
                            href="/orders"
                            className="text-[var(--color-text)] hover:text-primary transition-colors font-medium"
                        >
                            Orders
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                            Sign In
                        </Button>
                        <Button variant="primary" size="sm">
                            Sign Up
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-background-light)] transition-colors cursor-pointer"
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className="text-[var(--color-text)] hover:text-primary transition-colors font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                className="text-[var(--color-text)] hover:text-primary transition-colors font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Products
                            </Link>
                            <Link
                                href="/cart"
                                className="text-[var(--color-text)] hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Cart
                                {totalItems > 0 && (
                                    <span className="bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/orders"
                                className="text-[var(--color-text)] hover:text-primary transition-colors font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Orders
                            </Link>
                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                                <Button variant="ghost" size="sm" fullWidth>
                                    Sign In
                                </Button>
                                <Button variant="primary" size="sm" fullWidth>
                                    Sign Up
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
