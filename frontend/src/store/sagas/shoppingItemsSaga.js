import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import { shoppingItemsAPI, getErrorMessage } from '../../services/api';
import {
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsFailure,
  addItemRequest,
  addItemSuccess,
  addItemFailure,
  updateItemRequest,
  updateItemSuccess,
  updateItemFailure,
  toggleItemRequest,
  toggleItemSuccess,
  toggleItemFailure,
  deleteItemRequest,
  deleteItemSuccess,
  deleteItemFailure,
} from '../slices/shoppingItemsSlice';

// Fetch all items saga
function* fetchItemsSaga() {
  try {
    const response = yield call(shoppingItemsAPI.fetchItems);
    yield put(fetchItemsSuccess(response.data.data));
  } catch (error) {
    yield put(fetchItemsFailure(getErrorMessage(error)));
  }
}

// Add new item saga
function* addItemSaga(action) {
  try {
    const response = yield call(shoppingItemsAPI.createItem, action.payload);
    yield put(addItemSuccess(response.data.data));
  } catch (error) {
    yield put(addItemFailure(getErrorMessage(error)));
  }
}

// Update item saga
function* updateItemSaga(action) {
  try {
    const { id, ...itemData } = action.payload;
    const response = yield call(shoppingItemsAPI.updateItem, id, itemData);
    yield put(updateItemSuccess(response.data.data));
  } catch (error) {
    yield put(updateItemFailure(getErrorMessage(error)));
  }
}

// Toggle item purchased status saga
function* toggleItemSaga(action) {
  try {
    const itemId = action.payload;
    const response = yield call(shoppingItemsAPI.toggleItemPurchased, itemId);
    yield put(toggleItemSuccess(response.data.data));
  } catch (error) {
    yield put(toggleItemFailure(getErrorMessage(error)));
  }
}

// Delete item saga
function* deleteItemSaga(action) {
  try {
    const itemId = action.payload;
    yield call(shoppingItemsAPI.deleteItem, itemId);
    yield put(deleteItemSuccess(itemId));
  } catch (error) {
    yield put(deleteItemFailure(getErrorMessage(error)));
  }
}

// Watcher sagas
function* watchFetchItems() {
  yield takeLatest(fetchItemsRequest.type, fetchItemsSaga);
}

function* watchAddItem() {
  yield takeEvery(addItemRequest.type, addItemSaga);
}

function* watchUpdateItem() {
  yield takeEvery(updateItemRequest.type, updateItemSaga);
}

function* watchToggleItem() {
  yield takeEvery(toggleItemRequest.type, toggleItemSaga);
}

function* watchDeleteItem() {
  yield takeEvery(deleteItemRequest.type, deleteItemSaga);
}

// Shopping Items root saga
export default function* shoppingItemsSaga() {
  yield all([
    watchFetchItems(),
    watchAddItem(),
    watchUpdateItem(),
    watchToggleItem(),
    watchDeleteItem(),
  ]);
}