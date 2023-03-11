import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay ({onClick}) {
  
  return (
    <div className={styles.overlay} onClick={onClick}>
    </div>
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func,
};

export default ModalOverlay;