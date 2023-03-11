const BaseUrl = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

export const getBurgerIngredients = () => {
  return fetch(`${BaseUrl}ingredients`)
    .then(checkResponse)
    .then(data => {
      if (data.success) return data.data;
      return Promise.reject(data)  
    });
};
