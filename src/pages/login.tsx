import React from 'react';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser, getUserInformation } from '../services/actions/profile';
import { useDispatch, useSelector } from '../services/types/hooks';
import { getCookie } from '../utils/cookie';
import { FORGOT_PASSWORD_URL, getIsLogin, HOME_URL, REGISTER_URL } from '../utils/constants';

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const isLogin = useSelector(getIsLogin);
  const { state } = useLocation();
  const from = state?.from || HOME_URL;
  const accessToken = getCookie('accessToken');

  React.useEffect(() => {
    if (isLogin) {
      navigate(from, {replace:true});
    } else if (accessToken) {
      dispatch(getUserInformation());
    }
  }, [isLogin, accessToken, dispatch, from, navigate]);

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form onSubmit={onSubmitForm}>
        <div className={styles.input}>
          <EmailInput
            onChange={e => setEmail(e.target.value)}
            value={email}
            name={'email'}
            isIcon={false}
            required
          />
        </div>
        <div className={styles.input}>
          <PasswordInput
            onChange={e => setPassword(e.target.value)}
            value={password}
            name={'password'}
            extraClass="mb-2"
            required
          />
        </div>
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="medium">Войти</Button>
        </div>
      </form>
      <div className={styles.label}>Вы — новый пользователь? <Link to={REGISTER_URL} className={styles.link}>Зарегистрироваться</Link></div>
      <div className={styles.label}>Забыли пароль?  <Link to={FORGOT_PASSWORD_URL} className={styles.link}>Восстановить пароль</Link></div>
    </div>
  );
};
