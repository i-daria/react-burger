import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

function AppHeader() {
  const { pathname } = useLocation();
  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderWrapper}>
        <NavLink to="/" className={({ isActive }) => isActive ? `text text_type_main-default pr-5 ${styles.link}` : `text text_type_main-default pr-5 ${styles.link} ${styles.link_color_dark}`}>
          <BurgerIcon type={pathname === "/" ? "primary" : "secondary"} />
          Конструктор
        </NavLink>
        <NavLink to="/profile/orders" end className={({ isActive }) => isActive ? `text text_type_main-default pr-5 ${styles.link}` : `text text_type_main-default pr-5 ${styles.link} ${styles.link_color_dark}`}>
          <ListIcon type={pathname === "/profile/orders" ? "primary" : "secondary"} />
          Лента заказов
        </NavLink>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink to="/profile" end className={({ isActive }) => isActive ? `text text_type_main-default pl-5 ${styles.link}` : `text text_type_main-default pl-5 ${styles.link} ${styles.link_color_dark}`}>
          <ProfileIcon type={pathname === "/profile" ? "primary" : "secondary"}  />
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;