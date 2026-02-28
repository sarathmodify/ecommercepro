'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';
import { useOrders } from '@/src/hooks/useOrders';
import type { Order } from '@/src/types/order';

// ------------------------------------------------------------------
// Skeleton Loader for order cards
// ------------------------------------------------------------------
function OrderSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    <div className="flex-1 space-y-3">
                        <div className="h-5 w-48 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                        <div className="h-4 w-64 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    </div>
                </div>
                <div className="flex md:flex-col items-center md:items-end gap-4">
                    <div className="h-8 w-24 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                    <div className="h-8 w-20 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:2000px_100%]" />
                </div>
            </div>
        </div>
    );
}

// ------------------------------------------------------------------
// Status badge helpers
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
// Orders Page
// ------------------------------------------------------------------
export default function OrdersPage() {
    const { orders, loading, error, loadOrders } = useOrders();
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // ── Fetch orders on mount ──────────────────────────────────────
    useEffect(() => {
        loadOrders();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Extract unique statuses from data for filter tabs ──────────
    const allStatuses = ['all', ...new Set(orders.map((o) => o.status.toLowerCase()))];

    // ── Filter orders (carry original 1-based index for API routing) ──
    const indexedOrders = orders.map((order, i) => ({ order, apiId: i + 1 }));
    const filteredOrders =
        filterStatus === 'all'
            ? indexedOrders
            : indexedOrders.filter(
                ({ order }) => order.status.toLowerCase() === filterStatus
            );

    return (
        <div className="min-h-screen bg-[var(--color-background-light)]">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-2">My Orders</h1>
                    <p className="text-lg text-white/90">Track and manage your orders</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filter Tabs */}
                {!loading && orders.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-2 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {allStatuses.map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer capitalize ${filterStatus === status
                                        ? 'bg-primary text-white'
                                        : 'text-[var(--color-text-light)] hover:bg-gray-100'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="space-y-6">
                        {[...Array(4)].map((_, i) => (
                            <OrderSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
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
                        <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
                            Failed to load orders
                        </h3>
                        <p className="text-[var(--color-text-light)] mb-6">{error}</p>
                        <button
                            onClick={() => loadOrders()}
                            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Orders List */}
                {!loading && !error && filteredOrders.length > 0 && (
                    <div className="space-y-6">
                        {filteredOrders.map(({ order, apiId }) => (
                            <Link
                                key={apiId}
                                href={`/orders/${apiId}`}
                                className="block"
                            >
                                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl hover:border-primary transition-all cursor-pointer">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        {/* Order Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start gap-4">
                                                {/* Order Icon */}
                                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                                                    📦
                                                </div>

                                                {/* Order Details */}
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-[var(--color-text)] mb-1">
                                                        Order #{apiId}
                                                    </h3>
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-light)]">
                                                        {/* Date */}
                                                        <span className="flex items-center gap-1">
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            {new Date(
                                                                order.orderDate
                                                            ).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })}
                                                        </span>
                                                        {/* Items count */}
                                                        <span className="flex items-center gap-1">
                                                            <svg
                                                                className="w-4 h-4"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                                />
                                                            </svg>
                                                            {order.items.length}{' '}
                                                            {order.items.length === 1
                                                                ? 'item'
                                                                : 'items'}
                                                        </span>
                                                        {/* Tracking */}
                                                        {order.tracking?.trackingNumber && (
                                                            <span className="flex items-center gap-1">
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                </svg>
                                                                {order.tracking.trackingNumber.slice(
                                                                    0,
                                                                    14
                                                                )}
                                                                ...
                                                            </span>
                                                        )}
                                                        {/* Customer */}
                                                        <span className="flex items-center gap-1">
                                                            👤 {order.customer.firstName}{' '}
                                                            {order.customer.lastName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status and Price */}
                                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4">
                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {getStatusIcon(order.status)}{' '}
                                                {order.status.charAt(0).toUpperCase() +
                                                    order.status.slice(1)}
                                            </span>
                                            <div className="text-right">
                                                <p className="text-sm text-[var(--color-text-light)] mb-1">
                                                    Total
                                                </p>
                                                <p className="text-2xl font-bold text-primary">
                                                    ${order.totalAmount.toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredOrders.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
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
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                        </svg>
                        <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">
                            No orders found
                        </h3>
                        <p className="text-[var(--color-text-light)] mb-6">
                            {filterStatus === 'all'
                                ? "You haven't placed any orders yet"
                                : `No ${filterStatus} orders`}
                        </p>
                        <Link href="/products">
                            <Button variant="primary" size="lg">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
