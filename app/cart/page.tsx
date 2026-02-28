'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import CartItemComponent from '@/src/components/cart/CartItem';
import { useCart } from '@/src/hooks/useCart';

export default function CartPage() {
    const {
        items,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
        hydrate,
        updateItemQty,
        removeItem,
    } = useCart();

    // ── Hydrate cart from localStorage on mount ──────────────────
    useEffect(() => {
        hydrate();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Empty Cart State ─────────────────────────────────────────
    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center">
                <div className="text-center py-12">
                    <svg
                        className="w-32 h-32 mx-auto text-gray-400 mb-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                    <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
                        Your Cart is Empty
                    </h2>
                    <p className="text-[var(--color-text-light)] mb-8">
                        Add some products to get started!
                    </p>
                    <Link href="/products">
                        <Button variant="primary" size="lg">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background-light)]">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
                    <p className="text-lg text-white/90">
                        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your
                        cart
                    </p>
                </div>
            </div>

            {/* Cart Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <CartItemComponent
                                key={item.product.id}
                                item={item}
                                onUpdateQuantity={updateItemQty}
                                onRemove={removeItem}
                            />
                        ))}

                        {/* Continue Shopping */}
                        <Link href="/products">
                            <Button variant="ghost" className="mt-4">
                                ← Continue Shopping
                            </Button>
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-[var(--color-text-light)]">
                                    <span>Subtotal ({totalItems} items)</span>
                                    <span className="font-medium">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[var(--color-text-light)]">
                                    <span>Shipping</span>
                                    <span className="font-medium">
                                        {shipping === 0 ? (
                                            <span className="text-accent">FREE</span>
                                        ) : (
                                            `$${shipping.toFixed(2)}`
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between text-[var(--color-text-light)]">
                                    <span>Tax (8%)</span>
                                    <span className="font-medium">
                                        ${tax.toFixed(2)}
                                    </span>
                                </div>

                                {subtotal > 0 && subtotal < 50 && (
                                    <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
                                        <p className="text-sm text-accent-700">
                                            Add ${(50 - subtotal).toFixed(2)} more for FREE
                                            shipping!
                                        </p>
                                    </div>
                                )}

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-xl font-bold text-[var(--color-text)]">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button
                                    variant="accent"
                                    size="lg"
                                    fullWidth
                                    className="mb-4"
                                >
                                    Proceed to Checkout
                                </Button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)]">
                                    <svg
                                        className="w-5 h-5 text-accent"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)]">
                                    <svg
                                        className="w-5 h-5 text-accent"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Free returns within 30 days</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)]">
                                    <svg
                                        className="w-5 h-5 text-accent"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Customer support 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
