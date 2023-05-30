import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import {
  HOME_URL,
  FEED_URL,
  PROFILE_ORDERS_URL
} from "../../utils/constants";

function AppHeader() {
  const { pathname } = useLocation();
  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderWrapper}>
        <NavLink to={ HOME_URL } className={({ isActive }) => isActive ? `text text_type_main-default pr-5 ${styles.link}` : `text text_type_main-default pr-5 ${styles.link} ${styles.link_color_dark}`}>
          <BurgerIcon type={pathname === HOME_URL ? "primary" : "secondary"} />
          Конструктор
        </NavLink>
        <NavLink to={FEED_URL} end className={({ isActive }) => isActive ? `text text_type_main-default pr-5 ${styles.link}` : `text text_type_main-default pr-5 ${styles.link} ${styles.link_color_dark}`}>
          <ListIcon type={pathname === FEED_URL ? "primary" : "secondary"} />
          Лента заказов
        </NavLink>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink to={PROFILE_ORDERS_URL} end className={({ isActive }) => isActive ? `text text_type_main-default pl-5 ${styles.link}` : `text text_type_main-default pl-5 ${styles.link} ${styles.link_color_dark}`}>
          <ProfileIcon type={pathname === PROFILE_ORDERS_URL ? "primary" : "secondary"}  />
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;