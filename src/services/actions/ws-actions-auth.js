// с авторизацией
export const WS_CONNECTION_START_AUTH = "WS_CONNECTION_START_AUTH";
export const WS_CONNECTION_SUCCESS_AUTH = "WS_CONNECTION_SUCCESS_AUTH";
export const WS_CONNECTION_ERROR_AUTH = "WS_CONNECTION_ERROR_AUTH";
export const WS_CONNECTION_CLOSED_AUTH = "WS_CONNECTION_CLOSED_AUTH";
export const WS_GET_MESSAGE_AUTH = "WS_GET_MESSAGE_AUTH";

export const wsConnectionStart = () => ({
  type: WS_CONNECTION_START_AUTH,
});

export const wsConnectionSuccess = () => ({
  type: WS_CONNECTION_SUCCESS_AUTH,
});

export const wsConnectionError = (error) => ({
  type: WS_CONNECTION_ERROR_AUTH,
  payload: error,
});

export const wsConnectionClosed = () => ({
  type: WS_CONNECTION_CLOSED_AUTH,
});

export const wsGetMessage = (message) => ({
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