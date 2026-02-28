import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/src/types/product';
import { CartItem, CartState } from '@/src/types/cart';

// ------------------------------------------------------------------
// localStorage helpers
// ------------------------------------------------------------------
const CART_STORAGE_KEY = 'ecommercepro_cart';

const saveCartToStorage = (items: CartItem[]): void => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
};

const loadCartFromStorage = (): CartItem[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored) as CartItem[];
            } catch {
                return [];
            }
        }
    }
    return [];
};

// ------------------------------------------------------------------
// Initial State
// ------------------------------------------------------------------
const initialState: CartState = {
    items: [],
    isCartOpen: false,
};

// ------------------------------------------------------------------
// Cart Slice
// ------------------------------------------------------------------
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // ── Hydrate cart from localStorage on app boot ──────────────
        hydrateCart(state) {
            state.items = loadCartFromStorage();
        },

        // ── Add to Cart ────────────────────────────────────────────
        // If product already exists → increase quantity (capped at stock)
        // If new product → push to items array
        addToCart(
            state,
            action: PayloadAction<{ product: Product; quantity: number }>
        ) {
            const { product, quantity } = action.payload;
            const existingIndex = state.items.findIndex(
                (item) => item.product.id === product.id
            );

            if (existingIndex >= 0) {
                // Product already in cart — increase quantity, cap at stock
                const newQty = state.items[existingIndex].quantity + quantity;
                state.items[existingIndex].quantity = Math.min(newQty, product.stock);
            } else {
                // New product — add to cart
                state.items.push({
                    product,
                    quantity: Math.min(quantity, product.stock),
                });
            }

            saveCartToStorage(state.items);
        },

        // ── Remove from Cart ───────────────────────────────────────
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
            saveCartToStorage(state.items);
        },

        // ── Update Quantity ────────────────────────────────────────
        // If quantity ≤ 0 → remove the item
        // Otherwise → update quantity (capped at stock)
        updateQuantity(
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) {
            const { productId, quantity } = action.payload;
            const itemIndex = state.items.findIndex(
                (item) => item.product.id === productId
            );

            if (itemIndex < 0) return;

            if (quantity <= 0) {
                // Remove item if quantity drops to 0 or below
                state.items.splice(itemIndex, 1);
            } else {
                // Update quantity, capped at product stock
                state.items[itemIndex].quantity = Math.min(
                    quantity,
                    state.items[itemIndex].product.stock
                );
            }

            saveCartToStorage(state.items);
        },

        // ── Clear Cart ─────────────────────────────────────────────
        // Used after successful order creation
        clearCart(state) {
            state.items = [];
            saveCartToStorage(state.items);
        },

        // ── Toggle Cart Drawer ─────────────────────────────────────
        toggleCart(state) {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const {
    hydrateCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
} = cartSlice.actions;

export default cartSlice.reducer;
