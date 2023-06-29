//ws c авторизацией
import {
  WS_CONNECTION_SUCCESS_AUTH,
  WS_CONNECTION_ERROR_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
  WS_GET_MESSAGE_AUTH,
  TWsAuthActions
} from "../actions/ws-actions-auth";
import { TMessage } from "../types/data";

export type TWsAuthState = {
  wsConnected: boolean,
  data?: TMessage,
  get: boolean,
  error?: Event,
};

const initialState: TWsAuthState = {
  wsConnected: false,
  data: undefined,
  get: false,
  error: undefined
};

export const wsReducerAuth = (state = initialState, action: TWsAuthActions): TWsAuthState  => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_AUTH: 
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR_AUTH:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED_AUTH:
      return {
        ...state,
        data: undefined,
        get: false,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE_AUTH:
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