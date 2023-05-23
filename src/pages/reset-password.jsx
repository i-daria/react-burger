import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { resetPassword } from '../utils/api';

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = React.useState('');  
  const [code, setCode] = React.useState('');
  const { state } = useLocation();
  const from = state?.from || '/';
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target); 
    const formData = Object.fromEntries(form.entries()); 
    resetPassword(formData)
      .then (res => {if (res && res.success) navigate('/login')})
      .catch(err => {if (err === 'Ошибка: 404') alert(err + ': Введен неправильный проверочный код')});
    
    console.log(formData);
  };

  return from !== '/forgot-password' ? <Navigate to='/login' replace='true' />  : (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form onSubmit={onFormSubmit} >
        <div className={styles.input}>
          <PasswordInput        
            placeholder={'Введите новый пароль'}
            onChange={e => setNewPassword(e.target.value)}
            value= {newPassword}
            name={'password'}
            extraClass="mb-2"
          />
        </div>
        <div className={styles.input}>
        <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={e => setCode(e.target.value)}
            value= {code}
            name={'token'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
        </div>
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="medium" >Сохранить</Button>
        </div>
      </form>
      <div className={styles.label}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></div>
    </div>
  );
};