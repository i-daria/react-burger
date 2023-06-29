import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalsRoot = document.getElementById('modals') as HTMLElement;

type TModal = {
  title?: string, 
  children: ReactNode, 
  onClose: () => void,
};

const Modal: React.FC<TModal>  = ({title, children, onClose}) => {
  React.useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
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

export default Modal;