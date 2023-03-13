import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
// import data from '../../utils/data.js';
import {getBurgerIngredients} from '../../utils/api.js';

function App() {
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    getBurgerIngredients()
    .then(data => setIngredients(data))
    .catch(error => console.log(error) )
  }, []);

  return (
    ingredients &&
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>         
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>  
        <div className={styles.wrapper}>      
          <BurgerIngredients ingredients={ingredients} />
          <BurgerConstructor ingredients={ingredients}/>
        </div>
      </main>
    </div>
  );
}

export default App;
