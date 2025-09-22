const express = require('express');
const router = express.Router();
const ShoppingItemController = require('../controllers/shoppingItemController');

// GET /api/shopping-items - Get all shopping items
router.get('/', ShoppingItemController.getAllItems);

// GET /api/shopping-items/filter - Get items by purchase status
router.get('/filter', ShoppingItemController.getItemsByStatus);

// GET /api/shopping-items/:id - Get a specific shopping item
router.get('/:id', ShoppingItemController.getItemById);

// POST /api/shopping-items - Create a new shopping item
router.post('/', ShoppingItemController.createItem);

// PUT /api/shopping-items/:id - Update a shopping item
router.put('/:id', ShoppingItemController.updateItem);

// PATCH /api/shopping-items/:id/toggle - Toggle purchase status
router.patch('/:id/toggle', ShoppingItemController.togglePurchaseStatus);

// DELETE /api/shopping-items/:id - Delete a shopping item
router.delete('/:id', ShoppingItemController.deleteItem);

module.exports = router;