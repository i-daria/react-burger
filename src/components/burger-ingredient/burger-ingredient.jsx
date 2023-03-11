import styles from './burger-ingredient.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

const BurgerIngredient = ({data, count, onClick}) => {
  const {name, price, image} = data;
  const handleClick = () => {
    onClick(data); // в BurgerIngredients setModalData(data)
  }
  
  return (
    <div className={styles.ingredient} onClick={handleClick}>
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
  count: PropTypes.number, 
  onClick: PropTypes.func,
};

export default BurgerIngredient;