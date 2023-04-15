import {getBurgerIngredients } from '../../utils/api';

//получить список всех ингредиентов с сервера
export const GET_ALL_INGREDIENTS_REQUEST = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_ERROR = 'GET_ALL_INGREDIENTS_ERROR';
export const CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT = 'RESET_CURRENT_INGREDIENT';

//обновить количество или порядок товара в корзине
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

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
