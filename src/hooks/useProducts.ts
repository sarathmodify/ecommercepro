import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/src/store/rootReducer';
import type { AppDispatch } from '@/src/store';
import {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductByIdRequest,
    fetchProductByIdSuccess,
    fetchProductByIdFailure,
    setCurrentPage,
    clearSelectedProduct,
} from '@/src/store/slices/productSlice';

// ------------------------------------------------------------------
// useProducts — Custom hook for all product-related state & actions
//
// Selectors  → read from Redux store
// Actions    → dispatch to Redux store → caught by sagas
// ------------------------------------------------------------------
export function useProducts() {
    const dispatch = useDispatch<AppDispatch>();

    // ── Selectors ────────────────────────────────────────────────────
    const products = useSelector(
        (state: RootState) => state.products.products
    );
    const selectedProduct = useSelector(
        (state: RootState) => state.products.selectedProduct
    );
    const loading = useSelector(
        (state: RootState) => state.products.loading
    );
    const error = useSelector(
        (state: RootState) => state.products.error
    );
    const currentPage = useSelector(
        (state: RootState) => state.products.currentPage
    );

    // ── Actions ──────────────────────────────────────────────────────
    const loadProducts = () => dispatch(fetchProductsRequest());
    const loadProductById = (id: number) =>
        dispatch(fetchProductByIdRequest(id));
    const changePage = (page: number) => dispatch(setCurrentPage(page));
    const clearProduct = () => dispatch(clearSelectedProduct());

    return {
        // State
        products,
        selectedProduct,
        loading,
        error,
        currentPage,

        // Actions
        loadProducts,
        loadProductById,
        changePage,
        clearProduct,
    };
}
