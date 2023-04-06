import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import {getBurgerIngredients} from '../../utils/api.js';
import {cartContext} from '../../services/cartContext.js';
import { allIngredientsContext } from '../../services/allIngredientsContext';

function App() {
  const [ingredients, setIngredients] = React.useState([]);  

  const [cart, setCart] = React.useState({ //тестовые данные
    bun: {
      "_id":"60d3b41abdacab0026a733c6",
      "name":"Краторная булка N-200i",
      "type":"bun",
      "proteins":80,
      "fat":24,
      "carbohydrates":53,
      "calories":420,
      "price":1255,
      "image":"https://code.s3.yandex.net/react/code/bun-02.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
      "__v":0,
      'count': 2 
     },
    ingredients: [
       {
        "_id":"60d3b41abdacab0026a733ca",
        "name":"Говяжий метеорит (отбивная)",
        "type":"main",
        "proteins":800,
        "fat":800,
        "carbohydrates":300,
        "calories":2674,
        "price":3000,
        "image":"https://code.s3.yandex.net/react/code/meat-04.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
        "__v":0,
        'count': 1 
       },
       {
        "_id":"60d3b41abdacab0026a733cd",
        "name":"Соус фирменный Space Sauce",
        "type":"sauce",
        "proteins":50,
        "fat":22,
        "carbohydrates":11,
        "calories":14,
        "price":80,
        "image":"https://code.s3.yandex.net/react/code/sauce-04.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/sauce-04-large.png",
        "__v":0,        
        'count': 1 
       },
       {
        "_id":"60d3b41abdacab0026a733d0",
        "name":"Хрустящие минеральные кольца",
        "type":"main",
        "proteins":808,
        "fat":689,
        "carbohydrates":609,
        "calories":986,
        "price":300,
        "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
        "__v":0,
        'count': 1 
       }
    ],
    total: 5890
  });
  

  React.useEffect(() => {
    getBurgerIngredients()
    .then(data => {
      setIngredients(data);
    })
    .catch(error => console.log(error) )
  }, []);

  // React.useEffect((item) => { //при перетаскивании, изменении корзины, обновляем стейт cart, кол-во товаров в ingredients и total
  //   setCart(
  //       {...cart,  
  //       ingredients: [...cart.ingredients], // добавить или удалить товар item
  //       total: (cart.ingredients.reduce((acc, item) => acc + item.price, 0) + cart.bun.price * 2)
  //     });

    
  // }, [cart]);
    

  return (
    ingredients &&
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>         
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>  
        <div className={styles.wrapper}>            
          <cartContext.Provider value={cart}>
            <allIngredientsContext.Provider value={ingredients}>
              <BurgerIngredients />
            </allIngredientsContext.Provider>
            <BurgerConstructor /> 
          </cartContext.Provider>  
        </div>
      </main>
    </div>
  );
}

export default App;
