import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,

  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,

  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAIL,

  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAIL,

  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAIL,

  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  TProfileActions
} from '../actions/profile';
import { TUser } from '../types/data';

type TProfilelState = {
  isLoading: boolean,
  isError: boolean,
  isLogin: boolean,
  message: any,
  user: TUser,
};

const initialState: TProfilelState = {
  isLoading: false,
  isError: false,
  isLogin: false,
  message: '',
  user: {
    name: '',
    email: '',
    password: '',
  },
};

export const profileReducer = (state = initialState, action:TProfileActions): TProfilelState => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: ''
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        user: {
          name: action.name,
          email: action.email,
          password: action.password,
        },
        isLoading: false,
        isError: false,
        isLogin: true,
        message: ''
      }
    }
    case REGISTER_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message
      }
    }

    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        isLogin: false,
        message: ''
      }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name,
          email: action.email,
        },
        isLoading: false,
        isError: false,
        isLogin: true,
        message: ''
      }
    }
    case LOGIN_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isLogin: false,
        message: action.message
      }
    }

    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: ''
      }
    }
    case LOGOUT_USER_SUCCESS: {
      return initialState
    }
    case LOGOUT_USER_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,        
        message: action.message,
        isLogin: false
      }
    }

    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: ''
      }
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name,
          email: action.email,
        },
        isLoading: false,
        isError: false,
        isLogin: true,
        message: ''
      }
    }
    case GET_USER_INFO_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message
      }
    }
    case UPDATE_USER_INFO_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: ''
      }
    }
    case UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name,
          email: action.email,
        },
        isLoading: false,
        isError: false,
        message: ''
      }
    }
    case UPDATE_USER_INFO_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message
      }
    }     
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: ''
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: ''
      }
    }
    case REFRESH_TOKEN_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message
      }
    } 
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: ''
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          password: ''
        },
        isLoading: false,
        isError: false,
        message: ''
      }
    }
    case FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message
      }
    } 

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: ''
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          password: action.password
        },
        isLoading: false,
        isError: false,
        message: ''
      }
    }
    case RESET_PASSWORD_FAIL: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message
      }
    } 
    default: {
      return state
    }
  }
};