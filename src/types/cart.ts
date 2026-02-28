import { Product } from './product';

// ------------------------------------------------------------------
// CartItem — a product + quantity selected by the user
// Stores the full Product object so the cart page can display
// images, name, price, manufacturer without extra API calls.
// ------------------------------------------------------------------
export interface CartItem {
    product: Product;
    quantity: number;
}

// ------------------------------------------------------------------
// CartState — Redux state shape for the cart slice
// ------------------------------------------------------------------
export interface CartState {
    items: CartItem[];
    isCartOpen: boolean; // for future slide-out cart drawer
}
