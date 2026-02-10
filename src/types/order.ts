// Order Types
export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    createdAt: string;
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface OrderState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}
