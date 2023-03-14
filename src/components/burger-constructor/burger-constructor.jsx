import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, CurrencyIcon, Button, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import PropTypes from "prop-types";
import { ingredientPropTypes } from '../../utils/prop-types';
import currency from '../../images/icon36.svg'

const BurgerConstructor = ({ingredients}) => {
  const defaultBuns = ingredients.find((item) => item.type === 'bun');
  const fillings = ingredients.filter((item) => item.type !== 'bun');
  const [orderModal, setOrderModal] = React.useState(false); //показать попап оформления заказа
  const showOrderModal = ()  => {
    setOrderModal(true);
  };

  const onCloseModal = () => {
    setOrderModal(false);
  };

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
            610        
            <img src={currency} alt='валюта'/>
          </p>
          <Button htmlType="button" type="primary" size="large" onClick={showOrderModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
      }
      { orderModal &&
        <Modal onClose={onCloseModal}>
          <OrderDetails />
        </Modal>
      }
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired
}

export default BurgerConstructor;