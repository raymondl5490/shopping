const ShoppingItem = require('../models/shoppingItem');

class ShoppingItemController {

  // Get all shopping items
  static async getAllItems(req, res) {
    try {
      const items = await ShoppingItem.getAll();
      res.json({
        success: true,
        data: items,
        count: items.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get a single shopping item
  static async getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = await ShoppingItem.getById(id);
      
      if (!item) {
        return res.status(404).json({
          success: false,
          message: 'Shopping item not found'
        });
      }

      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Create a new shopping item
  static async createItem(req, res) {
    try {
      const { name, description, quantity } = req.body;

      // Validation
      if (!name || name.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Name is required'
        });
      }

      if (quantity && (isNaN(quantity) || quantity < 1)) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be a positive number'
        });
      }

      const newItem = await ShoppingItem.create({
        name: name.trim(),
        description: description ? description.trim() : null,
        quantity: quantity || 1
      });

      res.status(201).json({
        success: true,
        data: newItem,
        message: 'Shopping item created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update an existing shopping item
  static async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { name, description, quantity, purchased } = req.body;

      // Check if item exists
      const existingItem = await ShoppingItem.getById(id);
      if (!existingItem) {
        return res.status(404).json({
          success: false,
          message: 'Shopping item not found'
        });
      }

      // Validation
      if (name !== undefined && name.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Name cannot be empty'
        });
      }

      if (quantity !== undefined && (isNaN(quantity) || quantity < 1)) {
        return res.status(400).json({
          success: false,
          message: 'Quantity must be a positive number'
        });
      }

      const updateData = {};
      if (name !== undefined) updateData.name = name.trim();
      if (description !== undefined) updateData.description = description ? description.trim() : null;
      if (quantity !== undefined) updateData.quantity = parseInt(quantity);
      if (purchased !== undefined) updateData.purchased = Boolean(purchased);

      const updatedItem = await ShoppingItem.update(id, updateData);

      res.json({
        success: true,
        data: updatedItem,
        message: 'Shopping item updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Delete a shopping item
  static async deleteItem(req, res) {
    try {
      const { id } = req.params;

      const deletedItem = await ShoppingItem.delete(id);
      
      if (!deletedItem) {
        return res.status(404).json({
          success: false,
          message: 'Shopping item not found'
        });
      }

      res.json({
        success: true,
        data: deletedItem,
        message: 'Shopping item deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Toggle purchase status
  static async togglePurchaseStatus(req, res) {
    try {
      const { id } = req.params;

      const updatedItem = await ShoppingItem.togglePurchased(id);
      
      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          message: 'Shopping item not found'
        });
      }

      res.json({
        success: true,
        data: updatedItem,
        message: `Shopping item marked as ${updatedItem.purchased ? 'purchased' : 'not purchased'}`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get items by purchase status
  static async getItemsByStatus(req, res) {
    try {
      const { purchased } = req.query;
      const isPurchased = purchased === 'true';
      
      const items = await ShoppingItem.getByPurchaseStatus(isPurchased);
      
      res.json({
        success: true,
        data: items,
        count: items.length,
        filter: isPurchased ? 'purchased' : 'not purchased'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = ShoppingItemController;