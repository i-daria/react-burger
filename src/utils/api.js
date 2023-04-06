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
};

export const getBurgerIngredients = () => request("ingredients").then(checkSuccess);
export const postOrder = (ingredients) => request("orders", {
  method: 'POST',
  body: JSON.stringify({ingredients: ingredients.map(elem => elem._id)}),
  headers: {'Content-Type': 'application/json'}
});


