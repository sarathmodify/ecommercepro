import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchOrders, fetchOrderById, createOrder } from '@/src/services/orderService';
import type { Order } from '@/src/types/order';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CreateOrderPayload } from '@/src/types/order';
import {
    createOrderRequest,
    createOrderSuccess,
    createOrderFailure,
    fetchOrdersRequest,
    fetchOrdersSuccess,
    fetchOrdersFailure,
    fetchOrderByIdRequest,
    fetchOrderByIdSuccess,
    fetchOrderByIdFailure,
} from '@/src/store/slices/orderSlice';

// ------------------------------------------------------------------
// Workers
// ------------------------------------------------------------------

// Create a new order
function* createOrderWorker(
    action: PayloadAction<CreateOrderPayload>
): Generator {
    try {
        const order = (yield call(createOrder, action.payload)) as Order;
        yield put(createOrderSuccess(order));
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to create order';
        yield put(createOrderFailure(message));
    }
}

// Fetch order history
function* fetchOrdersWorker(): Generator {
    try {
        const orders = (yield call(fetchOrders)) as Order[];
        yield put(fetchOrdersSuccess(orders));
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to fetch orders';
        yield put(fetchOrdersFailure(message));
    }
}

// Fetch single order by ID
function* fetchOrderByIdWorker(
    action: PayloadAction<string>
): Generator {
    try {
        const order = (yield call(fetchOrderById, action.payload)) as Order;
        yield put(fetchOrderByIdSuccess(order));
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Failed to fetch order details';
        yield put(fetchOrderByIdFailure(message));
    }
}

// ------------------------------------------------------------------
// Watchers
// ------------------------------------------------------------------
export function* watchCreateOrder() {
    yield takeLatest(createOrderRequest.type, createOrderWorker);
}

export function* watchFetchOrders() {
    yield takeLatest(fetchOrdersRequest.type, fetchOrdersWorker);
}

export function* watchFetchOrderById() {
    yield takeLatest(fetchOrderByIdRequest.type, fetchOrderByIdWorker);
}
