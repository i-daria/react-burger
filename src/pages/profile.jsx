import styles from './form.module.css';
import stylesProfile from './profile.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {EmailInput, PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserInformation, logoutUser, updateUserInformation } from '../services/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.profile.user); 
  const [password, setPassword] = React.useState('');
  const [newName, setNewName] = React.useState(user.name || '');  
  const [newEmail, setNewEmail] = React.useState(user.email || '');
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const onFormSubmit = (e) => {
    e.preventDefault();    
    const form = new FormData(e.target); 
    const formData = Object.fromEntries(form.entries()); 
    dispatch(updateUserInformation(formData));
  };

  const onCancel = () => {
    setNewName(user.name || '');
    setNewEmail(user.email || '');
    setPassword('');
  }

  React.useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch]);


  return (
    <div className={stylesProfile.container}>
      <div className={stylesProfile.nav}>
        <NavLink to='/profile' className={({ isActive }) => isActive ? `${stylesProfile.link} ${stylesProfile.active}` : stylesProfile.link}>
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' className={({ isActive }) => isActive ? `${stylesProfile.link} ${stylesProfile.active}` : stylesProfile.link}>История заказов</NavLink>
        <NavLink  className={({ isActive }) => isActive ? `${stylesProfile.link} ${stylesProfile.active}` : stylesProfile.link}  onClick={onLogout}>Выход</NavLink>
      
        <div className="text text_type_main-default text_color_inactive mt-20" style={{opacity: 0.4}}>В этом разделе вы можете изменить свои персональные данные</div>
      </div>

      <form onSubmit={onFormSubmit} className={styles.form}>
        <div className={styles.input}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNewName(e.target.value)}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={'EditIcon'}
            style={{color: '#8585AD'}}    
            value= {newName}
          />
        </div>
        <div className={styles.input}>
          <EmailInput
            onChange={e => setNewEmail(e.target.value)}
            value={newEmail}
            name={'email'}
            placeholder="Логин"            
            icon={'EditIcon'}
          />
        </div>
        <div className={styles.input}>
          <PasswordInput
            onChange={e => setPassword(e.target.value)}
            value={password}
            name={'password'}
          />
        </div>
        <div className={styles.buttonsWrapper}>
        <Button htmlType="button" type="secondary" size="medium" onClick={onCancel}>Отмена</Button>
        <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
        </div>        
      </form>
    </div>
  );
};