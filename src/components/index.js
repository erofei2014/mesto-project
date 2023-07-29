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
  userAvatarLinkInput,
  profileInfo,
  profileUsername,
  profileOccupation,
  popupUserAddPictureForm,
  popupUserAvatarForm,
  avatarEditButton
};

//импортируем необходимые функции и переменные
import '../pages/index.css';
import { enableValidation, reloadValidation } from './validate.js';
import { openPopup, closePopup, checkIfClickOnOverlay } from './modal.js';
import { fillInputField, updateUserData, updateUserAvatar, renderLoading } from './utils.js';
import { getInitialUserData, getInitialCards, patchProfileData, patchAvatar, postNewCard } from './api.js';
import { addPictureToBottom, addPictureToTop } from './card.js';

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

const popupUserDataForm = page.querySelector('.popup__user-data');
const popupUserAddPictureForm = page.querySelector('.popup__add-picture');
const popupUserAvatarForm = page.querySelector('.popup__user-avatar');
const usernameInput = popupUserDataForm.querySelector('.popup__item_input_username');
const userOccupationInput = popupUserDataForm.querySelector('.popup__item_input_occupation');
const userAvatarLinkInput = popupUserAvatarForm.querySelector('.popup__item_input_avatar-link');
const profileInfo = content.querySelector('.profile__info');
const profileUsername = profileInfo.querySelector('.profile__username');
const profileOccupation = profileInfo.querySelector('.profile__occupation');

const popupToggles = page.querySelectorAll('.popup__toggle');
const profileEditButton = content.querySelector('.profile__edit-button');
const addPictureButton = content.querySelector('.profile__add-button');
const avatarEditButton = content.querySelector('.profile__avatar');

const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
};

let myId;

//добавляем event открытия модального окна к кнопке редактирования данных пользователя и сброс проверки валидации
profileEditButton.addEventListener('click', function() {
  openPopup(popupUserDataForm);
  fillInputField(usernameInput, userOccupationInput, profileUsername, profileOccupation);
  reloadValidation(popupUserDataForm, formSelectors);
});

//добавляем event открытия модального окна к кнопке добавления новой фотографии и сброс проверки валидации
addPictureButton.addEventListener('click', function() {
  pictureTitle.value = "";
  pictureLink.value = "";
  openPopup(popupUserAddPictureForm);
  reloadValidation(popupUserAddPictureForm, formSelectors);
});

//добавляем event открытия модального окна к кнопке изменения аватара и сброс проверки валидации
avatarEditButton.addEventListener('click', function() {
  userAvatarLinkInput.value = "";
  openPopup(popupUserAvatarForm);
  reloadValidation(popupUserAvatarForm, formSelectors);
})

//добавляем event закрытия модального окна по кнопке крестик
popupToggles.forEach(function(element) {
  element.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')));
});

//добавляем слушатель клика на оверлей на все попапы
popups.forEach((popup) => {
  popup.addEventListener('mousedown', checkIfClickOnOverlay);
})

//добавляем event по клику на кнопку сохранения формы изменения данных пользователя, вызывающий соответствующую функцию
popupUserDataForm.addEventListener('submit', handleProfileFormSubmit);

//добавляем event по клику на кнопку добавления фотографии, вызывающий соответствующую функцию
popupUserAddPictureForm.addEventListener('submit', handlePictureAddingFormSubmit);

//добавляем event по клику на кнопку сохранения формы изменения аватара пользователя, вызывающий соответствующую функцию
popupUserAvatarForm.addEventListener('submit', handleAvatarFormSubmit);


//Форма отправки на сервер формы по изменению персональных данных пользователя
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(true, popupUserDataForm);
  patchProfileData(usernameInput, userOccupationInput)
    .then((userData) => {
      profileUsername.textContent = userData.name;
      profileOccupation.textContent = userData.about;
      fillInputField(usernameInput, userOccupationInput, profileUsername, profileOccupation);
      closePopup(popupUserDataForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupUserDataForm);
    });
}

//Форма отправки на сервер добавленной фотографии
function handlePictureAddingFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(true, popupUserAddPictureForm);
  postNewCard(pictureTitle, pictureLink)
    .then((newCard) => {
      addPictureToTop(newCard.name, newCard.link, newCard.owner._id, myId, newCard._id, newCard.likes);
      closePopup(popupUserAddPictureForm);
      evt.target.reset();
    })
    .catch(() => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupUserAddPictureForm);
    });
}

//Форма отправки на сервер ссылки на картинку с новым аватаром
function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(true, popupUserAvatarForm);
  patchAvatar(userAvatarLinkInput)
    .then((userData) => {
      updateUserAvatar(userData.avatar);
      closePopup(popupUserAvatarForm);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupUserAvatarForm);
    });
}

//вызываем функцию валидации
enableValidation(formSelectors);

//загружаем данные пользователя, аватар и карточки из fetch-запроса к серверу
Promise.all([
  getInitialUserData(),
  getInitialCards()
])
  .then(([userData, initialCards]) => {
    updateUserData(userData.name, userData.about);
    updateUserAvatar(userData.avatar);
    myId = userData._id;
    initialCards.forEach(element => {
      addPictureToBottom(element.name, element.link, element.owner._id, myId, element._id, element.likes);
    });
  })
  .catch((err) => {
    console.log(err);
  })