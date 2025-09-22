import React from 'react';
import './ShoppingItem.scss';

function ShoppingItem({ 
  item, 
  onTogglePurchased, 
  onEdit, 
  onDelete 
}) {
  const handleCheckboxChange = () => {
    onTogglePurchased(item.id);
  };

  const handleEdit = () => {
    onEdit(item);
  };

  const handleDelete = () => {
    onDelete(item);
  };

  return (
    <div className={`shopping-item ${item.purchased ? 'shopping-item--purchased' : ''}`}>
      {/* Checkbox */}
      <div className="shopping-item__checkbox">
        <input
          type="checkbox"
          checked={item.purchased}
          onChange={handleCheckboxChange}
          className="shopping-item__checkbox-input"
          id={`item-${item.id}`}
        />
        <label 
          htmlFor={`item-${item.id}`} 
          className="shopping-item__checkbox-label"
        />
      </div>

      {/* Item Content */}
      <div className="shopping-item__content">
        <h3 className="shopping-item__name">{item.name}</h3>
        {item.description && (
          <p className="shopping-item__description">{item.description}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="shopping-item__actions">
        <button 
          className="shopping-item__action shopping-item__action--edit"
          onClick={handleEdit}
          title="Edit item"
        >
          <span className="material-icons">edit</span>
        </button>
        <button 
          className="shopping-item__action shopping-item__action--delete"
          onClick={handleDelete}
          title="Delete item"
        >
          <span className="material-icons">delete</span>
        </button>
      </div>
    </div>
  );
}

export default ShoppingItem;