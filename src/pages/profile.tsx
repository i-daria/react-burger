import styles from './form.module.css';
import stylesProfile from './profile.module.css';
import {EmailInput, PasswordInput, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserInformation } from '../services/actions/profile';
import { useDispatch, useSelector } from '../services/types/hooks';
import React from 'react';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { getUser } from '../utils/constants';

export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser); 
  const [password, setPassword] = React.useState('');
  const [newName, setNewName] = React.useState(user.name || '');  
  const [newEmail, setNewEmail] = React.useState(user.email || '');
  const [isEdit, setIsEdit] = React.useState(false);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    const form = new FormData(e.currentTarget); 
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      < ProfileNav/>

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
            isIcon={true}
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