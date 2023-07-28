//скрипты запросов к серверу

//импортируем необходимые функции и переменные
import { renderLoading, updateUserData, updateUserAvatar } from "./utils.js";
import { addPictureToTop, addPictureToBottom, showLikes } from "./card.js";
import {
  usernameInput,
  userOccupationInput,
  userAvatarLinkInput,
  pictureTitle,
  pictureLink
} from "./index.js";

//сохраняем в константу адрес и заголовок запроса
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-27',
  headers: {
    authorization: 'ba4ab074-000e-4a51-b901-da38460be3f2',
    'Content-Type': 'application/json'
  }
}

//сохраняем в константу свой номер id для сверки авторства карточек
const myId = 'ebe4e15c5c59c55cbdd9d2ab';

//запрос к серверу на получение данных профиля и аватарки
export const getInitialUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    updateUserData(res.name, res.about);
    updateUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.log(err);
  });
};

//запрос к серверу на получение загруженных на сервер фотокарточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    res.forEach(element => {
      addPictureToBottom(element.name, element.link, element.owner._id, myId, element._id, element.likes);
    });
  })
  .catch((err) => {
    console.log(err);
  });
};

//запрос к серверу на обновление данных профиля
export const patchProfileData = () => {
  renderLoading(true);
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: usernameInput.value,
      about: userOccupationInput.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    updateUserData(res.name, res.about);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
  });
};

//запрос к серверу на обновление аватарки
export const patchAvatar = () => {
  renderLoading(true);
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: userAvatarLinkInput.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    updateUserAvatar(res.avatar);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
  });
};

//запрос к серверу на добавление карточки
export const postNewCard = () => {
  renderLoading(true);
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: pictureTitle.value,
      link: pictureLink.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    addPictureToTop(res.name, res.link, res.owner._id, myId, res._id, res.likes);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false);
  });
};

//запрос к серверу на удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
 .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .catch((err) => {
    console.log(err);
  });
};

//запрос на установку лайка карточки
export const addLike = (cardId, pictureElement) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    showLikes(res.likes, pictureElement);
  })
  .catch((err) => {
    console.log(err);
  })
};

//запрос на удаление лайка карточки
export const removeLike = (cardId, pictureElement) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    showLikes(res.likes, pictureElement);
  })
  .catch((err) => {
    console.log(err);
  })
};