import React from 'react';
import stylesProfile from './profile.module.css';
import styles from './orders.module.css';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { FeedOrder } from '../components/feed-order/feed-order';
import { useDispatch, useSelector } from 'react-redux';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START_AUTH } from '../services/actions/ws-action-types';

export const Orders = () => {
  const dispatch = useDispatch();
  const {data, get} = useSelector(store => store.ws);
  
  const orders = get ? data.orders : []; 
    
  React.useEffect (() => {
    dispatch({type: WS_CONNECTION_START_AUTH});

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch]);

  return (
    <div className={stylesProfile.container}>
      <ProfileNav />
      <ul className={styles.ordersContainer}>       
        {orders.length > 0 && orders.map(order => {
          return (
            <li key={order.number}>
              <FeedOrder order={order}/> 
            </li>
          );
        })}
      </ul>
    </div>
  );
}