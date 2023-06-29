import styles from './form.module.css';
import { Link } from 'react-router-dom';
import { HOME_URL } from '../utils/constants';

export const NotFound404: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Страница не найдена</h1>      
      <div className={styles.label}>Перейти на <Link to={HOME_URL} className={styles.link}>главную</Link></div>
    </div>
  );
};