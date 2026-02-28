import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/src/store/rootReducer';
import type { AppDispatch } from '@/src/store';
import type { Product } from '@/src/types/product';
import {
    hydrateCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
} from '@/src/store/slices/cartSlice';

// ------------------------------------------------------------------
// useCart — Custom hook for all cart-related state & actions
//
// Selectors      → read from Redux store
// Derived Values → calculated here (NOT stored in Redux)
// Actions        → dispatch to Redux store
// ------------------------------------------------------------------
export function useCart() {
    const dispatch = useDispatch<AppDispatch>();

    // ── Selectors ────────────────────────────────────────────────────
    const items = useSelector((state: RootState) => state.cart.items);
    const isCartOpen = useSelector(
        (state: RootState) => state.cart.isCartOpen
    );

    // ── Derived Values (computed from items, not stored in Redux) ───
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    // ── Actions ──────────────────────────────────────────────────────
    const hydrate = () => dispatch(hydrateCart());

    const addItem = (product: Product, quantity: number = 1) =>
        dispatch(addToCart({ product, quantity }));

    const removeItem = (productId: number) =>
        dispatch(removeFromCart(productId));

    const updateItemQty = (productId: number, quantity: number) =>
        dispatch(updateQuantity({ productId, quantity }));

    const emptyCart = () => dispatch(clearCart());

    const toggleCartOpen = () => dispatch(toggleCart());

    return {
        // State
        items,
        isCartOpen,

        // Derived values
        totalItems,
        subtotal,
        shipping,
        tax,
        total,

        // Actions
        hydrate,
        addItem,
        removeItem,
        updateItemQty,
        emptyCart,
        toggleCartOpen,
    };
}
