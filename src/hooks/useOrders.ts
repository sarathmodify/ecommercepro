import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/src/store/rootReducer';
import type { AppDispatch } from '@/src/store';
import type { CreateOrderPayload } from '@/src/types/order';
import {
    createOrderRequest,
    fetchOrdersRequest,
    fetchOrderByIdRequest,
    clearCurrentOrder,
} from '@/src/store/slices/orderSlice';

// ------------------------------------------------------------------
// useOrders — Custom hook for all order-related state & actions
// ------------------------------------------------------------------
export function useOrders() {
    const dispatch = useDispatch<AppDispatch>();

    // ── Selectors ────────────────────────────────────────────────────
    const orders = useSelector((state: RootState) => state.orders.orders);
    const currentOrder = useSelector(
        (state: RootState) => state.orders.currentOrder
    );
    const loading = useSelector((state: RootState) => state.orders.loading);
    const error = useSelector((state: RootState) => state.orders.error);

    // ── Actions ──────────────────────────────────────────────────────
    const submitOrder = (payload: CreateOrderPayload) =>
        dispatch(createOrderRequest(payload));

    const loadOrders = () => dispatch(fetchOrdersRequest());

    const loadOrderById = (id: string) => dispatch(fetchOrderByIdRequest(id));

    const clearOrder = () => dispatch(clearCurrentOrder());

    return {
        // State
        orders,
        currentOrder,
        loading,
        error,

        // Actions
        submitOrder,
        loadOrders,
        loadOrderById,
        clearOrder,
    };
}
