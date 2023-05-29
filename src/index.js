import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socket-middleware';
import { wsActions } from './services/actions/ws-actions';
import { wsActionsAuth } from './services/actions/ws-actions-auth';


const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 
const enhancer = composeEnhancers(applyMiddleware(thunk,
  socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActions, false),
  socketMiddleware('wss://norma.nomoreparties.space/orders', wsActionsAuth, true)
));
const store = createStore(rootReducer, enhancer);


const root = ReactDOM.createRoot(
  document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>  
    </Provider>  
  </React.StrictMode>
);

