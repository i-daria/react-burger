import React from 'react';
import {  CurrencyIcon,  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../services/types/hooks';
import { useLocation, useParams } from 'react-router';
import { getOrderStatus, isDone } from "../utils/order";
import styles from './order.module.css';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED} from '../services/actions/ws-actions';
import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSED_AUTH} from '../services/actions/ws-actions-auth';
import { getCookie } from '../utils/cookie';
import { getIngredients, getWs, getWsAuth } from '../utils/constants';
import { TWsAuthState } from '../services/reducers/websoket-auth';
import { TWsState } from '../services/reducers/websoket';
import { TIngredient, TOrder } from '../services/types/data';

export const Order: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = getCookie('refreshToken');

  const isAuth = (location.pathname.includes('profile') && token);

  const { id} = useParams<{id: string}>();
  const wsStore = useSelector(getWs);
  const wsStoreAuth = useSelector(getWsAuth);

  const order = (isAuth ? getOrder(wsStoreAuth) : getOrder(wsStore)) as TOrder; 
  const allIngredients = useSelector(getIngredients) 
  const orderIngredients = order ? order.ingredients.map(ingredient => {
    const item = allIngredients.find(el => el._id === ingredient) as TIngredient;
    return item;
  }) : undefined;  
  const total = orderIngredients ? orderIngredients.reduce((acc, item) => acc + item.price , 0) : 0;
  const filteredIngredients = orderIngredients ? Array.from(new Set(orderIngredients.map(obj => obj))) : null; //ОТФИЛЬТРОВАТЬ УНИКАЛЬНЫЕ

  function getOrder(store: TWsAuthState| TWsState): TOrder | undefined {
    if (store.get && store.data !== undefined) {
      return store.data?.orders.find(el => el._id === id); 
    };
    return undefined;
  }; 

  React.useEffect (() => {
    if (isAuth) {      
      dispatch({type: WS_CONNECTION_START_AUTH});
    } else {
      dispatch({type: WS_CONNECTION_START});
    }

    return () => {
      if (isAuth) {           
        dispatch({ type: WS_CONNECTION_CLOSED_AUTH });
      } else {
        dispatch({ type: WS_CONNECTION_CLOSED });
      }      
    }
  }, [dispatch, isAuth]);

  return !orderIngredients ? null : (
    <div className={`${styles.content} ${location.state && location.state.background ? styles.content_in_modal : ''}`}>
      <p className={`text text_type_digits-default mb-10 ${styles.number}`}>{`#${order.number}`}</p>
      <h1 className={`text text_type_main-medium mb-3`}>{order.name}</h1>   
      <p className='text text_type_main-default mb-15' style={isDone(order.status)}>{getOrderStatus(order.status)}</p>
      <h2 className={`text text_type_main-medium mb-6`}>Состав:</h2>
      <ul className={styles.list}>
        { (filteredIngredients !== null) && filteredIngredients.map((item, index) => {
          const count = orderIngredients.filter(el => el._id === item._id);

          return (
            <li key={index} className={styles.ingredient} >     
              <div className={styles.img_container}>
                <img className={styles.img} src={item.image} alt={item.name}  /> 
              </div>
                <p className="text text_type_main-default">{item.name}</p>
                <p className={`${styles.price} text text_type_digits-default`}>{count.length} x {item.price}</p>
                <div>
                  <CurrencyIcon type='primary' />
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