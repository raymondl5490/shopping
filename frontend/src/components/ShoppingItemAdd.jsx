import React, { useState } from 'react';
import './ShoppingItemModal.scss';

function ShoppingItemAdd({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 1
  });

  const [charCount, setCharCount] = useState(0);
  const maxDescriptionLength = 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'description') {
      if (value.length <= maxDescriptionLength) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 1;
    setFormData(prev => ({ ...prev, quantity }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', description: '', quantity: 1 });
    setCharCount(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="shopping-item-modal" onClick={(e) => e.stopPropagation()}>
        <div className="shopping-item-modal__header">
          <h2 className="shopping-item-modal__title">SHOPPING LIST</h2>
          <button 
            className="shopping-item-modal__close"
            onClick={handleClose}
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        <div className="shopping-item-modal__content">
          <h3 className="shopping-item-modal__subtitle">Add an Item</h3>
          <p className="shopping-item-modal__description">Add your new item below</p>

          <form onSubmit={handleSubmit} className="shopping-item-modal__form">
            <div className="shopping-item-modal__field">
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={formData.name}
                onChange={handleInputChange}
                className="shopping-item-modal__input"
                required
              />
            </div>

            <div className="shopping-item-modal__field">
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="shopping-item-modal__textarea"
                rows={4}
              />
              <div className="shopping-item-modal__char-count">
                {charCount}/{maxDescriptionLength}
              </div>
            </div>

            <div className="shopping-item-modal__field">
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleQuantityChange}
                className="shopping-item-modal__select"
              >
                <option value="" disabled>How many?</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div className="shopping-item-modal__actions">
              <button 
                type="button"
                onClick={handleClose}
                className="shopping-item-modal__button shopping-item-modal__button--cancel"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="shopping-item-modal__button shopping-item-modal__button--primary"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShoppingItemAdd;