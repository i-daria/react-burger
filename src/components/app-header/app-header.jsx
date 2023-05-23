import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderWrapper}>
        <Link to="/" className={`text text_type_main-default pr-5 ${styles.link}`}>
          <BurgerIcon type="primary" />
          Конструктор
        </Link>
        <Link to="/profile/orders" className={`text text_type_main-default pr-5 pl-5 ${styles.link} ${styles.link_color_dark}`}>
          <ListIcon type="secondary" />
          Лента заказов
        </Link>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Link to="/profile" className={`text text_type_main-default pl-5 ${styles.link} ${styles.link_color_dark}`}>
          <ProfileIcon type="secondary" />
          Личный кабинет
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;