import React from 'react';
import { useDispatch, useSelector } from '../services/types/hooks';
import { FeedOrder } from '../components/feed-order/feed-order';
import { wsConnectionStart, wsConnectionClosed } from '../services/actions/ws-actions';
import { getWs } from '../utils/constants';
import styles from './feed.module.css';

export const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const {data, get} = useSelector(getWs);
  
  const orders = React.useMemo(() => {
    return get && data !== undefined ? data.orders.slice(0, 40) : [];
  }, [data, get]);

  const total = React.useMemo(() => {
    return get && data !== undefined ? data.total : 0;
  }, [data, get]);

  const totalToday = React.useMemo(() => {
    return get && data !== undefined ? data.totalToday : 0;
  }, [data, get]);

  const readyOrders = React.useMemo(() => {
    return get
      ? orders.map((order) => (order.status === 'done' ? order.number : null))
      : [];
  }, [get, orders]);

  const inWorkOrders = React.useMemo(() => {
    return get
      ? orders.map((order) => (order.status === 'pending' ? order.number : null))
      : [];
  }, [get, orders]);
  
  React.useEffect (() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    }
  }, [dispatch]);

  return !get ? null : (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>  
        <div className={styles.wrapper}> 
          <ul className={styles.ordersContainer}>  
            {orders.length > 0 && orders.map(order => {
              return (
                <li key={order.number}>
                  <FeedOrder order={order}/> 
                </li>
              );
            })}
          </ul>
          <div className={styles.statusContainer}>
            <div className={styles.ordersStatus}>
              <div className={styles.ordersStatusList}>
                <p className='mb-6 text text_type_main-medium'>Готовы:</p>
                <ul className={styles.ready}>
                  {readyOrders.length > 0  && readyOrders.map ((order, index) => {
                    return( <li key={index}>{order}</li> );
                  }
                  )}
                </ul>
              </div>
              <div className={styles.ordersStatusList}>
                <p className='mb-6 text text_type_main-medium'>В работе:</p>
                <ul className={styles.inWork}>
                  {inWorkOrders.length > 0  && inWorkOrders.map ((order, index) => {
                    return( <li key={index}>{order}</li> );
                  }
                  )}
                </ul>
              </div>
            </div>
            <div>
              <p className='text text_type_main-medium'> Выполнено за всё время: </p>
              <p className='text text_type_digits-large'> {total} </p>
            </div>
            <div>
              <p className='text text_type_main-medium'> Выполнено за сегодня: </p>
              <p className='text text_type_digits-large'> {totalToday} </p>
            </div>
          </div>
        </div>
    </>
  );
};