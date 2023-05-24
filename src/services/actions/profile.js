import { register, login, logout, refreshToken, getUserInfo, updateUserInfo } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAIL = 'LOGOUT_USER_FAIL';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAIL = 'GET_USER_INFO_FAIL';

export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAIL = 'UPDATE_USER_INFO_FAIL';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAIL = 'REFRESH_TOKEN_FAIL';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL = 'RESET_PASSWORD_FAIL';


export const registerUser = (email, password, name) => {
  return (dispatch) => {
        dispatch ({
          type: REGISTER_USER_REQUEST
        });
        register(email, password, name).then(res => {
          if (res && res.success)  {
            const accessToken = res.accessToken.split('Bearer ')[1];
            const refreshToken = res.refreshToken;
            setCookie('accessToken', accessToken);
            setCookie('refreshToken', refreshToken);
            dispatch ({
              type: REGISTER_USER_SUCCESS,
              email: res.user.email,
              name: res.user.name,
            });
          } else {
            dispatch ({
              type: REGISTER_USER_FAIL,              
              message: res.message
            });
          }
        })
        .catch(err => {
          dispatch ({
            type: REGISTER_USER_FAIL,              
            message: err
          });
        });  
    }
};

export const loginUser = (email, password) => {  
  return (dispatch) => {
    dispatch ({
        type: LOGIN_USER_REQUEST
    });
    login(email, password).then(res => {
      if (res && res.success)  {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch ({
          type: LOGIN_USER_SUCCESS,
          email: res.user.email,
          name: res.user.name,
        });
      } else {
        alert(res.message);
        dispatch ({
          type: LOGIN_USER_FAIL,            
          message: res.message
        });
      }
    })
    .catch(err => {  
      if (err === 'Ошибка: 401') alert(err + ': Введен неправильный email или пароль');
      dispatch ({
        type: LOGIN_USER_FAIL,
        message: err
      });
    });
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch ({
      type: LOGOUT_USER_REQUEST
    });
    logout().then(res => {
      if (res && res.success)  {
        dispatch ({
          type: LOGOUT_USER_SUCCESS,
        });
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
      } else {
        dispatch ({
          type: LOGOUT_USER_FAIL,              
          message: res.message
        });
      }
    })
    .catch(err =>   
      dispatch ({
        type: LOGOUT_USER_FAIL,              
        message: err
      })
    );
  }
};

export const refreshUserToken = () => {
  return (dispatch) => {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });
    refreshToken().then(res => {
      if (res && res.success) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch ({
          type: REFRESH_TOKEN_SUCCESS,
        });
        dispatch(getUserInformation());
      } else {
        dispatch ({
          type: REFRESH_TOKEN_FAIL,              
          message: res.message
        })
      }
    }).catch(err =>   
      dispatch ({
        type: REFRESH_TOKEN_FAIL,              
        message: err
      })
    );
  }
};


export const getUserInformation = () => {  
  return (dispatch) => {
    dispatch ({
        type: GET_USER_INFO_REQUEST
    });
    getUserInfo().then(res => {
      if (res && res.success)  {
        dispatch ({
          type: GET_USER_INFO_SUCCESS,
          email: res.user.email,
          name: res.user.name
        });
      }else if (res && res.message === 'Ошибка: 403') {
        dispatch(refreshUserToken());
      } else {
        dispatch ({
          type: GET_USER_INFO_FAIL,            
          message: res.message
        });
      }
    })
    .catch(err => {        
      if (err && err === 'Ошибка: 403') {
        dispatch(refreshUserToken());
    } else {
        dispatch ({
          type: GET_USER_INFO_FAIL,
          message: err
        })
      };
    });
  }
};

export const updateUserInformation = (form) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_INFO_REQUEST
    });
    updateUserInfo(form).then(res => {
      if (res && res.success)  {
        dispatch ({
          type: UPDATE_USER_INFO_SUCCESS,
          email: res.user.email,
          name: res.user.name
        });
      } else if (res.message === 'Ошибка: 401'){
        dispatch(refreshUserToken());
      } else {
        dispatch ({
          type: UPDATE_USER_INFO_FAIL,              
          message: res.message
        })
      }
    }).catch(err => {
      dispatch ({
        type: UPDATE_USER_INFO_FAIL,              
        message: err
      })
    });
  }
};


