import {
  WS_CONNECTION_START,
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from "../actions/ws-action-types";
import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl) => {
  return store => {
    let socket = null;

    return (next) => (action) => {
      const accessToken = getCookie("accessToken");
      const { dispatch } = store;
      const { type } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (type === WS_CONNECTION_START_AUTH && accessToken) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const { success, ...payload } = data;

          dispatch({ type: WS_GET_MESSAGE, payload: payload });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };
      }

      next(action);
    };
  };
};
