import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import { getAllIngredients } from '../../services/actions/ingredients.js';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIngredients } from '../../utils/constants';

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(getIngredients);   

  React.useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  return (
    ingredients &&
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>         
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>  
        <DndProvider backend={HTML5Backend}>
          <div className={styles.wrapper}>        
            <BurgerIngredients />
            <BurgerConstructor /> 
          </div>
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
