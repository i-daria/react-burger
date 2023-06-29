import { combineReducers } from '@reduxjs/toolkit';
import {ingredientsReducer} from './ingredients';
import { orderReducer } from './order';
import { modalReducer } from './modal';
import { profileReducer } from './profile'
import { wsReducer } from './websoket';
import { wsReducerAuth } from './websoket-auth';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  modal: modalReducer,
  profile: profileReducer,
  ws: wsReducer,
  wsAuth: wsReducerAuth,
});

