import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById } from '@/src/services/productService';
import { Product } from '@/src/types/product';
import {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductByIdRequest,
    fetchProductByIdSuccess,
    fetchProductByIdFailure,
} from '@/src/store/slices/productSlice';

// ------------------------------------------------------------------
// WORKER: Fetch Product List
// Triggered by: fetchProductsRequest()
// Calls:        productService.fetchProducts()
// On success:   put(fetchProductsSuccess(products))
// On failure:   put(fetchProductsFailure(error.message))
// ------------------------------------------------------------------
function* fetchProductsWorker(): Generator {
    try {
        const products = (yield call(fetchProducts)) as Product[];
        yield put(fetchProductsSuccess(products));
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Failed to fetch products';
        yield put(fetchProductsFailure(message));
    }
}

// ------------------------------------------------------------------
// WORKER: Fetch Single Product by ID
// Triggered by: fetchProductByIdRequest(id)
// Calls:        productService.fetchProductById(id)
// On success:   put(fetchProductByIdSuccess(product))
// On failure:   put(fetchProductByIdFailure(error.message))
// ------------------------------------------------------------------
function* fetchProductByIdWorker(
    action: PayloadAction<number>
): Generator {
    try {
        const product = (yield call(fetchProductById, action.payload)) as Product;
        yield put(fetchProductByIdSuccess(product));
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : 'Failed to fetch product';
        yield put(fetchProductByIdFailure(message));
    }
}

// ------------------------------------------------------------------
// WATCHER: Watch for fetchProductsRequest actions
// takeLatest — cancels any in-flight request if a new one arrives
// ------------------------------------------------------------------
export function* watchFetchProducts(): Generator {
    yield takeLatest(fetchProductsRequest.type, fetchProductsWorker);
}

// ------------------------------------------------------------------
// WATCHER: Watch for fetchProductByIdRequest actions
// takeLatest — cancels any in-flight request if a new one arrives
// ------------------------------------------------------------------
export function* watchFetchProductById(): Generator {
    yield takeLatest(fetchProductByIdRequest.type, fetchProductByIdWorker);
}
