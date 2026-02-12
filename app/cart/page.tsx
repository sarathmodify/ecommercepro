'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageAlt: string;
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: '1',
            name: 'Wireless Noise-Cancelling Headphones',
            price: 199.99,
            quantity: 1,
            imageAlt: 'Premium headphones',
        },
        {
            id: '2',
            name: 'Smart Fitness Watch Pro',
            price: 149.99,
            quantity: 2,
            imageAlt: 'Fitness smartwatch',
        },
        {
            id: '4',
            name: 'Premium Leather Backpack',
            price: 89.99,
            quantity: 1,
            imageAlt: 'Leather backpack',
        },
    ]);

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center">
                <div className="text-center py-12">
                    <svg className="w-32 h-32 mx-auto text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">Your Cart is Empty</h2>
                    <p className="text-[var(--color-text-light)] mb-8">Add some products to get started!</p>
                    <Link href="/products">
                        <Button variant="primary" size="lg">Continue Shopping</Button>
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
                    <p className="text-lg text-white/90">{cartItems.length} items in your cart</p>
                </div>
            </div>

            {/* Cart Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                                <div className="flex gap-6">
                                    {/* Product Image */}
                                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <Link href={`/products/${item.id}`} className="text-xl font-semibold text-[var(--color-text)] hover:text-primary transition-colors">
                                                {item.name}
                                            </Link>
                                            <p className="text-2xl font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer"
                                                >
                                                    −
                                                </button>
                                                <span className="px-4 py-1 border-x-2 border-gray-300 font-medium min-w-[3rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer flex items-center gap-1"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="text-right">
                                        <p className="text-sm text-[var(--color-text-light)] mb-1">Subtotal</p>
                                        <p className="text-2xl font-bold text-[var(--color-text)]">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
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
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-[var(--color-text-light)]">
                                    <span>Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
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
                                    <span className="font-medium">${tax.toFixed(2)}</span>
                                </div>

                                {subtotal < 50 && (
                                    <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
                                        <p className="text-sm text-accent-700">
                                            Add ${(50 - subtotal).toFixed(2)} more for FREE shipping!
                                        </p>
                                    </div>
                                )}

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-xl font-bold text-[var(--color-text)]">
                                        <span>Total</span>
                                        <span className="text-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button variant="accent" size="lg" fullWidth className="mb-4">
                                    Proceed to Checkout
                                </Button>
                            </Link>

                            {/* Trust Badges */}
                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)]">
                                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Secure checkout</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)]">
                                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span>Free returns within 30 days</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-[var(--color-text-light)]">
                                    <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
