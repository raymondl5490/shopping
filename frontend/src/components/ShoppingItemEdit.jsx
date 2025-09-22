import React, { useState, useEffect } from 'react';
import './ShoppingItemModal.scss';

function ShoppingItemEdit({ isOpen, onClose, onSave, item }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 1,
    purchased: false
  });

  const [charCount, setCharCount] = useState(0);
  const maxDescriptionLength = 100;

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        quantity: item.quantity || 1,
        purchased: item.purchased || false
      });
      setCharCount((item.description || '').length);
    }
  }, [item]);

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

  const handlePurchasedChange = (e) => {
    setFormData(prev => ({ ...prev, purchased: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave({ ...item, ...formData });
      onClose();
    }
  };

  const handleClose = () => {
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
          <h3 className="shopping-item-modal__subtitle">Edit an Item</h3>
          <p className="shopping-item-modal__description">Edit your item below</p>

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

            <div className="shopping-item-modal__field shopping-item-modal__field--checkbox">
              <label className="shopping-item-modal__checkbox-label">
                <input
                  type="checkbox"
                  name="purchased"
                  checked={formData.purchased}
                  onChange={handlePurchasedChange}
                  className="shopping-item-modal__checkbox"
                />
                <span className="shopping-item-modal__checkbox-text">Purchased</span>
              </label>
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
                Save Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ShoppingItemEdit;