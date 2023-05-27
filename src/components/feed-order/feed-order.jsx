import React from 'react';
import {  CurrencyIcon,  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { getOrderStatus, isDone } from '../../utils/order';
import styles from './feed-order.module.css';
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

  export const FeedOrder = React.memo(({order}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const ingredientsData = useSelector(store => store.ingredients.ingredients) 
  const ingredients = order.ingredients.map(ingredient => {
    const item = ingredientsData.find(el => el._id === ingredient);
    return item;
  });

  let ingredientsCount = 6;
  let moreCount = null;
  let moreCountList = [];
  const [showMore, setShowMore] = React.useState(false);
  if (ingredients.length <= 6 ) {
    ingredientsCount = ingredients.length;
  } else {
    moreCount = ingredients.length - 6; 
    moreCountList = ingredients.slice(6);
  };

  const total = ingredients.reduce((acc, item) => acc + item.price , 0);

  const isVisible = location.pathname === '/profile/orders';
    
  const onClick = (e) => {
    if (!e.target.classList.contains(styles.show_more_text)) {
      if (location.pathname === '/feed') {
        navigate(`/feed/${order._id}`, {state: { background: location}});
      };
      if (location.pathname === '/profile/orders') { 
        navigate(`/profile/orders/${order._id}`, {state: { background: location}});
      }
    } 
  };

  const showMoreIngredients = (e) => {
    e.target.style.display = 'none';
    e.target.closest(`.${styles.ingredient_last_background}`).classList.remove(styles.ingredient_last_background);
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
          {ingredients.slice(0, ingredientsCount).map((ingredient, index) => {
            return (
              <li className={`${styles.ingredient} ${moreCount && index === 0 ? styles.ingredient_last_background : ''}`} key={index}>
                <img className={styles.img} src={ingredient.image} alt={ingredient.name}  />
                { (moreCount && index === 0) && (<span className={styles.show_more_text} onClick={showMoreIngredients} > +{moreCount} </span>)}   
              </li>
            ); 
            })
          }  
          {showMore &&  moreCountList.map((ingredient, index) => {
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


FeedOrder.propTypes = {
  order: PropTypes.object.isRequired,
};