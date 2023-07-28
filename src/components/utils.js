//блок утилитарных функций

//импортируем необходимые функции и переменные
import { patchProfileData, patchAvatar, postNewCard } from './api.js';
import { closePopup } from './modal.js';
import {
  popupUserDataForm,
  popupUserAvatarForm,
  usernameInput,
  userOccupationInput,
  profileUsername,
  profileOccupation,
  popupUserAddPictureForm,
  avatarEditButton
} from './index.js';

//экспортируем необходимые функции и переменные
export { 
  handleProfileFormSubmit,
  handlePictureAddingFormSubmit,
  handleAvatarFormSubmit,
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

//Форма отправки на сервер формы по изменению персональных данных пользователя
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  const newName = usernameInput.value;
  const newOccupation = userOccupationInput.value;
  profileUsername.textContent = newName;
  profileOccupation.textContent = newOccupation;
  fillInputField(usernameInput, userOccupationInput, profileUsername, profileOccupation);
  patchProfileData();
  closePopup(popupUserDataForm);
}

//Форма отправки на сервер добавленной фотографии
function handlePictureAddingFormSubmit (evt) {
  evt.preventDefault();
  postNewCard();
  closePopup(popupUserAddPictureForm);
  evt.target.reset();
}

//Форма отправки на сервер ссылки на картинку с новым аватаром
function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  patchAvatar();
  closePopup(popupUserAvatarForm);
}

//Функция по замене текста кнопки, пока идёт процесс сохранения данных на сервере
function renderLoading(isLoading) {
  if(isLoading) {
    document.querySelector('.popup__submit-button-user-data').textContent = 'Сохранение...';
  } else {
    document.querySelector('.popup__submit-button-user-data').textContent = 'Сохранить';
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