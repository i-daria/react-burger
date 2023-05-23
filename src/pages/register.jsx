import React from 'react';
import {EmailInput, PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './form.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/actions/profile';
import { useDispatch, useSelector } from 'react-redux';

export const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(store => store.profile.isLogin);

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name));
  };

  React.useEffect(() => {
    if (isLogin) navigate('/', { replace: true });
  }, [isLogin, navigate]);

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form onSubmit={onFormSubmit}>
        <div className={styles.input}>
        <Input 
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        </div>
        <div className={styles.input}>
          <EmailInput          
            name={'email'}
            onChange={e => setEmail(e.target.value)}
            value={email}
            isIcon={false}
          />
        </div>
        <div className={styles.input}>
          <PasswordInput
            name={'password'}                
            onChange={e => setPassword(e.target.value)}
            value={password} 
            extraClass="mb-2"
          />
        </div>
        <div className={styles.button}>
          <Button htmlType="submit" type="primary" size="medium">Зарегистрироваться</Button>
        </div>
      </form>
      <div className={styles.label}>Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link></div>
    </div>
  );
};