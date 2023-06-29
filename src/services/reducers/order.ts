import {
  POST_ORDER_REQUEST,
  POST_ORDER_SUCCESS,
  POST_ORDER_ERROR,
  TOrderActions
} from '../actions/order';

type TOrderState = {
  isOrderRequest: boolean,
  isOrderError: boolean,
  name: string,
  number: number | null,
};

const initialState: TOrderState = {
  isOrderRequest: false,
  isOrderError: false,
  name: '',
  number: null
};

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
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
        name: action.name,
        number: action.number,    
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