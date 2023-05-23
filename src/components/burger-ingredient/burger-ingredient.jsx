import React from 'react';
import styles from './burger-ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import { useDispatch } from 'react-redux';
import {SET_CURRENT_INGREDIENT } from '../../services/actions/ingredients';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';

const BurgerIngredient = ({data, count}) => {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: data
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {_id, name, price, image} = data;
  const onClick = () => {
    dispatch({
      type: SET_CURRENT_INGREDIENT,
      data: data
    });
    navigate( `/ingredients/${_id}`, {state: {background: location}});
  }
    
  return (
    <div onClick={onClick}  className={styles.ingredient} ref={dragRef}>
      <img src={image} alt={name} className={styles.img} />
      <p className={`${styles.price} text text_type_digits-default price`}>
        {price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={` ${styles.name} text text_type_main-default`}>
        {name}
      </p>
      {
        count && 
        <Counter count={count} size="default" />
      }
    </div>
  );
};

BurgerIngredient.propTypes = {
  data: ingredientPropTypes.isRequired,
  count: PropTypes.number
};

export default React.memo(BurgerIngredient);