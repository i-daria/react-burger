import { getCookie } from "./cookie"; 
const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

// универсальная фукнция запроса с проверкой ответа 
const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
};

export const getBurgerIngredients = () => request("ingredients");

export const postOrderToServer = (ingredients) => request("orders", {
  method: 'POST',
  body: JSON.stringify({ingredients: ingredients.map(elem => elem._id)}),
  headers: {'Content-Type': 'application/json'}
});

// profile: 
export const register = (email, password, name) => request(
  "auth/register", 
  {
    method: 'POST',
    body: JSON.stringify({email: email, password: password, name: name}),
    headers: {'Content-Type': 'application/json'}
  }
);

export const login = (email, password) => request(
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

export const updateUserInfo = (form) => request(
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

export const forgotPassword = (email) => request(
  "password-reset",
  {
    method: 'POST',
    body: JSON.stringify({"email": email}),
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

export const resetPassword = (data) => request(
  "password-reset/reset",
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }
);

