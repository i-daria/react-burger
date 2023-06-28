import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import styles from './home.module.css';

export const Home: React.FC = () => {
  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>  
      <DndProvider backend={HTML5Backend}>
        <div className={styles.wrapper}>        
          <BurgerIngredients />
          <BurgerConstructor /> 
        </div>
      </DndProvider>
    </>
  );
};