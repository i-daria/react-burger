import {EmailInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './form.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from '../utils/api';
import { getCookie } from '../utils/cookie';
import { getUserInformation } from '../services/actions/profile';
import { FORGOT_PASSWORD_URL, getIsLogin, HOME_URL, LOGIN_URL, RESET_PASSWORD_URL } from '../utils/constants';

export const ForgotPassword = () => {  
  const [email, setEmail] = React.useState('');
  const isLogin = useSelector(getIsLogin);
  const navigate  = useNavigate();
  const { state } = useLocation();
  const from = state?.from || HOME_URL;
  const dispatch = useDispatch();
  const accessToken = getCookie('accessToken');
  
  const onSubmitForm = (e) => {    
    e.preventDefault();
    forgotPassword(e.target.email.value)
    .then(res => {
      if (res && res.success) {
        navigate(RESET_PASSWORD_URL, { state: { from: FORGOT_PASSWORD_URL } });
      }
    })
    .catch(err => console.log('err - ' + err));
  };

  React.useEffect(() => {
    if (isLogin) {
      navigate(from, {replace:true});
    } else if (accessToken) {
      dispatch(getUserInformation());
    }
  }, [isLogin, accessToken, dispatch, from, navigate]);

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
        <div className={styles.label}>Вспомнили пароль? <Link to={LOGIN_URL} className={styles.link}>Войти</Link></div>
      </form>
    </div>
  );
};