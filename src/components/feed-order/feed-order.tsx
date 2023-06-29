import React from 'react';
import {  CurrencyIcon,  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { getOrderStatus, isDone } from '../../utils/order';
import styles from './feed-order.module.css';
import { useSelector } from '../../services/types/hooks';
import { FEED_URL, getIngredients, PROFILE_ORDERS_URL } from '../../utils/constants';
import { TIngredient, TOrder } from '../../services/types/data';

type TFeedOrder = {
  order: TOrder,
};

export const FeedOrder: React.FC<TFeedOrder> = React.memo(({order}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const allIngredients = useSelector(getIngredients); 
  const orderIngredients  = order.ingredients.map(ingredient => {
    const item = allIngredients.find(el => el._id === ingredient);
    return item;
  }) as TIngredient[];


  let ingredientsCount = 6;
  let moreCount: number | null = null;
  let moreCountList: TIngredient[] = [];
  const [showMore, setShowMore] = React.useState(false);
  if (orderIngredients.length <= 6 ) {
    ingredientsCount = orderIngredients.length;
  } else {
    moreCount = orderIngredients.length - 6; 
    moreCountList = orderIngredients.slice(6);
  };

  const total = React.useMemo(() => {
    return orderIngredients.reduce((acc, item) => {
       return item ? acc + item.price : acc + 0; 
      }, 0);
  }, [orderIngredients]);

  const isVisible = location.pathname === PROFILE_ORDERS_URL;
    
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
  
    if (!target.classList.contains(styles.show_more_text)) {
      if (location.pathname === FEED_URL) {
        navigate(`${FEED_URL}/${order._id}`, { state: { background: location } });
      }
      if (location.pathname === '/profile/orders') {
        navigate(`${PROFILE_ORDERS_URL}/${order._id}`, { state: { background: location } });
      }
    }
  };

  const showMoreIngredients = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    target.style.display = 'none';
    const closestElement = target.closest(`.${styles.ingredient_last_background}`);
    if (closestElement) {
      closestElement.classList.remove(styles.ingredient_last_background);
    }
    setShowMore(true);
  };

  return order && (
    <div className={`mr-2 ${styles.container}`} onClick={onClick} >
      <div className={styles.header}>
        <p className='text text_type_digits-default'>{`#${order.number}`}</p>
        <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
      </div>
      <div className="statusWrapper">
        <p className={`text text_type_main-medium`}>
          {order.name}
        </p>
        {isVisible && (
          <p className='text text_type_main-default mt-2' style={isDone(order.status)}>
            {getOrderStatus(order.status)}
          </p>
        )}
      </div>
      <div className={`${styles.content}`}>
        <ul className={styles.list}>
          {orderIngredients.slice(0, ingredientsCount).map((ingredient, index: number) => {
            return (
              <li className={`${styles.ingredient} ${moreCount && index === 0 ? styles.ingredient_last_background : ''}`} key={index}>
                <img className={styles.img} src={ingredient?.image} alt={ingredient?.name}  />
                { (moreCount && index === 0) && (<span className={styles.show_more_text} onClick={showMoreIngredients} > +{moreCount} </span>)}   
              </li>
            ); 
            })
          }  
          {showMore &&  moreCountList.map((ingredient, index: number) => {
            return (
              <li className={styles.ingredient} key={index + 6} >
                <img className={styles.img} src={ingredient.image} alt={ingredient.name}  /> 
              </li>
            ); 
            })
          }  
        </ul>
        <div className={`${styles.total} ml-6`}>
          <p className='text text_type_digits-default mr-2'>{total}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
});

