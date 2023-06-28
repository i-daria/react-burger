import React from 'react';
import stylesProfile from './profile.module.css';
import styles from './orders.module.css';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { FeedOrder } from '../components/feed-order/feed-order';
import { useDispatch, useSelector } from '../services/types/hooks';
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/ws-actions-auth';
import { getWsAuth } from '../utils/constants';

export const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const {data, get} = useSelector(getWsAuth);
  
  const orders = get ? data?.orders : undefined; 
    
  React.useEffect (() => {
    dispatch(wsConnectionStart());

    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [dispatch]);

  return (
    <div className={stylesProfile.container}>
      <ProfileNav />
      <ul className={styles.ordersContainer}>       
        {orders && orders.length > 0 && orders.map(order => {
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