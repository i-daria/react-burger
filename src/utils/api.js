const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const checkSuccess = (res) => {
  return (res && res.success) ? res.data : Promise.reject(`Ответ не success: ${res}`);
};

// универсальная фукнция запроса с проверкой ответа и `success`
const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getBurgerIngredients = () => request("ingredients");


