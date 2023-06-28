import styles from './modal-overlay.module.css';

type TModalOverlay = {
  onClick: () => void,
};

const ModalOverlay: React.FC<TModalOverlay>  = ({onClick}) => {
  
  return (
    <div className={styles.overlay} onClick={onClick}>
    </div>
  );
};

export default ModalOverlay;