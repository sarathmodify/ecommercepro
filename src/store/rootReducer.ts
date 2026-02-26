import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';

// ------------------------------------------------------------------
// Root Reducer — combine all slice reducers here
// ------------------------------------------------------------------
const rootReducer = combineReducers({
    products: productReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
