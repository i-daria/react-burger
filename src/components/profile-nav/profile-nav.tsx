import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/types/hooks';
import styles from './profile-nav.module.css';
import { logoutUser } from '../../services/actions/profile';
import React from 'react';

export const ProfileNav: React.FC = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Проверить работу и стили ссылки, добавила ссылку на log-in
    dispatch(logoutUser());
    navigate('/login', {replace: true});
  };
  return (
    <div className={styles.nav}>
      <NavLink to='/profile' end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>
        Профиль
      </NavLink>
      <NavLink to='/profile/orders' className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>История заказов</NavLink>
      <NavLink to ='/login' className={styles.link}  onClick={onLogout} >Выход</NavLink>
    
      <div className={`text text_type_main-default text_color_inactive mt-20 ${styles.secondaryText}`}>В этом разделе вы можете изменить свои персональные данные</div>
    </div>
  );
};