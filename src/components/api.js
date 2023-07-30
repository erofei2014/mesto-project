//скрипты запросов к серверу

//сохраняем в константу адрес и заголовок запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
  headers: {
    authorization: 'ba4ab074-000e-4a51-b901-da38460be3f2',
    'Content-Type': 'application/json'
  }
}

//сохраняем в функцию стандартное правило при получении ответа от сервера
function getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//запрос к серверу на получение данных профиля и аватарки
export const getInitialUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));
};

//запрос к серверу на получение загруженных на сервер фотокарточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => getResponseData(res));
};

//запрос к серверу на обновление данных профиля
export const patchProfileData = (usernameInput, userOccupationInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: usernameInput.value,
      about: userOccupationInput.value
    })
  })
  .then(res => getResponseData(res));
};

//запрос к серверу на обновление аватарки
export const patchAvatar = (userAvatarLinkInput) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatarLinkInput.value
    })
  })
  .then(res => getResponseData(res));
};

//запрос к серверу на добавление карточки
export const postNewCard = (pictureTitle, pictureLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: pictureTitle.value,
      link: pictureLink.value
    })
  })
  .then(res => getResponseData(res));
};

//запрос к серверу на удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res));
};

//запрос на установку лайка карточки
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => getResponseData(res));
};

//запрос на удаление лайка карточки
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => getResponseData(res));
};