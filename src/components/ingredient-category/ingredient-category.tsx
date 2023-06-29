import  React from 'react';
import styles from './ingredient-category.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { useSelector } from '../../services/types/hooks';
import { TCategory } from '../../services/types/data';

const IngredientCategory: React.FC<TCategory> = ({id, title, items}) => {  
  
  const selectedIngredients = useSelector(store => [store.ingredients.selectedIngredients.bun, ...store.ingredients.selectedIngredients.ingredients]); //все выбранный ингредиенты в один массив
  
  return (
    <>
      <h2 id={id} className='category-title text text_type_main-medium mb-6'>{title}</h2>
      <ul className={`${styles.list}`}>
      {items.map((item) => {        
        let count: number = 0;   
          selectedIngredients.forEach(el => el?._id === item._id ? count++ : 0);
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

export default React.memo(IngredientCategory);