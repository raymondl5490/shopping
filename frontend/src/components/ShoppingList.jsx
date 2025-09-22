import React, { useState } from 'react';
import './ShoppingList.scss';
import ShoppingItemAdd from './ShoppingItemAdd';
import ShoppingItemEdit from './ShoppingItemEdit';
import ShoppingItem from './ShoppingItem';
import ConfirmationModal from './ConfirmationModal';

function ShoppingList() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleAddItem = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleSaveNewItem = (itemData) => {
    const newItem = {
      id: Date.now(), // Simple ID generation
      ...itemData,
      purchased: false
    };
    setItems(prev => [...prev, newItem]);
    setShowAddModal(false);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleSaveEditedItem = (updatedItem) => {
    setItems(prev => prev.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleTogglePurchased = (itemId) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const handleDeleteItem = (itemToDelete) => {
    setSelectedItem(itemToDelete);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      setItems(prev => prev.filter(item => item.id !== selectedItem.id));
    }
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="shopping-list">
      {/* Header */}
      <header className="shopping-list__header">
        <h1 className="shopping-list__title">SHOPPING LIST</h1>
      </header>

      {/* Main Content */}
      <main className="shopping-list__main">
        <div className="shopping-list__container">
          {items.length === 0 ? (
            /* Empty State */
            <div className="shopping-list__empty-state">
              <div className="shopping-list__empty-content">
                <p className="shopping-list__empty-message">
                  Your shopping list is empty :(
                </p>
                <button 
                  className="shopping-list__button"
                  onClick={handleAddItem}
                >
                  Add your first item
                </button>
              </div>
            </div>
          ) : (
            /* Items List */
            <div className="shopping-list__items-section">
              <div className="shopping-list__items-header">
                <h2 className="shopping-list__items-title">Your Items</h2>
                <button 
                  className="shopping-list__button shopping-list__button--small"
                  onClick={handleAddItem}
                >
                  Add Item
                </button>
              </div>
              <div className="shopping-list__items-list">
                {items.map((item) => (
                  <ShoppingItem
                    key={item.id}
                    item={item}
                    onTogglePurchased={handleTogglePurchased}
                    onEdit={handleEditItem}
                    onDelete={handleDeleteItem}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <ShoppingItemAdd
        isOpen={showAddModal}
        onClose={handleCloseAddModal}
        onSave={handleSaveNewItem}
      />
      
      <ShoppingItemEdit
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditedItem}
        item={selectedItem}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Item?"
        message="Are you sure you want to delete this item? This can not be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

export default ShoppingList;