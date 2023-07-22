//базовый файл с кодом. Здесь вызовы функций и установка слушателей событий

//экспортируем необходимые функции
export {
  page,
  content,
  pictureTitle,
  pictureLink,
  pictureTemplate,
  popupPictureForm,
  popupPictureImage,
  popupPictureCaption,
  photoGrid,
  popups,
  popupUserDataForm,
  usernameInput,
  userOccupationInput,
  profileInfo,
  profileUsername,
  profileOccupation,
  popupUserAddPictureForm
};

//импортируем необходимые функции и переменные
import '../pages/index.css';
import { enableValidation, reloadValidation } from './validate.js';
import { addPictureToTop } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { handleProfileFormSubmit, handlePictureAddingFormSubmit, fillInputField } from './utils.js';

// подгружаем необходимые элементы из DOM
const page = document.querySelector('.page');
const content = page.querySelector('.content');

const pictureTitle = page.querySelector('.popup__item_input_picture-title');
const pictureLink = page.querySelector('.popup__item_input_picture-link');
const pictureTemplate = page.querySelector('#photo-card-template').content;
const popupPictureForm = page.querySelector('.popup__picture-form');
const popupPictureImage = popupPictureForm.querySelector('.popup__picture-element');
const popupPictureCaption = popupPictureForm.querySelector('.popup__picture-caption');
const photoGrid = content.querySelector('.photo-grid');

const popups = page.querySelectorAll('.popup');

const popupUserDataForm = page.querySelector('.popup__user-data-form');
const usernameInput = popupUserDataForm.querySelector('.popup__item_input_username');
const userOccupationInput = popupUserDataForm.querySelector('.popup__item_input_occupation');
const profileInfo = content.querySelector('.profile__info');
const profileUsername = profileInfo.querySelector('.profile__username');
const profileOccupation = profileInfo.querySelector('.profile__occupation');
const popupUserAddPictureForm = page.querySelector('.popup__add-picture-form');

const popupToggles = page.querySelectorAll('.popup__toggle');
const profileEditButton = content.querySelector('.profile__edit-button');
const addPictureButton = content.querySelector('.profile__add-button');

// Массив с изображениями
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Добавляем изображения из массива на страничку сайта
initialCards.forEach(function(element) {
  const items = Object.keys(element);
  const name = element[items[0]];
  const link = element[items[1]];
  addPictureToTop(name, link);
});

//добавляем event открытия модального окна к кнопке редактирования данных пользователя и сброс проверки валидации
profileEditButton.addEventListener('click', function() {
  openPopup(popupUserDataForm);
  fillInputField(usernameInput, userOccupationInput, profileUsername, profileOccupation);
  reloadValidation(popupUserDataForm, {
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
  });
});

//добавляем event открытия модального окна к кнопке добавления новой фотографии и сброс проверки валидации
addPictureButton.addEventListener('click', function() {
  pictureTitle.value = "";
  pictureLink.value = "";
  openPopup(popupUserAddPictureForm);
  reloadValidation(popupUserAddPictureForm, {
    formSelector: '.popup__form',
    fieldsetSelector: '.popup__fieldset',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__input-error_active'
  });
});

//добавляем event закрытия модального окна по кнопке крестик
popupToggles.forEach(function(element) {
  element.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')));
});

//добавляем event по клику на кнопку сохранения формы, вызывающий соответствующую функцию
popupUserDataForm.addEventListener('submit', handleProfileFormSubmit);

//добавляем event по клику на кнопку добавления фотографии, вызывающий соответствующую функцию
popupUserAddPictureForm.addEventListener('submit', handlePictureAddingFormSubmit);

//вызываем функцию валидации
enableValidation({
  formSelector: '.popup__form',
  fieldsetSelector: '.popup__fieldset',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
});