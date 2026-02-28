'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import { useCart } from '@/src/hooks/useCart';
import { useOrders } from '@/src/hooks/useOrders';
import type { CreateOrderPayload, OrderItem } from '@/src/types/order';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalItems, subtotal, shipping, tax, total, emptyCart, hydrate } = useCart();
    const { submitOrder, currentOrder, loading, error } = useOrders();

    const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
    const [formData, setFormData] = useState({
        // Shipping Info
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: '',
        // Payment
        paymentMethod: 'card',
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    // ── Hydrate cart on mount ─────────────────────────────────────
    useEffect(() => {
        hydrate();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Redirect to cart if empty ─────────────────────────────────
    useEffect(() => {
        // Wait a tick for hydration before checking
        const timeout = setTimeout(() => {
            if (items.length === 0 && !currentOrder) {
                router.push('/cart');
            }
        }, 100);
        return () => clearTimeout(timeout);
    }, [items.length, currentOrder, router]);

    // ── On successful order → clear cart + show confirmation ──────
    useEffect(() => {
        if (currentOrder) {
            emptyCart();
        }
    }, [currentOrder]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 'shipping') {
            setStep('payment');
        } else if (step === 'payment') {
            setStep('review');
        } else {
            // ── Place Order ──────────────────────────────────────
            const orderItems: OrderItem[] = items.map((item) => ({
                productId: String(item.product.id),
                productName: item.product.productName,
                category: item.product.category,
                quantity: item.quantity,
                price: item.product.price,
            }));

            const payload: CreateOrderPayload = {
                customer: {
                    customerId: crypto.randomUUID(),
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: {
                        street: formData.address,
                        city: formData.city,
                        state: formData.state,
                        zipcode: formData.zipCode,
                        country: formData.country,
                    },
                },
                items: orderItems,
                totalAmount: total,
                payment: {
                    paymentMethod: formData.paymentMethod === 'card' ? 'Card' : 'PayPal',
                    creditCard: formData.paymentMethod === 'card'
                        ? formData.cardNumber
                        : undefined,
                },
            };

            submitOrder(payload);
        }
    };

    // ── Order Confirmation Screen ────────────────────────────────
    if (currentOrder) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center">
                <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-[var(--color-text-light)] mb-6">
                        Thank you for your purchase.
                    </p>

                    {/* Order Details */}
                    <div className="bg-[var(--color-background-light)] rounded-xl p-6 mb-6 text-left space-y-3">
                        <div className="flex justify-between">
                            <span className="text-[var(--color-text-light)]">Order ID</span>
                            <span className="font-mono font-medium text-sm text-[var(--color-text)]">
                                {currentOrder.orderId.slice(0, 18)}...
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-text-light)]">Date</span>
                            <span className="font-medium text-[var(--color-text)]">
                                {currentOrder.orderDate}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[var(--color-text-light)]">Status</span>
                            <span className="px-2 py-0.5 bg-primary text-white text-xs font-semibold rounded-full">
                                {currentOrder.status}
                            </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-3">
                            <span className="font-semibold text-[var(--color-text)]">Total</span>
                            <span className="font-bold text-primary text-lg">
                                ${currentOrder.totalAmount.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Link href="/orders" className="flex-1">
                            <Button variant="primary" fullWidth>
                                View Orders
                            </Button>
                        </Link>
                        <Link href="/products" className="flex-1">
                            <Button variant="outline" fullWidth>
                                Keep Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background-light)]">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-2">Checkout</h1>
                    <p className="text-lg text-white/90">Complete your purchase</p>
                </div>
            </div>

            {/* Checkout Steps Indicator */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center mb-12">
                    {/* Step 1 */}
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 'shipping' ? 'bg-primary text-white' : 'bg-accent text-white'
                            }`}>
                            {step !== 'shipping' ? '✓' : '1'}
                        </div>
                        <span className={`ml-2 font-medium ${step === 'shipping' ? 'text-primary' : 'text-accent'}`}>
                            Shipping
                        </span>
                    </div>

                    <div className={`w-20 h-1 mx-4 ${step !== 'shipping' ? 'bg-accent' : 'bg-gray-300'}`}></div>

                    {/* Step 2 */}
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 'payment' ? 'bg-primary text-white' :
                            step === 'review' ? 'bg-accent text-white' :
                                'bg-gray-300 text-white'
                            }`}>
                            {step === 'review' ? '✓' : '2'}
                        </div>
                        <span className={`ml-2 font-medium ${step === 'payment' ? 'text-primary' :
                            step === 'review' ? 'text-accent' :
                                'text-gray-400'
                            }`}>
                            Payment
                        </span>
                    </div>

                    <div className={`w-20 h-1 mx-4 ${step === 'review' ? 'bg-accent' : 'bg-gray-300'}`}></div>

                    {/* Step 3 */}
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 'review' ? 'bg-primary text-white' : 'bg-gray-300 text-white'
                            }`}>
                            3
                        </div>
                        <span className={`ml-2 font-medium ${step === 'review' ? 'text-primary' : 'text-gray-400'}`}>
                            Review
                        </span>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4 text-red-700 text-center">
                        <p className="font-medium">Failed to place order</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
                            {/* Shipping Form */}
                            {step === 'shipping' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Shipping Information</h2>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="you@example.com"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                ZIP Code
                                            </label>
                                            <input
                                                type="text"
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Payment Form */}
                            {step === 'payment' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Payment Method</h2>

                                    <div className="flex gap-4 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                                            className={`flex-1 px-6 py-4 border-2 rounded-lg font-medium transition-colors cursor-pointer ${formData.paymentMethod === 'card'
                                                ? 'border-primary bg-primary-50 text-primary'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            💳 Credit Card
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                                            className={`flex-1 px-6 py-4 border-2 rounded-lg font-medium transition-colors cursor-pointer ${formData.paymentMethod === 'paypal'
                                                ? 'border-primary bg-primary-50 text-primary'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            🅿️ PayPal
                                        </button>
                                    </div>

                                    {formData.paymentMethod === 'card' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="1234 5678 9012 3456"
                                                    required
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    placeholder="John Doe"
                                                    required
                                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="expiryDate"
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        placeholder="MM/YY"
                                                        required
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        placeholder="123"
                                                        required
                                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {formData.paymentMethod === 'paypal' && (
                                        <div className="text-center py-8">
                                            <p className="text-[var(--color-text-light)] mb-4">
                                                You will be redirected to PayPal to complete your purchase
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Review Step */}
                            {step === 'review' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Review Your Order</h2>

                                    {/* Shipping Details */}
                                    <div className="border border-gray-200 rounded-lg p-6">
                                        <h3 className="font-semibold text-[var(--color-text)] mb-4 flex items-center justify-between">
                                            Shipping Address
                                            <button
                                                type="button"
                                                onClick={() => setStep('shipping')}
                                                className="text-primary text-sm font-medium hover:underline cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                        </h3>
                                        <p className="text-[var(--color-text-light)]">
                                            {formData.firstName} {formData.lastName}<br />
                                            {formData.address}<br />
                                            {formData.city}, {formData.state} {formData.zipCode}<br />
                                            {formData.phone}
                                        </p>
                                    </div>

                                    {/* Payment Details */}
                                    <div className="border border-gray-200 rounded-lg p-6">
                                        <h3 className="font-semibold text-[var(--color-text)] mb-4 flex items-center justify-between">
                                            Payment Method
                                            <button
                                                type="button"
                                                onClick={() => setStep('payment')}
                                                className="text-primary text-sm font-medium hover:underline cursor-pointer"
                                            >
                                                Edit
                                            </button>
                                        </h3>
                                        <p className="text-[var(--color-text-light)]">
                                            {formData.paymentMethod === 'card' ? (
                                                <>💳 Card ending in {formData.cardNumber.slice(-4)}</>
                                            ) : (
                                                <>🅿️ PayPal</>
                                            )}
                                        </p>
                                    </div>

                                    {/* Order Items */}
                                    <div className="border border-gray-200 rounded-lg p-6">
                                        <h3 className="font-semibold text-[var(--color-text)] mb-4">
                                            Items ({totalItems})
                                        </h3>
                                        <div className="space-y-3">
                                            {items.map((item) => (
                                                <div key={item.product.id} className="flex justify-between text-sm">
                                                    <span className="text-[var(--color-text-light)]">
                                                        {item.product.productName} × {item.quantity}
                                                    </span>
                                                    <span className="font-medium text-[var(--color-text)]">
                                                        ${(item.product.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex gap-4 mt-8 pt-6 border-t">
                                {step !== 'shipping' && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setStep(step === 'review' ? 'payment' : 'shipping')}
                                    >
                                        ← Back
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    variant="accent"
                                    size="lg"
                                    className="flex-1"
                                    loading={loading}
                                    disabled={loading}
                                >
                                    {step === 'review' ? 'Place Order' : 'Continue'}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sticky top-24">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.product.id} className="flex justify-between text-sm">
                                        <span className="text-[var(--color-text-light)]">
                                            {item.product.productName} × {item.quantity}
                                        </span>
                                        <span className="font-medium">
                                            ${(item.product.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}

                                <div className="border-t border-gray-200 pt-4 space-y-2">
                                    <div className="flex justify-between text-[var(--color-text-light)]">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-text-light)]">
                                        <span>Shipping</span>
                                        <span className={shipping === 0 ? 'text-accent font-medium' : ''}>
                                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[var(--color-text-light)]">
                                        <span>Tax</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-[var(--color-text)]">Total</span>
                                        <span className="text-primary">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
