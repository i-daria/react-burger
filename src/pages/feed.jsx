import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeedOrder } from '../components/feed-order/feed-order';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/ws-action-types';
import styles from './feed.module.css';

export const Feed = () => {
  const dispatch = useDispatch();
  const {data, get} = useSelector(store => store.ws);
  
  const orders = get ? data.orders.slice(0, 40) : []; //???  фильтр на пустые значения?
  
  const total = get ? data.total : 0;
  const totalToday = get? data.totalToday : 0;
  const readyOrders = get ? orders.map(order => order.status === 'done' ? order.number : null) : [];
  const inWorkOrders = get ? orders.map(order => order.status === 'pending' ? order.number : null): [];
  
  React.useEffect (() => {
    dispatch({type: WS_CONNECTION_START});

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    }
  }, [dispatch]);

  return get && (
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