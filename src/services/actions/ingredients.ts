import {getBurgerIngredients } from '../../utils/api';
import { AppDispatch, AppThunk } from "../types"; 
import { TIngredient, TResponse } from '../types/data';


//получить список всех ингредиентов с сервера
export const GET_ALL_INGREDIENTS_REQUEST: 'GET_ALL_INGREDIENTS_REQUEST' = 'GET_ALL_INGREDIENTS_REQUEST';
export const GET_ALL_INGREDIENTS_SUCCESS: 'GET_ALL_INGREDIENTS_SUCCESS' = 'GET_ALL_INGREDIENTS_SUCCESS';
export const GET_ALL_INGREDIENTS_ERROR: 'GET_ALL_INGREDIENTS_ERROR' = 'GET_ALL_INGREDIENTS_ERROR';
export const CLEAR_INGREDIENTS: 'CLEAR_INGREDIENTS' = 'CLEAR_INGREDIENTS';

export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';
export const RESET_CURRENT_INGREDIENT: 'RESET_CURRENT_INGREDIENT' = 'RESET_CURRENT_INGREDIENT';

//обновить количество или порядок товара в корзине
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';

interface IGetIngredients {
  readonly type: typeof GET_ALL_INGREDIENTS_REQUEST,
}
interface IGetIngredientsSuccess {
  readonly type: typeof GET_ALL_INGREDIENTS_SUCCESS,
  readonly ingredients: TIngredient[],
}
interface IGetIngredientsError {
  readonly type: typeof GET_ALL_INGREDIENTS_ERROR,
}
interface IClearIngredients {
  readonly type: typeof CLEAR_INGREDIENTS,
}
interface ISetCurrentIngredient {
  readonly type: typeof SET_CURRENT_INGREDIENT,
  readonly data: TIngredient | undefined,
}
interface IResetCurrentIngredient {
  readonly type: typeof RESET_CURRENT_INGREDIENT,
}
interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT,
  readonly to: number,
  readonly from: number,
}
interface IAddBun {
  readonly type: typeof ADD_BUN,
  readonly data: TIngredient,
}
interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT,
  readonly data: TIngredient,
}
interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT,
  readonly id: string,
}

export type TIngredientsActions = | IGetIngredients
  | IGetIngredientsSuccess
  | IGetIngredientsError
  | IClearIngredients
  | ISetCurrentIngredient
  | IResetCurrentIngredient
  | IMoveIngredient
  | IAddBun
  | IAddIngredient
  | IRemoveIngredient;

//async
export const getAllIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ALL_INGREDIENTS_REQUEST,
    });
    getBurgerIngredients()
      .then((res: TResponse<TIngredient[]>) => {
        if (res && res.success) {
          dispatch({
            type: GET_ALL_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
          dispatch({
            type: ADD_BUN,
            data: res.data.find((item) => item.type === 'bun') as TIngredient,
          });
        } else {
          dispatch({
            type: GET_ALL_INGREDIENTS_ERROR,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ALL_INGREDIENTS_ERROR,
        });
      });
  };
};
export const setCurrentIngredient = (ingredients: TIngredient | undefined): ISetCurrentIngredient   => ({
  type: SET_CURRENT_INGREDIENT,
  data: ingredients
})

export const resetCurrentIngredient = (): IResetCurrentIngredient  => ({
  type: RESET_CURRENT_INGREDIENT
})