
import styles from './ingredient-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

const IngredientCategory = ({id, title, items, onItemClick}) => {
  return (
    <>
      <h2 id={id} className='text text_type_main-medium mb-6'>{title}</h2>
      <ul className={`${styles.list}`}>
      {items.map((item, index) => {
        return (
          <li key={index} className={styles.item} > 
            <BurgerIngredient data={item} count={1} onClick={onItemClick}/>
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

export default IngredientCategory;