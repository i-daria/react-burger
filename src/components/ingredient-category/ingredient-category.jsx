import  React from 'react';
import styles from './ingredient-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types'; 
import { useSelector } from 'react-redux';

const IngredientCategory = ({id, title, items}) => {  
  
  const selectedIngredients = useSelector(store => [store.ingredients.selectedIngredients.bun, ...store.ingredients.selectedIngredients.ingredients]); 
  
  return (
    <>
      <h2 id={id} className='text text_type_main-medium mb-6'>{title}</h2>
      <ul className={`${styles.list}`}>
      {items.map((item) => {        
        let count = null;     
        selectedIngredients.forEach(el => el._id === item._id ? count++ : null);
        if (item.type === 'bun' && count > 0) count = 2; //кол-во выбранных булок всегда 2
        return (
          <li key={item._id} className={styles.item} > 
            <BurgerIngredient data={item} count={count} />
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