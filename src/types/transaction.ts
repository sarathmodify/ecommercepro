// Transaction Types
export interface Transaction {
    id: string;
    orderId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    paymentMethod: string;
    createdAt: string;
}

export interface TransactionState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}
