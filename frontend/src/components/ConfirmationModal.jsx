import React from 'react';
import './ConfirmationModal.scss';

function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Item?",
  message = "Are you sure you want to delete this item? This can not be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  type = "danger" // danger, warning, info
}) {
  
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay" onClick={handleBackdropClick}>
      <div className="confirmation-modal">
        <div className="confirmation-modal__content">
          <h3 className="confirmation-modal__title">{title}</h3>
          <p className="confirmation-modal__message">{message}</p>
          
          <div className="confirmation-modal__actions">
            <button 
              type="button"
              onClick={handleCancel}
              className="confirmation-modal__button confirmation-modal__button--cancel"
            >
              {cancelText}
            </button>
            <button 
              type="button"
              onClick={handleConfirm}
              className={`confirmation-modal__button confirmation-modal__button--${type}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;