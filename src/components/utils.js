//блок утилитарных функций

//импортируем необходимые функции и переменные
import { addPictureToTop } from './card.js';
import { closePopup } from './modal.js';
import {
  popupUserDataForm,
  usernameInput,
  userOccupationInput,
  profileUsername,
  profileOccupation,
  popupUserAddPictureForm,
  pictureTitle,
  pictureLink
} from './index.js';

//экспортируем необходимые функции и переменные
export { 
  handleProfileFormSubmit,
  handlePictureAddingFormSubmit,
  fillInputField
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
  closePopup(popupUserDataForm);
}

//Форма отправки на сервер добавленной фотографии
function handlePictureAddingFormSubmit (evt) {
  evt.preventDefault();
  addPictureToTop(pictureTitle.value, pictureLink.value);
  closePopup(popupUserAddPictureForm);
  evt.target.reset();
}