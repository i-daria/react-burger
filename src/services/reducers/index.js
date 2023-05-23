import { combineReducers } from '@reduxjs/toolkit';
import {ingredientsReducer} from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { profileReducer } from './profile'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  modal: modalReducer,
  profile: profileReducer
});

