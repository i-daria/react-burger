import {  ConstructorElement, CurrencyIcon,  FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderStatus, isDone } from "../utils/order";
import styles from './order.module.css';

export const Order = () => {

  //НАПИСАТЬ ФУНКЦИЮ ПОЛУЧЕНИЯ ДАННЫХ ЗАКАЗА ЛИБО ДОБАВИТЬ ИНФУ ТЕКУЩИЙ ЗАКАЗ В ПОПАП GetCurrentOrderInfo(id)????;
  //Заменить на реальные
  const order = {
    ingredients : [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45e9",
      "60d3463f7034a000269f45e8",
      "60d3463f7034a000269f45ea"
    ],
    _id : "304535",
    name: "Черный метеорит",
    status : "done",
    number: 304535,
    createdAt: "2021-06-23T14:43:22.587Z",
    updatedAt: "2021-06-23T14:43:22.603Z"
  };

  // ЗАМЕНИНИТЬ НА РЕАЛ ДАННЫЕ
  const item = {
    calories: 14,
    carbohydrates: 11,
    fat: 22,
    id: "c34ed7f0-89f7-4cbf-b7c9-85481ec91309",
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    name: "Соус фирменный Space Sauce",
    price: 80,
    proteins: 50,
    type: "sauce",
    _id: "643d69a5c3f7b9001cfa0943"    
  };

  
  const total = 111; //посчитать сумму $ по товарам

  return (
    <div className={styles.content}>
      <p className={`text text_type_digits-default mb-10 ${styles.number}`}>{`#${order.number}`}</p>
      <h1 className={`text text_type_main-medium mb-3`}>{order.name}</h1>   
      <p className='text text_type_main-default mb-15' style={isDone(order.status)}>{getOrderStatus(order.status)}</p>
      <h2 className={`text text_type_main-medium mb-6`}>Состав:</h2>
      <ul className={styles.list}>
        <li>          
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image} 
          />
        </li>
        <li>          
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image} 
          />
        </li>
        <li>          
          <ConstructorElement
            text={item.name}
            price={item.price}
            thumbnail={item.image} 
          />
        </li>
      </ul>
      <div className={styles.footer}>
        <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
        <div className={`${styles.total} ml-6`}>
            <p className='text text_type_digits-default mr-2'>{total}</p>
            <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
}