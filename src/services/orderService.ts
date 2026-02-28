import apiClient from './apiClient';
import type { Order, CreateOrderPayload } from '@/src/types/order';

// ------------------------------------------------------------------
// Order Service — API calls for orders
// ------------------------------------------------------------------

// Fetch order history (10 orders)
export const fetchOrders = async (): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>('/orders?length=10');
    return response.data;
};

// Fetch a single order by ID
export const fetchOrderById = async (id: string): Promise<Order> => {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
};

// Create a new order (POST)
export const createOrder = async (
    payload: CreateOrderPayload
): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders', payload);
    return response.data;
};
