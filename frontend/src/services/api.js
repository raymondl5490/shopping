import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token here if you implement authentication
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    console.error('API Error:', error);
    
    // You can handle specific error codes here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // localStorage.removeItem('authToken');
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Shopping Items API Service
export const shoppingItemsAPI = {
  // Fetch all shopping items
  fetchItems: () => {
    return api.get('/shopping-items');
  },

  // Fetch items with filter
  fetchItemsWithFilter: (filter) => {
    const params = {};
    if (filter === 'purchased') {
      params.purchased = true;
    } else if (filter === 'unpurchased') {
      params.purchased = false;
    }
    
    return api.get('/shopping-items/filter', { params });
  },

  // Fetch single item by ID
  fetchItemById: (id) => {
    return api.get(`/shopping-items/${id}`);
  },

  // Create new shopping item
  createItem: (itemData) => {
    return api.post('/shopping-items', itemData);
  },

  // Update existing shopping item
  updateItem: (id, itemData) => {
    return api.put(`/shopping-items/${id}`, itemData);
  },

  // Toggle item purchased status
  toggleItemPurchased: (id) => {
    return api.patch(`/shopping-items/${id}/toggle`);
  },

  // Delete shopping item
  deleteItem: (id) => {
    return api.delete(`/shopping-items/${id}`);
  },
};

// Helper function to extract error message
export const getErrorMessage = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || error.response.data?.error || 'Server error occurred';
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred';
  }
};

export default api;