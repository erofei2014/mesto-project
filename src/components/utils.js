//блок утилитарных функций

//импортируем необходимые функции и переменные
import {
  profileUsername,
  profileOccupation,
  avatarEditButton
} from './index.js';

//экспортируем необходимые функции и переменные
export { 
  fillInputField,
  renderLoading,
  updateUserData,
  updateUserAvatar
};

//добавляем в инпуты значения данных пользователя
function fillInputField(usernameInput, userOccupationInput, profileUsername, profileOccupation) {
  usernameInput.value = profileUsername.textContent;
  userOccupationInput.value = profileOccupation.textContent;
}

//Функция по замене текста кнопки, пока идёт процесс сохранения данных на сервере
function renderLoading(isLoading, formElement) {
  const submitButton = formElement.querySelector('.popup__submit-button');
  if(isLoading) {
    submitButton.textContent = 'Сохранение...';
  } else {
    submitButton.textContent = 'Сохранить';
  }
}

//функция обновить данные пользователя
function updateUserData(name, about) {
  profileUsername.textContent = name;
  profileOccupation.textContent = about;
}

//функция обновить аватар
function updateUserAvatar(avatar) {
  avatarEditButton.style.background = `center / cover no-repeat url('${avatar}')`; 
}