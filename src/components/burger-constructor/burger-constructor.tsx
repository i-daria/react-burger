import React from 'react';
import styles from './burger-constructor.module.css';
import {ConstructorElement, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import currency from '../../images/icon36.svg';
import { useDispatch, useSelector } from '../../services/types/hooks';
import { postOrderToServer } from '../../utils/api';
import { useDrop} from 'react-dnd';
import { ADD_INGREDIENT, ADD_BUN, CLEAR_INGREDIENTS } from '../../services/actions/ingredients';
import {POST_ORDER_REQUEST, POST_ORDER_SUCCESS, POST_ORDER_ERROR} from '../../services/actions/order';
import { v4 as uuid } from 'uuid';
import { getIsLogin, getSelectedIngredients } from '../../utils/constants'; 
import { useNavigate } from 'react-router';
import { LOGIN_URL } from "../../utils/constants";
import { TIngredient } from '../../services/types/data';

const BurgerConstructor : React.FC = () => {
  const dispatch = useDispatch();
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item: TIngredient) => {  
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

  const selectedIngredients = useSelector(getSelectedIngredients);
  const fillings = selectedIngredients.ingredients;
  const buns = selectedIngredients.bun;
  const total = React.useMemo(() => buns ? buns.price * 2 + fillings.reduce((total, item) => total + item.price, 0) : 0, [buns, fillings]);  
  const isLogin = useSelector(getIsLogin);
  const navigate = useNavigate();
  
  const [orderModal, setOrderModal] = React.useState(false); //показать попап оформления заказа
  const showOrderModal = ()  => {
    setOrderModal(true);
  };

  const onCloseModal = () => {
    setOrderModal(false);
  };

  const onPostOrder = () => { 
    if (!isLogin) {
      navigate(LOGIN_URL);
    } else if (buns) {    
      dispatch({
        type: POST_ORDER_REQUEST, 
      });
      postOrderToServer([buns._id, ...fillings.map(el => el._id), buns._id])
      .then(res => {
        if (res.success) {
          dispatch({
            type: POST_ORDER_SUCCESS,
            name: res.name,
            number: res.order.number,
          });
          dispatch({
            type: CLEAR_INGREDIENTS,
          })
        } else {
          alert('Не получилось оформить заказ. Ошибка:' + res);
        }
      })
      .catch(error => dispatch({
        type: POST_ORDER_ERROR})
      );

      showOrderModal();
    }
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
            {fillings.map((item: TIngredient, index: number) => {
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
            <OrderDetails />
        </Modal>
      }
    </>
  );
}

export default React.memo(BurgerConstructor);