import styles from './ingredient-details.module.css';
import PropTypes from "prop-types";
import { ingredientPropTypes } from '../../utils/prop-types';

const IngredientDetails = ({ingredient}) => {
  const {name, image, proteins, carbohydrates, fat, calories} = ingredient;
  return (
    <div className={styles.content}>
      <img src={image} alt={name} className='mb-4'/>
      <h1 className='text text_type_main-medium mb-8'>{name}</h1>
      <div className={styles.nutrientals}>
        <span className='text text_type_main-default text_color_inactive'>Калории,ккал</span>        
        <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
        <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
        <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
        <span className='text text_type_digits-default text_color_inactive'>{calories}</span>
        <span className='text text_type_digits-default text_color_inactive'>{proteins}</span>
        <span className='text text_type_digits-default text_color_inactive'>{fat}</span>
        <span className='text text_type_digits-default text_color_inactive'>{carbohydrates}</span>
      </div>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropTypes.isRequired
}

export default IngredientDetails;