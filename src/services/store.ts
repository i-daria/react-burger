import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import { wsActions } from './actions/ws-actions';
import { wsActionsAuth } from './actions/ws-actions-auth';
import { rootReducer } from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk,
  socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActions, false),
  socketMiddleware('wss://norma.nomoreparties.space/orders', wsActionsAuth, true)
));
export const store = createStore(rootReducer, enhancer);