import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ShoppingList.scss';
import ShoppingItemAdd from './ShoppingItemAdd';
import ShoppingItemEdit from './ShoppingItemEdit';
import ShoppingItem from './ShoppingItem';
import ConfirmationModal from './ConfirmationModal';
import {
  fetchItemsRequest,
  addItemRequest,
  updateItemRequest,
  toggleItemRequest,
  deleteItemRequest,
  selectAllItems,
  selectItemsLoading,
  selectItemsError,
} from '../store/slices/shoppingItemsSlice';

function ShoppingList() {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  const loading = useSelector(selectItemsLoading);
  const error = useSelector(selectItemsError);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch items on component mount
  useEffect(() => {
    dispatch(fetchItemsRequest());
  }, [dispatch]);

  const handleAddItem = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleSaveNewItem = (itemData) => {
    dispatch(addItemRequest(itemData));
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
    dispatch(updateItemRequest(updatedItem));
    setShowEditModal(false);
    setSelectedItem(null);
  };

  const handleTogglePurchased = (itemId) => {
    dispatch(toggleItemRequest(itemId));
  };

  const handleDeleteItem = (itemToDelete) => {
    setSelectedItem(itemToDelete);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      dispatch(deleteItemRequest(selectedItem.id));
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

      {/* Error Message */}
      {error && (
        <div className="shopping-list__error">
          <p>{error}</p>
          <button onClick={() => dispatch(fetchItemsRequest())}>
            Retry
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="shopping-list__main">
        <div className="shopping-list__container">
          {loading ? (
            <div className="shopping-list__loading">
              <p>Loading items...</p>
            </div>
          ) : null}
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