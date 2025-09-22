import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  items: [],
  loading: false,
  error: null,
};

// Shopping Items Slice
const shoppingItemsSlice = createSlice({
  name: 'shoppingItems',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Items CRUD operations (these will trigger sagas)
    fetchItemsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add item
    addItemRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addItemSuccess: (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update item
    updateItemRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateItemSuccess: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Toggle item purchased status
    toggleItemRequest: (state) => {
      state.loading = false; // Don't show loading for quick toggle
      state.error = null;
    },
    toggleItemSuccess: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
      state.error = null;
    },
    toggleItemFailure: (state, action) => {
      state.error = action.payload;
    },

    // Delete item
    deleteItemRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteItemSuccess: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteItemFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  clearError,
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
} = shoppingItemsSlice.actions;

// Selectors
export const selectAllItems = (state) => state.shoppingItems.items;
export const selectItemsLoading = (state) => state.shoppingItems.loading;
export const selectItemsError = (state) => state.shoppingItems.error;

export const selectItemById = (state, itemId) => 
  state.shoppingItems.items.find(item => item.id === itemId);

// Export reducer
export default shoppingItemsSlice.reducer;