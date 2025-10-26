import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import styles from './SuccessModal.module.css';
import { MdCheckCircle, MdError, MdWarning, MdInfo } from 'react-icons/md';

const SuccessModal = ({ 
  type = 'success', 
  title, 
  message, 
  confirmText = 'OK',
  onClose,
  autoClose = true,
  duration = 3000 
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    const modal = document.querySelector(`.${styles.overlay}`);
    if (modal) {
      modal.classList.add(styles.fadeOut);
      setTimeout(() => {
        onClose();
      }, 300);
    }
  };

  const icons = {
    success: <MdCheckCircle className={styles.icon} />,
    error: <MdError className={styles.icon} />,
    warning: <MdWarning className={styles.icon} />,
    info: <MdInfo className={styles.icon} />
  };

  const titles = {
    success: title || 'Success!',
    error: title || 'Error!',
    warning: title || 'Warning!',
    info: title || 'Info'
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={`${styles.modal} ${styles[type]}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconContainer}>
          <div className={styles.iconCircle}>
            {icons[type]}
          </div>
        </div>
        
        <h2 className={styles.title}>{titles[type]}</h2>
        
        <p className={styles.message}>{message}</p>
        
        <button 
          className={`${styles.confirmButton} ${styles[`${type}Button`]}`}
          onClick={handleClose}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

// Modal Manager
let modalRoot = null;
let modalContainer = null;

const showModal = (options) => {
  if (!modalContainer) {
    modalContainer = document.createElement('div');
    modalContainer.id = 'modal-container';
    document.body.appendChild(modalContainer);
    modalRoot = ReactDOM.createRoot(modalContainer);
  }

  const handleClose = () => {
    if (modalRoot && modalContainer) {
      modalRoot.unmount();
      modalContainer.remove();
      modalRoot = null;
      modalContainer = null;
    }
  };

  modalRoot.render(
    <SuccessModal {...options} onClose={handleClose} />
  );
};

export const Modal = {
  success: (message, options = {}) => showModal({ 
    type: 'success', 
    message, 
    title: options.title,
    confirmText: options.confirmText || 'OK',
    autoClose: options.autoClose !== false,
    duration: options.duration || 3000
  }),
  error: (message, options = {}) => showModal({ 
    type: 'error', 
    message,
    title: options.title,
    confirmText: options.confirmText || 'OK',
    autoClose: options.autoClose !== false,
    duration: options.duration || 3000
  }),
  warning: (message, options = {}) => showModal({ 
    type: 'warning', 
    message,
    title: options.title,
    confirmText: options.confirmText || 'OK',
    autoClose: options.autoClose !== false,
    duration: options.duration || 3000
  }),
  info: (message, options = {}) => showModal({ 
    type: 'info', 
    message,
    title: options.title,
    confirmText: options.confirmText || 'OK',
    autoClose: options.autoClose !== false,
    duration: options.duration || 3000
  }),
};

export default SuccessModal;