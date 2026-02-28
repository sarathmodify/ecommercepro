'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import { useOrders } from '@/src/hooks/useOrders';

// ------------------------------------------------------------------
// Detail Skeleton
// ------------------------------------------------------------------
function DetailSkeleton() {
    return (
        <div className="min-h-screen bg-[var(--color-background-light)]">
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-4 w-32 bg-white/30 rounded mb-4" />
                    <div className="h-8 w-72 bg-white/30 rounded mb-2" />
                    <div className="h-5 w-48 bg-white/30 rounded" />
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                                <div className="h-6 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%] rounded mb-6" />
                                <div className="space-y-4">
                                    {[1, 2, 3].map((j) => (
                                        <div key={j} className="h-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%] rounded" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                                <div className="h-6 w-36 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%] rounded mb-4" />
                                <div className="space-y-3">
                                    {[1, 2].map((j) => (
                                        <div key={j} className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%] rounded" />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// Status helpers
// ------------------------------------------------------------------
const statusColorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    processing: 'bg-blue-100 text-blue-800 border-blue-200',
    shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    delivered: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    returned: 'bg-orange-100 text-orange-800 border-orange-200',
};

const statusIconMap: Record<string, string> = {
    pending: '⏳',
    processing: '⚙️',
    shipped: '🚚',
    delivered: '✅',
    cancelled: '❌',
    returned: '🔄',
};

function getStatusColor(status: string) {
    return statusColorMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
}

function getStatusIcon(status: string) {
    return statusIconMap[status.toLowerCase()] || '📦';
}

// ------------------------------------------------------------------
// Order Detail Page
// ------------------------------------------------------------------
export default function OrderDetailPage() {
    const params = useParams();
    const orderId = params.id as string;
    const { currentOrder: order, loading, error, loadOrderById, clearOrder } = useOrders();

    // ── Fetch order on mount, clear on unmount ──────────────────────
    useEffect(() => {
        if (orderId) {
            loadOrderById(orderId);
        }
        return () => {
            clearOrder();
        };
    }, [orderId]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Loading State ──────────────────────────────────────────────
    if (loading) {
        return <DetailSkeleton />;
    }

    // ── Error State ────────────────────────────────────────────────
    if (error) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-24 h-24 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.832c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">Failed to load order</h1>
                    <p className="text-[var(--color-text-light)] mb-6">{error}</p>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => loadOrderById(orderId)} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                            Try Again
                        </button>
                        <Link href="/orders">
                            <Button variant="outline">Back to Orders</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ── Not Found State ────────────────────────────────────────────
    if (!order) {
        return (
            <div className="min-h-screen bg-[var(--color-background-light)] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">Order Not Found</h1>
                    <Link href="/orders">
                        <Button variant="primary">Back to Orders</Button>
                    </Link>
                </div>
            </div>
        );
    }

    // ── Build timeline steps based on status ───────────────────────
    const statusLower = order.status.toLowerCase();
    const isCancelled = statusLower === 'cancelled';
    const isReturned = statusLower === 'returned';

    const orderSteps = [
        { label: 'Order Placed', completed: true },
        { label: 'Processing', completed: ['processing', 'shipped', 'delivered', 'returned'].includes(statusLower) },
        { label: 'Shipped', completed: ['shipped', 'delivered'].includes(statusLower) },
        { label: 'Delivered', completed: statusLower === 'delivered' },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-background-light)]">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link href="/orders" className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Orders
                    </Link>
                    <h1 className="text-4xl font-bold mb-2">
                        Order #{orderId}
                    </h1>
                    <p className="text-lg text-white/90">
                        Placed on {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Status Timeline */}
                        {!isCancelled && !isReturned && (
                            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Order Tracking</h2>

                                <div className="relative">
                                    {orderSteps.map((step, index) => (
                                        <div key={index} className="flex items-start mb-8 last:mb-0">
                                            {/* Step Indicator */}
                                            <div className="relative flex flex-col items-center mr-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step.completed ? 'bg-accent text-white' : 'bg-gray-300 text-gray-600'
                                                    }`}>
                                                    {step.completed ? '✓' : index + 1}
                                                </div>
                                                {index < orderSteps.length - 1 && (
                                                    <div className={`w-0.5 h-16 mt-2 ${step.completed ? 'bg-accent' : 'bg-gray-300'
                                                        }`} />
                                                )}
                                            </div>

                                            {/* Step Content */}
                                            <div className="flex-1 pt-2">
                                                <h3 className={`font-semibold ${step.completed ? 'text-[var(--color-text)]' : 'text-gray-400'
                                                    }`}>
                                                    {step.label}
                                                </h3>
                                                {step.completed && (
                                                    <p className="text-sm text-[var(--color-text-light)] mt-1">
                                                        Completed
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {order.tracking?.trackingNumber && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div>
                                                <p className="text-sm text-[var(--color-text-light)] mb-1">Tracking Number</p>
                                                <p className="font-mono font-semibold text-[var(--color-text)]">
                                                    {order.tracking.trackingNumber}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-[var(--color-text-light)] mb-1">Carrier</p>
                                                <p className="font-semibold text-[var(--color-text)]">
                                                    {order.tracking.carrier}
                                                </p>
                                            </div>
                                            {order.tracking.estimatedDelivery && (
                                                <div>
                                                    <p className="text-sm text-[var(--color-text-light)] mb-1">Est. Delivery</p>
                                                    <p className="font-semibold text-[var(--color-text)]">
                                                        {new Date(order.tracking.estimatedDelivery).toLocaleDateString('en-US', {
                                                            year: 'numeric', month: 'short', day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Cancelled / Returned Banner */}
                        {(isCancelled || isReturned) && (
                            <div className={`rounded-xl shadow-md border p-6 ${isCancelled ? 'bg-red-50 border-red-200' : 'bg-orange-50 border-orange-200'}`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{isCancelled ? '❌' : '🔄'}</span>
                                    <div>
                                        <h2 className={`text-xl font-bold ${isCancelled ? 'text-red-800' : 'text-orange-800'}`}>
                                            Order {isCancelled ? 'Cancelled' : 'Returned'}
                                        </h2>
                                        <p className={`text-sm ${isCancelled ? 'text-red-600' : 'text-orange-600'}`}>
                                            This order has been {isCancelled ? 'cancelled' : 'returned'}.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Order Items */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
                                Order Items ({order.items.length})
                            </h2>

                            <div className="space-y-4">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                                        {/* Product Icon */}
                                        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <span className="text-3xl">📦</span>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[var(--color-text)]">
                                                {item.productName}
                                            </h3>
                                            <p className="text-sm text-[var(--color-text-light)] mt-1">
                                                Category: {item.category}
                                            </p>
                                            <p className="text-sm text-[var(--color-text-light)] mt-1">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="font-semibold text-primary mt-2">
                                                ${item.price.toFixed(2)} each
                                            </p>
                                        </div>

                                        {/* Total */}
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-sm text-[var(--color-text-light)] mb-1">Subtotal</p>
                                            <p className="font-bold text-[var(--color-text)]">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Order Summary */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Order Summary</h3>

                            {/* Status Badge */}
                            <div className="mb-6">
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()}
                                </span>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex justify-between text-sm text-[var(--color-text-light)]">
                                        <span>{item.productName} × {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-[var(--color-text)]">Total</span>
                                        <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Button variant="primary" fullWidth>
                                    Download Invoice
                                </Button>
                                <Button variant="outline" fullWidth>
                                    Contact Support
                                </Button>
                            </div>
                        </div>

                        {/* Customer & Shipping Address */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Shipping Address</h3>
                            <div className="text-[var(--color-text-light)]">
                                <p className="font-semibold text-[var(--color-text)]">
                                    {order.customer.firstName} {order.customer.lastName}
                                </p>
                                <p>{order.customer.address.street}</p>
                                <p>{order.customer.address.city}, {order.customer.address.state} {order.customer.address.zipcode}</p>
                                <p>{order.customer.address.country}</p>
                                <p className="mt-2">{order.customer.phone}</p>
                                <p className="text-sm">{order.customer.email}</p>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Payment Method</h3>
                            <div className="text-[var(--color-text-light)]">
                                <p className="font-semibold text-[var(--color-text)]">
                                    {order.payment.paymentMethod === 'Card' ? '💳' : '🅿️'} {order.payment.paymentMethod}
                                </p>
                                {order.payment.creditCard && (
                                    <p className="text-sm mt-1">
                                        Card: ****{order.payment.creditCard.slice(-4)}
                                    </p>
                                )}
                                <p className="text-xs mt-2 font-mono">
                                    Transaction: {order.payment.transactionId.slice(0, 14)}...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
