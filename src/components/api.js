//класс Api для взаимодействия с сервером
export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //сохраняем в функцию стандартное правило при получении ответа от сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //запрос к серверу на получение данных профиля и аватарки
  getInitialUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на получение загруженных на сервер фотокарточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на обновление данных профиля
  patchProfileData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.occupation
      })
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на обновление аватарки
  patchAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на добавление карточки
  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.picture
      })
    }).then((res) => this._getResponseData(res));
  }

  //запрос к серверу на удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  //смена статуса лайка после взаимодействия
  changeLike(cardId, condition) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: condition ? 'DELETE' : 'PUT',
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }
}
