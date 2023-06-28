//ws без авторизации
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  TWsActions
} from "../actions/ws-actions";
import { TMessage } from "../types/data";

export type TWsState = {
  wsConnected: boolean,
  data?: TMessage,
  get: boolean,
  error?: Event 
};

const initialState: TWsState = {
  wsConnected: false,
  data: undefined,
  get: false,
  error: undefined
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: 
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        data: undefined,
        get: false,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        get: true,
        error: undefined,
        data: action.payload,
      };

    default:
      return state;
  }
};