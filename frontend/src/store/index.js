import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import shoppingItemsReducer from './slices/shoppingItemsSlice';
import rootSaga from './sagas/rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
export const store = configureStore({
  reducer: {
    shoppingItems: shoppingItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // We're using saga instead of thunk
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Run the saga middleware
sagaMiddleware.run(rootSaga);

// Export store for use in components
export default store;