import { register, login, logout, refreshToken, getUserInfo, updateUserInfo } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk } from '../types';
import { TUser } from '../types/data';

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL: 'REGISTER_USER_FAIL' = 'REGISTER_USER_FAIL';

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL: 'LOGIN_USER_FAIL' = 'LOGIN_USER_FAIL';

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS' = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAIL: 'LOGOUT_USER_FAIL' = 'LOGOUT_USER_FAIL';

export const GET_USER_INFO_REQUEST: 'GET_USER_INFO_REQUEST' = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS: 'GET_USER_INFO_SUCCESS' = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAIL: 'GET_USER_INFO_FAIL' = 'GET_USER_INFO_FAIL';

export const UPDATE_USER_INFO_REQUEST: 'UPDATE_USER_INFO_REQUEST' = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS: 'UPDATE_USER_INFO_SUCCESS' = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_FAIL: 'UPDATE_USER_INFO_FAIL' = 'UPDATE_USER_INFO_FAIL';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAIL: 'REFRESH_TOKEN_FAIL' = 'REFRESH_TOKEN_FAIL';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAIL: 'FORGOT_PASSWORD_FAIL' = 'FORGOT_PASSWORD_FAIL';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAIL: 'RESET_PASSWORD_FAIL' = 'RESET_PASSWORD_FAIL';

interface IRegisterUser {
  readonly type: typeof REGISTER_USER_REQUEST,
}
interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS,
  readonly name: string,
  readonly email: string,
  readonly password: string,
}
interface IRegisterUserFail {
  readonly type: typeof REGISTER_USER_FAIL,
  readonly message: string,
}
interface ILoginUser {
  readonly type: typeof LOGIN_USER_REQUEST,
}
interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS,
  readonly name: string,
  readonly email: string,
}
interface ILoginUserFail {
  readonly type: typeof LOGIN_USER_FAIL,
  readonly message: string,
}
interface ILogoutUser {
  readonly type: typeof LOGOUT_USER_REQUEST,
}
interface ILogoutUserSuccess {
  readonly type: typeof LOGOUT_USER_SUCCESS,
}
interface ILogoutUserFail {
  readonly type: typeof LOGOUT_USER_FAIL,
  readonly message: string,
}
interface IGetUserInfo {
  readonly type: typeof GET_USER_INFO_REQUEST,
}
interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS,
  readonly name: string,
  readonly email: string,
}
interface IGetUserInfoFail {
  readonly type: typeof GET_USER_INFO_FAIL,
  readonly message: unknown,
}
interface IUpdateUserInfo {
  readonly type: typeof UPDATE_USER_INFO_REQUEST,
}
interface IUpdateUserInfoSuccess {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS,
  readonly name: string,
  readonly email: string,
}
interface IUpdateUserInfoFail {
  readonly type: typeof UPDATE_USER_INFO_FAIL,
  readonly message: string,
}
interface IRefreshToken {
  readonly type: typeof REFRESH_TOKEN_REQUEST,
}
interface IRefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS,
}
interface IRefreshTokenFail {
  readonly type: typeof REFRESH_TOKEN_FAIL,
  readonly message: unknown,
}
interface IForgotPassword {
  readonly type: typeof FORGOT_PASSWORD_REQUEST,
}
interface IForgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS,
}
interface IForgotPasswordFail {
  readonly type: typeof FORGOT_PASSWORD_FAIL,
  readonly message: string,
}
interface IResetPassword {
  readonly type: typeof RESET_PASSWORD_REQUEST,
}
interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS,
  readonly password: string,
}
interface IResetPasswordFail {
  readonly type: typeof RESET_PASSWORD_FAIL,
  readonly message: string,
}      
   
export type TProfileActions = | IRegisterUser
  | IRegisterUserSuccess
  | IRegisterUserFail
  | ILoginUser
  | ILoginUserSuccess
  | ILoginUserFail
  | ILogoutUser
  | ILogoutUserSuccess
  | ILogoutUserFail
  | IGetUserInfo
  | IGetUserInfoSuccess
  | IGetUserInfoFail
  | IUpdateUserInfo
  | IUpdateUserInfoSuccess
  | IUpdateUserInfoFail
  | IRefreshToken
  | IRefreshTokenSuccess
  | IRefreshTokenFail
  | IForgotPassword
  | IForgotPasswordSuccess
  | IForgotPasswordFail
  | IResetPassword
  | IResetPasswordSuccess
  | IResetPasswordFail;

export const registerUser: AppThunk = (email: string, password: string, name: string) => {
  return (dispatch: AppDispatch) => {
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
              password: password,
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

export const loginUser: AppThunk = (email: string, password: string) => {  
  return (dispatch: AppDispatch) => {
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

export const logoutUser: AppThunk = () => {
  return (dispatch: AppDispatch) => {
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

export const refreshUserToken: AppThunk = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });
    try {
      const res = await refreshToken();
      if (res && res.success) {
        const accessToken = res.accessToken.split('Bearer ')[1];
        const refreshToken = res.refreshToken;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
        });
        dispatch(getUserInformation() as any);
      } else {
        dispatch({
          type: REFRESH_TOKEN_FAIL,
          message: res.message
        })
      }
    } catch (err) {
      dispatch({
        type: REFRESH_TOKEN_FAIL,
        message: err
      })
    }
  }
};

export const getUserInformation: AppThunk = () => {  
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: GET_USER_INFO_REQUEST
    });
    try {
      const res = await getUserInfo();
      if (res && res.success) {
        dispatch({
          type: GET_USER_INFO_SUCCESS,
          name: res.user.name,
          email: res.user.email
        });
      } else if (res && res.message === 'Ошибка: 403') {
        dispatch(refreshUserToken() as any);
      } else {
        dispatch({
          type: GET_USER_INFO_FAIL,
          message: res.message
        });
      }
    } catch (err) {
      if (err && err === 'Ошибка: 403') {
        dispatch(refreshUserToken() as any);
      } else {
        dispatch({
          type: GET_USER_INFO_FAIL,
          message: err
        });
      }
    }
  }
};

export const updateUserInformation:AppThunk = (form: TUser) => {
  return (dispatch: AppDispatch) => {
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
        dispatch(refreshUserToken() as any);
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


