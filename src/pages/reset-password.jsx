import {PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { resetPassword } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../utils/cookie';
import { getUserInformation } from '../services/actions/profile';
import { FORGOT_PASSWORD_URL, getIsLogin, HOME_URL, LOGIN_URL } from '../utils/constants';

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = React.useState('');  
  const [code, setCode] = React.useState('');
  const { state } = useLocation();
  const from = state?.from || HOME_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);
  const accessToken = getCookie('accessToken');

  const onFormSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target); 
    const formData = Object.fromEntries(form.entries()); 
    resetPassword(formData)
      .then (res => {if (res && res.success) navigate(LOGIN_URL)})
      .catch(err => {if (err === 'Ошибка: 404') alert(err + ': Введен неправильный проверочный код')});
  };

  React.useEffect(() => {
    if (isLogin) {
      navigate(HOME_URL, {replace:true});
    } else if (accessToken) {
      dispatch(getUserInformation());
    }
  }, [isLogin, accessToken, dispatch, navigate]);

  return from !== FORGOT_PASSWORD_URL ? <Navigate to={LOGIN_URL} replace='true' />  : (
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
            required
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
            required
          />
        </div>
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="medium" >Сохранить</Button>
        </div>
      </form>
      <div className={styles.label}>Вспомнили пароль? <Link to={LOGIN_URL} className={styles.link}>Войти</Link></div>
    </div>
  );
};