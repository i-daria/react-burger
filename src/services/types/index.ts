import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';

import { TAppActions } from '../actions'; // собрать все экшены в кучу

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
type TApplicationActions = TAppActions;

// Типизация thunk в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>; 






// //  Типизирую state и dispatch как в тренажере  //
// //  export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ActionCreator<
//   ThunkAction<ReturnType, Action, RootState, TAppActions>
// >;


// //  Типизирую action для WS до и после логина  //
// export type TWSAction = typeof wsActions | typeof wsActionsAuth;
