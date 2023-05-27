import React from 'react';
import {  CurrencyIcon,  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { getOrderStatus, isDone } from "../utils/order";
import styles from './order.module.css';
import { WS_CONNECTION_START, WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSED } from '../services/actions/ws-action-types';
import { getCookie } from '../utils/cookie';

export const Order = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = getCookie('refreshToken');

  const { id } = useParams();
  const wsStore = useSelector(store => store.ws);
  const order = wsStore.get ? wsStore.data.orders.find(el => el._id === id) : null;  
  const allIngredients = useSelector(store => store.ingredients.ingredients) 
  const orderIngredients = order ? order.ingredients.map(ingredient => {
    const item = allIngredients.find(el => el._id === ingredient);
    return item;
  }) : null;  
  const total = orderIngredients ? orderIngredients.reduce((acc, item) => acc + item.price , 0) : 0;
  const filteredIngredients = orderIngredients ? Array.from(new Set(orderIngredients.map(obj => obj))) : null; //ОТФИЛЬТРОВАТЬ УНИКАЛЬНЫЕ

  console.log(filteredIngredients);

  React.useEffect (() => {
    if (location.pathname.includes('profile') && token) {      
      dispatch({type: WS_CONNECTION_START_AUTH});
    } else {
      dispatch({type: WS_CONNECTION_START});
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch, location.pathname, token]);

  return orderIngredients && (
    <div className={`${styles.content} ${location.state && location.state.background ? styles.content_in_modal : ''}`}>
      <p className={`text text_type_digits-default mb-10 ${styles.number}`}>{`#${order.number}`}</p>
      <h1 className={`text text_type_main-medium mb-3`}>{order.name}</h1>   
      <p className='text text_type_main-default mb-15' style={isDone(order.status)}>{getOrderStatus(order.status)}</p>
      <h2 className={`text text_type_main-medium mb-6`}>Состав:</h2>
      <ul className={styles.list}>
        {filteredIngredients.map((item, index) => {
          const count = orderIngredients.filter(el => el._id === item._id);

          return (
            <li key={index} className={styles.ingredient} >     
              <div className={styles.img_container}>
                <img className={styles.img} src={item.image} alt={item.name}  /> 
              </div>
                <p className="text text_type_main-default">{item.name}</p>
                <p className={`${styles.price} text text_type_digits-default`}>{count.length} x {item.price}</p>
                <div className={styles}>
                  <CurrencyIcon />
                </div>
            </li>
          );
        }
        )}
      </ul>
      <div className={styles.footer}>
        <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
        <div className={`${styles.total} ml-6`}>
            <p className='text text_type_digits-default mr-2'>{total}</p>
            <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}