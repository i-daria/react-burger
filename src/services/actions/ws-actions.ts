import { TMessage } from "../types/data";

// без авторизации
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';

interface IWsConnectionStart {
  type: typeof WS_CONNECTION_START;
}
interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR;
  payload: Event;
}
interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED;  
}
interface IWsGetMessage {
  type: typeof WS_GET_MESSAGE;
  payload: TMessage;
}

export const wsConnectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (error: Event): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
  payload: error,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export const wsGetMessage = (message: TMessage): IWsGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: message,
});

export const wsActions = {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
};

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage;




