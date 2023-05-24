import styles from './form.module.css';
import stylesProfile from './profile.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {EmailInput, PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser, updateUserInformation } from '../services/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.profile.user); 
  const [password, setPassword] = React.useState('');
  const [newName, setNewName] = React.useState(user.name || '');  
  const [newEmail, setNewEmail] = React.useState(user.email || '');
  const [isEdit, setIsEdit] = React.useState(false);

  const onFormSubmit = (e) => {
    e.preventDefault();    
    const form = new FormData(e.target); 
    const formData = Object.fromEntries(form.entries()); 
    dispatch(updateUserInformation(formData));    
    setIsEdit(false);
  };

  const onCancel = () => {
    setNewName(user.name || '');
    setNewEmail(user.email || '');
    setPassword('');
    setIsEdit(false);
  }

  const onLogout = () => {
    dispatch(logoutUser());
    navigate('/login', {replace: true});
  };

  const onChange = (e) => {
    setIsEdit(true);
    switch(e.target.name) {
      case 'name': setNewName(e.target.value); break;
      case 'email': setNewEmail(e.target.value); break;
      case 'password': setPassword(e.target.value); break;
      default: console.log('none');
    }
  };

  return (
    <div className={stylesProfile.container}>
      <div className={stylesProfile.nav}>
        <NavLink to='/profile' className={({ isActive }) => isActive ? `${stylesProfile.link} ${stylesProfile.active}` : stylesProfile.link}>
          Профиль
        </NavLink>
        <NavLink to='/profile/orders' className={({ isActive }) => isActive ? `${stylesProfile.link} ${stylesProfile.active}` : stylesProfile.link}>История заказов</NavLink>
        <NavLink className={stylesProfile.link}  onClick={onLogout} >Выход</NavLink>
      
        <div className={`text text_type_main-default text_color_inactive mt-20 ${stylesProfile.secondaryText}`}>В этом разделе вы можете изменить свои персональные данные</div>
      </div>

      <form onSubmit={onFormSubmit} className={styles.form}>
        <div className={styles.input}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={'EditIcon'}
            style={{color: '#8585AD'}}    
            value= {newName}
            required
          />
        </div>
        <div className={styles.input}>
          <EmailInput
            onChange={onChange}
            value={newEmail}
            name={'email'}
            placeholder="Логин"            
            icon={'EditIcon'}
            required
          />
        </div>
        <div className={styles.input}>
          <PasswordInput
            onChange={onChange}
            value={password}
            name={'password'}
            required
          />
        </div>
        {isEdit && (
          <div className={styles.buttonsWrapper}>
          <Button htmlType="button" type="secondary" size="medium" onClick={onCancel}>Отмена</Button>
          <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
          </div> 
        )}       
      </form>
    </div>
  );
};