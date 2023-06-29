import { ReactNode } from "react";
import { wsActions } from "../actions/ws-actions";
import { wsActionsAuth } from "../actions/ws-actions-auth";
export type TResponse<T> = {
  success: boolean,
  data: T,
};

export type TDragItem = {
  ingredient: TIngredient,
  index: number
};

export type TIngredient = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly image: string;
  readonly __v: number;
  readonly id?: string;
};

export type TBurgerIngredient = {
  data: TIngredient,
  count: number,
};

export type TIngredients = {
    ingredients: TIngredient[];
};

export type TCategory = {
  id: string,
  title: string,
  items: TIngredient[],
};

export type TUser = {
  readonly email: string;
  readonly name: string;
  readonly password?: string;
};

export type TOrder = {
  readonly _id: string;
  readonly ingredients: string[];
  readonly status: string;
  readonly name: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly number: number;
};

export type TMessage = {
  success?: boolean;
  orders: TOrder[];
  total: number|null;
  totalToday: number|null;
};

export type TWsAllActions = typeof wsActions | typeof wsActionsAuth;