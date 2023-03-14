import React from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import PropTypes from "prop-types";

const modalsRoot = document.getElementById('modals');

const Modal = ({title, children, onClose}) => {
  React.useEffect(() => {
    const handleEscape = (evt) => {
      evt.key === 'Escape' && onClose();  
    }
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    }
  }, [onClose]);

  return ReactDOM.createPortal (
  <>
    <ModalOverlay onClick={onClose}/>
    <div className={styles.modal}>
      <div className={styles.header}>
        <h2 className='text text_type_main-large pt-3 pb-3'> {title} </h2>      
        <CloseIcon type="primary" onClick={onClose} />
      </div>
      {children}
    </div>
    </>,
    modalsRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default Modal;