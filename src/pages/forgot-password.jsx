import {EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './form.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { forgotPassword } from '../utils/api';

export const ForgotPassword = () => {  
  const [email, setEmail] = React.useState('');
  const isLogin = useSelector(store => store.profile.isLogin);
  const navigate  = useNavigate();
  const { state } = useLocation();
  const from = state?.from || '/';
  
  const onSubmitForm = (e) => {    
    e.preventDefault();
    forgotPassword(e.target.email.value)
    .then(res => {
      if (res && res.success) {
        navigate('/reset-password', { state: { from: '/forgot-password' } });
      }
    })
    .catch(err => console.log('err - ' + err));
  };

  React.useEffect(() => {
    if (isLogin) {
      navigate(from);
    } 
  }, [isLogin, navigate, from]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>      
      <form onSubmit={onSubmitForm}>
        <div className={styles.input}>
          <EmailInput            
            placeholder={'Укажите e-mail'}      
            onChange={e => setEmail(e.target.value)}
            value= {email}
            name={'email'}
            isIcon={false}
            required
          />
        </div>
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="medium" >Восстановить</Button>
        </div>
        <div className={styles.label}>Вспомнили пароль? <Link to='/login' className={styles.link}>Войти</Link></div>
      </form>
    </div>
  );
};