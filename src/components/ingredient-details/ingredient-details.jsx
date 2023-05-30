import styles from './ingredient-details.module.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { setCurrentIngredient } from '../../services/actions/ingredients';

const IngredientDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const ingredients = useSelector(store => store.ingredients.ingredients);

  React.useEffect(
    () => {
      if (ingredients.length) {
        dispatch(setCurrentIngredient(ingredients.find(item => item._id === id)));
      }

    }, [dispatch, ingredients, id]
  );
  const currentIngredient = useSelector(store => store.ingredients.currentIngredient);

  return  (!currentIngredient ) ? null : (
    <div className={styles.content}>
      <img src={currentIngredient.image} alt={currentIngredient.name} className='mb-4'/>
      <h1 className='text text_type_main-medium mb-8'>{currentIngredient.name}</h1>
      <div className={styles.nutrientals}>
        <span className='text text_type_main-default text_color_inactive'>Калории,ккал</span>        
        <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
        <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
        <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
        <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.calories}</span>
        <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.proteins}</span>
        <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.fat}</span>
        <span className='text text_type_digits-default text_color_inactive'>{currentIngredient.carbohydrates}</span>
      </div>
    </div>
  );
}

export default IngredientDetails;