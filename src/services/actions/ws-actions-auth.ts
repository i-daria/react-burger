import { TMessage } from "../types/data";

// с авторизацией
export const WS_CONNECTION_START_AUTH: 'WS_CONNECTION_START_AUTH' = "WS_CONNECTION_START_AUTH";
export const WS_CONNECTION_SUCCESS_AUTH: 'WS_CONNECTION_SUCCESS_AUTH' = "WS_CONNECTION_SUCCESS_AUTH";
export const WS_CONNECTION_ERROR_AUTH: 'WS_CONNECTION_ERROR_AUTH' = "WS_CONNECTION_ERROR_AUTH";
export const WS_CONNECTION_CLOSED_AUTH: 'WS_CONNECTION_CLOSED_AUTH' = "WS_CONNECTION_CLOSED_AUTH";
export const WS_GET_MESSAGE_AUTH: 'WS_GET_MESSAGE_AUTH' = "WS_GET_MESSAGE_AUTH";

interface IWsConnectionStart {
  type: typeof WS_CONNECTION_START_AUTH;
}
interface IWsConnectionSuccess {
  type: typeof WS_CONNECTION_SUCCESS_AUTH;
}
interface IWsConnectionError {
  type: typeof WS_CONNECTION_ERROR_AUTH;
  payload: Event,
}
interface IWsConnectionClosed {
  type: typeof WS_CONNECTION_CLOSED_AUTH;
}
interface IWsGetMessage {
  type: typeof WS_GET_MESSAGE_AUTH;
  payload: TMessage,
}

export type TWsAuthActions =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetMessage;

export const wsConnectionStart = (): IWsConnectionStart => ({
  type: WS_CONNECTION_START_AUTH,
});

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS_AUTH,
});

export const wsConnectionError = (error: Event): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR_AUTH,
  payload: error,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED_AUTH,
});

export const wsGetMessage = (message: TMessage): IWsGetMessage => ({
  type: WS_GET_MESSAGE_AUTH,
  payload: message,
});

export const wsActionsAuth = {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
};