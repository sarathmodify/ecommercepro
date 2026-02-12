'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/src/components/ui/Button';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageAlt: string;
}

interface OrderData {
    id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    trackingNumber?: string;
    estimatedDelivery?: string;
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        phone: string;
    };
    paymentMethod: string;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

// Mock order data
const orderData: Record<string, OrderData> = {
    '1': {
        id: '1',
        orderNumber: 'ORD-2024-001',
        date: '2024-02-10',
        status: 'delivered',
        trackingNumber: 'TRK123456789',
        estimatedDelivery: '2024-02-15',
        shippingAddress: {
            name: 'John Doe',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            phone: '+1 (555) 123-4567',
        },
        paymentMethod: 'Credit Card ending in 4242',
        items: [
            { id: '1', name: 'Wireless Noise-Cancelling Headphones', price: 199.99, quantity: 1, imageAlt: 'Headphones' },
            { id: '2', name: 'Smart Fitness Watch Pro', price: 149.99, quantity: 2, imageAlt: 'Watch' },
        ],
        subtotal: 499.97,
        shipping: 0,
        tax: 40.00,
        total: 539.97,
    },
};

export default function OrderDetailPage() {
    const params = useParams();
    const orderId = params.id as string;
    const order = orderData[orderId];

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

    const getStatusColor = (status: OrderData['status']) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            processing: 'bg-blue-100 text-blue-800 border-blue-200',
            shipped: 'bg-purple-100 text-purple-800 border-purple-200',
            delivered: 'bg-green-100 text-green-800 border-green-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status];
    };

    const getStatusIcon = (status: OrderData['status']) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'processing':
                return '⚙️';
            case 'shipped':
                return '🚚';
            case 'delivered':
                return '✅';
            case 'cancelled':
                return '❌';
        }
    };

    const orderSteps = [
        { label: 'Order Placed', completed: true },
        { label: 'Processing', completed: order.status !== 'pending' },
        { label: 'Shipped', completed: order.status === 'shipped' || order.status === 'delivered' },
        { label: 'Delivered', completed: order.status === 'delivered' },
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
                    <h1 className="text-4xl font-bold mb-2">Order {order.orderNumber}</h1>
                    <p className="text-lg text-white/90">
                        Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Status Timeline */}
                        {order.status !== 'cancelled' && (
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

                                {order.trackingNumber && (
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-[var(--color-text-light)] mb-1">Tracking Number</p>
                                                <p className="font-mono font-semibold text-[var(--color-text)]">{order.trackingNumber}</p>
                                            </div>
                                            <Button variant="outline" size="sm">
                                                Track Package
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Order Items */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Order Items</h2>

                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <Link href={`/products/${item.id}`} className="font-semibold text-[var(--color-text)] hover:text-primary transition-colors">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-[var(--color-text-light)] mt-1">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="font-semibold text-primary mt-2">
                                                ${item.price.toFixed(2)} each
                                            </p>
                                        </div>

                                        {/* Total */}
                                        <div className="text-right">
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
                                    {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-[var(--color-text-light)]">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[var(--color-text-light)]">
                                    <span>Shipping</span>
                                    <span>{order.shipping === 0 ? <span className="text-accent font-medium">FREE</span> : `$${order.shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-[var(--color-text-light)]">
                                    <span>Tax</span>
                                    <span>${order.tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3">
                                    <div className="flex justify-between text-xl font-bold">
                                        <span className="text-[var(--color-text)]">Total</span>
                                        <span className="text-primary">${order.total.toFixed(2)}</span>
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

                        {/* Shipping Address */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Shipping Address</h3>
                            <div className="text-[var(--color-text-light)]">
                                <p className="font-semibold text-[var(--color-text)]">{order.shippingAddress.name}</p>
                                <p>{order.shippingAddress.address}</p>
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                <p className="mt-2">{order.shippingAddress.phone}</p>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">Payment Method</h3>
                            <p className="text-[var(--color-text-light)]">{order.paymentMethod}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
