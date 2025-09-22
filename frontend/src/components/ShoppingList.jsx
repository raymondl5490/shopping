import React, { useState } from 'react';
import './ShoppingList.scss';

function ShoppingList() {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddItem = () => {
    setShowAddModal(true);
    // TODO: Implement add item modal
    console.log('Add item clicked');
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
          {/* Empty State */}
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
        </div>
      </main>
    </div>
  );
}

export default ShoppingList;