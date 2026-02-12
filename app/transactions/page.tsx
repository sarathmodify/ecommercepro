'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Transaction {
    id: string;
    type: 'payment' | 'refund' | 'pending';
    orderNumber: string;
    date: string;
    amount: number;
    paymentMethod: string;
    status: 'completed' | 'pending' | 'failed';
}

const mockTransactions: Transaction[] = [
    {
        id: '1',
        type: 'payment',
        orderNumber: 'ORD-2024-001',
        date: '2024-02-10T14:30:00',
        amount: 539.97,
        paymentMethod: 'Credit Card ****4242',
        status: 'completed',
    },
    {
        id: '2',
        type: 'payment',
        orderNumber: 'ORD-2024-002',
        date: '2024-02-08T10:15:00',
        amount: 199.99,
        paymentMethod: 'PayPal',
        status: 'completed',
    },
    {
        id: '3',
        type: 'refund',
        orderNumber: 'ORD-2024-005',
        date: '2024-02-06T16:45:00',
        amount: 149.99,
        paymentMethod: 'Credit Card ****4242',
        status: 'completed',
    },
    {
        id: '4',
        type: 'payment',
        orderNumber: 'ORD-2024-003',
        date: '2024-02-05T09:20:00',
        amount: 349.98,
        paymentMethod: 'Credit Card ****4242',
        status: 'completed',
    },
    {
        id: '5',
        type: 'pending',
        orderNumber: 'ORD-2024-004',
        date: '2024-02-01T11:00:00',
        amount: 89.99,
        paymentMethod: 'Bank Transfer',
        status: 'pending',
    },
];

export default function TransactionsPage() {
    const [filterType, setFilterType] = useState<string>('all');

    const filteredTransactions = filterType === 'all'
        ? mockTransactions
        : mockTransactions.filter(transaction => transaction.type === filterType);

    const getTypeColor = (type: Transaction['type']) => {
        const colors = {
            payment: 'text-green-600',
            refund: 'text-blue-600',
            pending: 'text-yellow-600',
        };
        return colors[type];
    };

    const getTypeIcon = (type: Transaction['type']) => {
        switch (type) {
            case 'payment':
                return '💳';
            case 'refund':
                return '↩️';
            case 'pending':
                return '⏳';
        }
    };

    const getStatusBadge = (status: Transaction['status']) => {
        const badges = {
            completed: 'bg-green-100 text-green-800 border-green-200',
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            failed: 'bg-red-100 text-red-800 border-red-200',
        };
        return badges[status];
    };

    const totalSpent = mockTransactions
        .filter(t => t.type === 'payment' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalRefunded = mockTransactions
        .filter(t => t.type === 'refund' && t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="min-h-screen bg-[var(--color-background-light)]">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold mb-2">Transaction History</h1>
                    <p className="text-lg text-white/90">View your payment activity and history</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[var(--color-text-light)] mb-1">Total Spent</p>
                                <p className="text-3xl font-bold text-primary">${totalSpent.toFixed(2)}</p>
                            </div>
                            <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                                💰
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[var(--color-text-light)] mb-1">Total Refunded</p>
                                <p className="text-3xl font-bold text-blue-600">${totalRefunded.toFixed(2)}</p>
                            </div>
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                                ↩️
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[var(--color-text-light)] mb-1">Total Transactions</p>
                                <p className="text-3xl font-bold text-accent">{mockTransactions.length}</p>
                            </div>
                            <div className="w-14 h-14 bg-accent-100 rounded-full flex items-center justify-center text-3xl">
                                📊
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-2 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {['all', 'payment', 'refund', 'pending'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer capitalize ${filterType === type
                                        ? 'bg-primary text-white'
                                        : 'text-[var(--color-text-light)] hover:bg-gray-100'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Type</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Order</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Payment Method</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Amount</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--color-text)]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{getTypeIcon(transaction.type)}</span>
                                                <span className={`font-medium capitalize ${getTypeColor(transaction.type)}`}>
                                                    {transaction.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/orders/${transaction.orderNumber.split('-')[2]}`}
                                                className="text-primary hover:underline font-medium"
                                            >
                                                {transaction.orderNumber}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-[var(--color-text-light)]">
                                            <div>
                                                <div>{new Date(transaction.date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}</div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(transaction.date).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[var(--color-text-light)]">
                                            {transaction.paymentMethod}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-bold ${transaction.type === 'refund' ? 'text-blue-600' : 'text-primary'
                                                }`}>
                                                {transaction.type === 'refund' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getStatusBadge(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-2">No transactions found</h3>
                            <p className="text-[var(--color-text-light)]">
                                {filterType === 'all'
                                    ? "You haven't made any transactions yet"
                                    : `No ${filterType} transactions`}
                            </p>
                        </div>
                    )}
                </div>

                {/* Export Button */}
                {filteredTransactions.length > 0 && (
                    <div className="mt-6 flex justify-end">
                        <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary border-2 border-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export to CSV
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
