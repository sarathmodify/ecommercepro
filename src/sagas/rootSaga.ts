import { all, fork } from 'redux-saga/effects';
import { watchFetchProducts, watchFetchProductById } from './productSaga';

// ------------------------------------------------------------------
// Root Saga — forks all watcher sagas so they run concurrently
// ------------------------------------------------------------------
export default function* rootSaga() {
    yield all([
        fork(watchFetchProducts),
        fork(watchFetchProductById),
    ]);
}