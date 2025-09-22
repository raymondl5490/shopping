import { all } from 'redux-saga/effects';
import shoppingItemsSaga from './shoppingItemsSaga';

// Root saga that combines all sagas
export default function* rootSaga() {
  yield all([
    shoppingItemsSaga(),
    // Add other sagas here as your app grows
    // userSaga(),
    // authSaga(),
  ]);
}