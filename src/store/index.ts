import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from '@/src/sagas/rootSaga';

// ------------------------------------------------------------------
// 1. Create Redux-Saga middleware
// ------------------------------------------------------------------
const sagaMiddleware = createSagaMiddleware();

// ------------------------------------------------------------------
// 2. Configure the Redux store
//    - Uses rootReducer (combined slices)
//    - Disables thunk (we use Saga exclusively)
//    - Injects sagaMiddleware
// ------------------------------------------------------------------
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// ------------------------------------------------------------------
// 3. Run the root saga (starts all saga watchers)
// ------------------------------------------------------------------
sagaMiddleware.run(rootSaga);

// ------------------------------------------------------------------
// 4. Export types and store
// ------------------------------------------------------------------
export type AppDispatch = typeof store.dispatch;
export { rootReducer };
export default store;
