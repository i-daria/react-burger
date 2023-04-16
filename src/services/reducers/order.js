import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR
} from '../actions/order';

const initialState = {
  isOrderRequest: false,
  isOrderError: false,
  order: {
    name: '',
    number: null
  }
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ORDER_REQUEST: {
      return {
        ...state,
        isOrderRequest: true,
        isOrderError: false
      }
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderRequest: false,
        isOrderError: false,
        order: {
          name: action.name,
          number: action.number
        }
      }
    }
    case POST_ORDER_ERROR: {
      return {
        ...initialState,        
        isOrderRequest: false,
        isOrderError: true,     
      }
    }
    default: {
      return state
    }
  }
};