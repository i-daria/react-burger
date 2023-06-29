import { RootState } from "../services/reducers";

export const getIngredients = (store: RootState) => store.ingredients.ingredients;
export const getSelectedIngredients = (store: RootState) => store.ingredients.selectedIngredients;
export const getModalIsOpen = (store: RootState) => store.modal.isOpen;
export const getCurrentIngredient = (store: RootState) => store.ingredients.currentIngredient;
export const getOrder = (store: RootState) => store.order;
export const getWs = (store: RootState) => store.ws;
export const getWsAuth = (store: RootState) => store.wsAuth;
export const getIsLogin = (store: RootState) => store.profile.isLogin;
export const getUser = (store: RootState) => store.profile.user;
export const getIsOrderRequest = (store: RootState) => store.order.isOrderRequest;


export const BASE_URL = 'https://norma.nomoreparties.space/api/';

//  Константы роутов 
export const HOME_URL = '/';
export const REGISTER_URL = '/register';
export const LOGIN_URL = '/login';
export const PROFILE_URL = '/profile';
export const FORGOT_PASSWORD_URL = '/forgot-password';
export const RESET_PASSWORD_URL = '/reset-password';
export const FEED_URL = '/feed';
export const FEED_ID_URL = '/feed/:id';
export const ORDERS_URL = '/orders';
export const PROFILE_ORDERS_URL = '/profile/orders';
export const ORDERS_ID_URL = '/profile/orders/:id';
export const INGREDIENTS_URL = '/ingredients';
export const INGREDIENTS_ID_URL = '/ingredients/:id';
export const NOT_FOUND_URL = '*';