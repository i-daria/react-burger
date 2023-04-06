import  React, {useContext} from 'react';
import styles from './ingredient-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import {cartContext} from '../../services/cartContext.js';  

const IngredientCategory = ({id, title, items, onItemClick}) => {
  const cart = useContext(cartContext);
  const selectedIngredients = [cart.bun, ...cart.ingredients];
  return (
    <>
      <h2 id={id} className='text text_type_main-medium mb-6'>{title}</h2>
      <ul className={`${styles.list}`}>
      {items.map((item) => {
        const el = selectedIngredients.find((el) => el._id ===item._id);
                
        return (
          <li key={item._id} className={styles.item} > 
            <BurgerIngredient data={item} count={el ? el.count : null} onClick={onItemClick}/>
          </li>
        );
      })}
      </ul>
  </>
  )
};

IngredientCategory.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  onItemClick: PropTypes.func,
};

export default React.memo(IngredientCategory);