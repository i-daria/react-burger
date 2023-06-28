import { getCookie } from "./cookie"; 
import { BASE_URL } from "./constants"
import { TUser } from "../services/types/data";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// универсальная фукнция запроса с проверкой ответа 
const request = (endpoint: string, options?: object) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
};

export const getBurgerIngredients = () => request("ingredients");

export const postOrderToServer = (ingredientsIds: string[]) => request("orders", {
  method: 'POST',
  body: JSON.stringify({ingredients: ingredientsIds}),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getCookie('accessToken')
  }
});

// profile: 
export const register = (email: string, password: string, name: string) => request(
  "auth/register", 
  {
    method: 'POST',
    body: JSON.stringify({email: email, password: password, name: name}),
    headers: {'Content-Type': 'application/json'}
  }
);

export const login = (email: string, password: string) => request(
  "auth/login", 
  {
    method: 'POST',
    body: JSON.stringify({email: email, password: password}),
    headers: {'Content-Type': 'application/json'}
  }
);

export const logout = () => request(
  "auth/logout", 
  {
    method: 'POST',
    body: JSON.stringify({'token': getCookie('refreshToken')}),
    headers: {'Content-Type': 'application/json'}
  }
);

export const refreshToken = () => request(
  "auth/token", 
  {
    method: 'POST',
    body: JSON.stringify({"token": getCookie('refreshToken')}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    }
  }
);

export const getUserInfo = () => request(
  "auth/user", 
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',      
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
  }
);

export const updateUserInfo = (form: TUser) => request(
  "auth/user", 
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',    
      'Authorization': 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(form)
  }
);

export const forgotPassword = (email: string) => request(
  "password-reset",
  {
    method: 'POST',
    body: JSON.stringify({"email": email}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export const resetPassword = (data: object) => request(
  "password-reset/reset",
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

