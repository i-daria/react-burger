export const getIngredients = (store) => store.ingredients.ingredients;
export const getSelectedIngredients = (store) => store.ingredients.selectedIngredients;
export const getModalIsOpen = (store) => store.modal.isOpen;
export const getCurrentIngredient = (store) => store.ingredients.currentIngredient;
export const getOrder = (store) => store.order.order;
export const getWs = (store) => store.ws;
export const getWsAuth = (store) => store.wsAuth;
export const getIsLogin = (store) => store.profile.isLogin;
export const getUser = (store) => store.profile.user;
export const getIsOrderRequest = (store) => store.order.isOrderRequest;


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