import styles from './form.module.css';
import { Link } from 'react-router-dom';

export const NotFound404 = () => {
  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Страница не найдена</h1>      
      <div className={styles.label}>Перейти на <Link to='/' className={styles.link}>главную</Link></div>
    </div>
  );
};