import { WS_CONNECTION_START } from "../actions/ws-actions";
import { WS_CONNECTION_START_AUTH } from "../actions/ws-actions-auth";
import { getCookie } from "../../utils/cookie";

export const socketMiddleware = (wsUrl, wsActions, isAuth= false) => {
  return store => {
    let socket = null;

    return (next) => (action) => {
      const accessToken = getCookie("accessToken");
      const { dispatch } = store;
      const { type } = action;

      if (isAuth) {
        if (type === WS_CONNECTION_START_AUTH && accessToken) {
          socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        } 
      } else {        
        if (type === WS_CONNECTION_START) {
          socket = new WebSocket(`${wsUrl}`);
        }
      }  
      if (socket) {
        socket.onopen = () => {
          dispatch(wsActions.wsConnectionSuccess());
        };

        socket.onerror = (error) => {
          dispatch(wsActions.wsConnectionError(error));
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const { success, ...payload } = data;

          dispatch(wsActions.wsGetMessage(payload));
        };

        socket.onclose = (event) => {
          dispatch(wsActions.wsConnectionClosed(event));
        };
      };    
      next(action);
    };
  };
};
