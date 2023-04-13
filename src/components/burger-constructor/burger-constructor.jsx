import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import currency from '../../images/icon36.svg';
import { useDispatch, useSelector } from 'react-redux';
import { orderContext } from '../../services/orderContext';
import { postOrderToServer } from '../../utils/api';
import { useDrop} from 'react-dnd';
import { ADD_INGREDIENT, ADD_BUN} from '../../services/actions/actions';
import { v4 as uuid } from 'uuid';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item) => {  
      if (item.type === 'bun'){
        dispatch({
          type: ADD_BUN,
          data: item
        });
      } else {
        dispatch({
          type: ADD_INGREDIENT,
          data: {...item,
          id: uuid()}
        });
      }
    }
  });

  const selectedIngredients = useSelector(store => store.ingredients.selectedIngredients); 
  const [order, setOrder] = React.useState({'number': null, 'name': '', 'ingredients':[]});  
  const fillings = selectedIngredients.ingredients;
  const buns = selectedIngredients.bun;
  const total = buns.price * 2 + fillings.reduce((total, item) => total + item.price, 0);
  
  const [orderModal, setOrderModal] = React.useState(false); //показать попап оформления заказа
  const showOrderModal = ()  => {
    setOrderModal(true);
  };

  const onCloseModal = () => {
    setOrderModal(false);
  };

  const onPostOrder = () => { 
    postOrderToServer([buns, ...fillings])
    .then(res => res.success === true ? setOrder({'number': res.order.number, 'name': res.name, 'ingredients':[buns, ...fillings]}) : console.log(res))
    .catch(error => console.log(error));

    showOrderModal();
  };

  return (
    <>
      { buns &&
      <section className={styles.section}>
        <div className={styles.structure}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${buns.name} (верх)`}
            price={buns.price}
            thumbnail={buns.image}
          />
          <ul className={styles.list} ref={dropTarget}>
            {fillings.map((item, index) => {
              return (
                <BurgerConstructorIngredient  key={item.id} ingredient={item} index={index}/>
              )
            })}
          </ul>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${buns.name} (низ)`}
            price={buns.price}
            thumbnail={buns.image}
          />
        </div>
        <div className={styles.totalWrapper}>
          <p className={`${styles.total} text text_type_digits-medium`}>
           {total}        
            <img src={currency} alt='валюта'/>
          </p>
          <Button htmlType="button" type="primary" size="large" onClick={onPostOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
      }
      { orderModal &&
        <Modal onClose={onCloseModal}>
          <orderContext.Provider value={order}>
            <OrderDetails />
          </orderContext.Provider>
        </Modal>
      }
    </>
  );
}

export default BurgerConstructor;