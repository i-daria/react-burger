// без авторизации
export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";

export const wsConnectionStart = () => ({
  type: WS_CONNECTION_START,
});

export const wsConnectionSuccess = () => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (error) => ({
  type: WS_CONNECTION_ERROR,
  payload: error,
});

export const wsConnectionClosed = (event) => ({
  type: WS_CONNECTION_CLOSED,
  payload: event,
});

export const wsGetMessage = (message) => ({
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





