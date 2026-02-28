import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Order, OrderState, CreateOrderPayload } from '@/src/types/order';

// ------------------------------------------------------------------
// Initial State
// ------------------------------------------------------------------
const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
};

// ------------------------------------------------------------------
// Order Slice
// ------------------------------------------------------------------
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        // ── Create Order ───────────────────────────────────────────
        createOrderRequest(state, _action: PayloadAction<CreateOrderPayload>) {
            state.loading = true;
            state.error = null;
        },
        createOrderSuccess(state, action: PayloadAction<Order>) {
            state.loading = false;
            state.currentOrder = action.payload;
            // Prepend newly created order to the list
            state.orders = [action.payload, ...state.orders];
        },
        createOrderFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // ── Fetch Orders ───────────────────────────────────────────
        fetchOrdersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersSuccess(state, action: PayloadAction<Order[]>) {
            state.loading = false;
            state.orders = action.payload;
        },
        fetchOrdersFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // ── Fetch Single Order by ID ───────────────────────────────
        fetchOrderByIdRequest(state, _action: PayloadAction<string>) {
            state.loading = true;
            state.error = null;
            state.currentOrder = null;
        },
        fetchOrderByIdSuccess(state, action: PayloadAction<Order>) {
            state.loading = false;
            state.currentOrder = action.payload;
        },
        fetchOrderByIdFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // ── Clear Current Order (after viewing confirmation) ──────
        clearCurrentOrder(state) {
            state.currentOrder = null;
        },
    },
});

export const {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    fetchOrdersRequest,
    fetchOrdersSuccess,
    fetchOrdersFailure,
    fetchOrderByIdRequest,
    fetchOrderByIdSuccess,
    fetchOrderByIdFailure,
    clearCurrentOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
