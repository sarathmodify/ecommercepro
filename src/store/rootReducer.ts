import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

// ------------------------------------------------------------------
// Root Reducer — combine all slice reducers here
// ------------------------------------------------------------------
const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
