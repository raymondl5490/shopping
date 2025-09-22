require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeDatabase } = require('./config/database');
const shoppingItemsRoutes = require('./routes/shoppingItems');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Shopping Backend API is running!',
    version: '1.0.0',
    endpoints: {
      'GET /api/shopping-items': 'Get all shopping items',
      'POST /api/shopping-items': 'Create a new shopping item',
      'PUT /api/shopping-items/:id': 'Update a shopping item',
      'DELETE /api/shopping-items/:id': 'Delete a shopping item',
      'PATCH /api/shopping-items/:id/toggle': 'Toggle purchase status'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/shopping-items', shoppingItemsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Database connected successfully`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;