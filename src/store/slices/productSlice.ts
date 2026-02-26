import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '@/src/types/product';

// ------------------------------------------------------------------
// Initial State
// ------------------------------------------------------------------
const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
    currentPage: 1,
};

// ------------------------------------------------------------------
// Product Slice
// ------------------------------------------------------------------
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // ── Fetch Product List ─────────────────────────────────────────
        fetchProductsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
            state.loading = false;
            state.products = action.payload;
            state.error = null;
        },
        fetchProductsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // ── Fetch Single Product ───────────────────────────────────────
        fetchProductByIdRequest(state, _action: PayloadAction<number>) {
            state.loading = true;
            state.error = null;
        },
        fetchProductByIdSuccess(state, action: PayloadAction<Product>) {
            state.loading = false;
            state.selectedProduct = action.payload;
            state.error = null;
        },
        fetchProductByIdFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },

        // ── Pagination ─────────────────────────────────────────────────
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        // ── Cleanup ────────────────────────────────────────────────────
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        },
    },
});

export const {
    fetchProductsRequest,
    fetchProductsSuccess,
    fetchProductsFailure,
    fetchProductByIdRequest,
    fetchProductByIdSuccess,
    fetchProductByIdFailure,
    setCurrentPage,
    clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
