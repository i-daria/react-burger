import styles from './app-header.module.css';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.appHeaderWrapper}>
        <a href="#" className={`text text_type_main-default pr-5 ${styles.link}`}>
          <BurgerIcon type="primary" />
          Конструктор
        </a>
        <a href="#" className={`text text_type_main-default pr-5 pl-5 ${styles.link} ${styles.link_color_dark}`}>        
          <ListIcon type="secondary" />
          Лента заказов
        </a>
        <div className={styles.logo}>
          <Logo />      
        </div>
        <a href="#" className={`text text_type_main-default pl-5 ${styles.link} ${styles.link_color_dark}`}>   
          <ProfileIcon type="secondary" />
          Личный кабинет
        </a>
        </div>
    </header>
  );
}

export default AppHeader;