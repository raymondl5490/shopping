const { pool } = require('../config/database');

class ShoppingItem {
  
  // Get all shopping items
  static async getAll() {
    try {
      const result = await pool.query(
        'SELECT * FROM shopping_items ORDER BY created_at DESC'
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching shopping items: ${error.message}`);
    }
  }

  // Get a single shopping item by ID
  static async getById(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM shopping_items WHERE id = $1',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching shopping item: ${error.message}`);
    }
  }

  // Create a new shopping item
  static async create({ name, description, quantity = 1 }) {
    try {
      const result = await pool.query(
        `INSERT INTO shopping_items (name, description, quantity)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, description, quantity]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating shopping item: ${error.message}`);
    }
  }

  // Update an existing shopping item
  static async update(id, { name, description, quantity, purchased }) {
    try {
      // Build dynamic update query
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (name !== undefined) {
        updates.push(`name = $${paramCount++}`);
        values.push(name);
      }
      if (description !== undefined) {
        updates.push(`description = $${paramCount++}`);
        values.push(description);
      }
      if (quantity !== undefined) {
        updates.push(`quantity = $${paramCount++}`);
        values.push(quantity);
      }
      if (purchased !== undefined) {
        updates.push(`purchased = $${paramCount++}`);
        values.push(purchased);
      }

      if (updates.length === 0) {
        throw new Error('No fields to update');
      }

      values.push(id);
      
      const result = await pool.query(
        `UPDATE shopping_items 
         SET ${updates.join(', ')}
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating shopping item: ${error.message}`);
    }
  }

  // Delete a shopping item
  static async delete(id) {
    try {
      const result = await pool.query(
        'DELETE FROM shopping_items WHERE id = $1 RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting shopping item: ${error.message}`);
    }
  }

  // Mark item as purchased/unpurchased
  static async togglePurchased(id) {
    try {
      const result = await pool.query(
        `UPDATE shopping_items 
         SET purchased = NOT purchased
         WHERE id = $1
         RETURNING *`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error toggling purchase status: ${error.message}`);
    }
  }

  // Get items by purchase status
  static async getByPurchaseStatus(purchased = false) {
    try {
      const result = await pool.query(
        'SELECT * FROM shopping_items WHERE purchased = $1 ORDER BY created_at DESC',
        [purchased]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching shopping items by status: ${error.message}`);
    }
  }
}

module.exports = ShoppingItem;