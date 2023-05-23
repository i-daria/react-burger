import stylesProfile from './profile.module.css';
import {NavLink} from 'react-router-dom';

export const Orders = () => {
  return (
    <div className={stylesProfile.container}>
      <div className={stylesProfile.nav}>
        <NavLink to='/profile' className={({ isActive }) => isActive ? `${stylesProfile.link} ${stylesProfile.active}` : stylesProfile.link} end>
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' className={({ isActive }) => isActive ? `${stylesProfile.link} ${stylesProfile.active}` : stylesProfile.link} end>История заказов</NavLink>
        <NavLink to='/login' className={({ isActive }) => isActive ? `${stylesProfile.link} ${stylesProfile.active}` : stylesProfile.link}>Выход</NavLink>
      
        <div className="text text_type_main-default text_color_inactive mt-20" style={{opacity: 0.4}}>В этом разделе вы можете изменить свои персональные данные</div>
      </div>
    </div>
  );
}