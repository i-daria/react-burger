import React, { useContext } from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import currency from '../../images/icon36.svg';
import { cartContext } from '../../services/cartContext.js';
import { orderContext } from '../../services/orderContext';
import { postOrder } from '../../utils/api';

const BurgerConstructor = () => {
  const cart = useContext(cartContext);  
  const [order, setOrder] = React.useState({'number': null, 'name': '', 'ingredients':[]});  
  const fillings = cart.ingredients;
  const defaultBuns = cart.bun;
  const total = cart.total;
  
  const [orderModal, setOrderModal] = React.useState(false); //показать попап оформления заказа
  const showOrderModal = ()  => {
    setOrderModal(true);
  };

  const onCloseModal = () => {
    setOrderModal(false);
  };

  const onPostOrder = () => { 
    postOrder([defaultBuns, ...fillings])
    .then(res => res.success === true ? setOrder({'number': res.order.number, 'name': res.name, 'ingredients':[defaultBuns, ...fillings]}) : console.log(res))
    .catch(error => console.log(error));

    showOrderModal();
  }

  return (
    <>
      { defaultBuns &&
      <section className={styles.section}>
        <div className={styles.structure}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${defaultBuns.name} (верх)`}
            price={defaultBuns.price}
            thumbnail={defaultBuns.image}
          />
          <ul className={styles.list}>
            {fillings.map((item) => {
              return (
                <li key={item._id} className={styles.item}>
                  <DragIcon/>        
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              )
            })}
          </ul>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${defaultBuns.name} (низ)`}
            price={defaultBuns.price}
            thumbnail={defaultBuns.image}
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