import { useSelector } from 'react-redux';
import {getBurgerIngredients, postOrderToServer} from '../../utils/api';

//получить список всех ингредиентов с сервера
export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT = 'RESET_CURRENT_INGREDIENT';

//отправить заказ на сервер
export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_ERROR = 'POST_ORDER_ERROR';

//обновить количество или порядок товара в корзине
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

//открыть/закрыть модальное окно
export const SHOW_MODAL = 'SHOW_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

//async
export const getAllIngredients = () => {
  return (dispatch) => {
    dispatch ({
      type: GET_ALL_INGREDIENTS_REQUEST
    })
    getBurgerIngredients().then(res => {
      if (res && res.success)  {
        dispatch ({
          type: GET_ALL_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
        dispatch ({
          type: ADD_BUN,
          data: res.data.find(item => item.type === 'bun')
        });
      } else {
        dispatch ({
          type: GET_ALL_INGREDIENTS_ERROR
        });
      }
    })
    .catch(err => {
      dispatch ({
        type: GET_ALL_INGREDIENTS_ERROR
      });
    });  
  }
};

export const postOrder = () => {
  return (dispatch) => {
    const selectedIngredients = useSelector(store => store.selectedIngredients);
    dispatch ({
      type: POST_ORDER_REQUEST
    })
    postOrderToServer(selectedIngredients).then(res => {
      if (res && res.success)  {
        dispatch ({
          type: POST_ORDER_SUCCESS,
          order: res.data
        });
      } else {
        dispatch ({
          type: POST_ORDER_ERROR
        });
      }
    })
    .catch(err => {
      dispatch ({
        type: POST_ORDER_ERROR
      });
    });  
  }
};