//файл с перечнем констатнт

//сохраняем в константу адрес и заголовок запроса для Api
export const apiOptions = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-27",
  headers: {
    authorization: "ba4ab074-000e-4a51-b901-da38460be3f2",
    "Content-Type": "application/json",
  },
};

const page = document.querySelector('.page');
export const content = page.querySelector('.content');

//константы с формами
export const userDataForm = page.querySelector('.popup__user-data-form');
export const addPictureForm = page.querySelector('.popup__add-picture-form');
export const userAvatarForm = page.querySelector('.popup__user-avatar-form');
export const deletePictureForm = page.querySelector('.popup__delete-picture-form');

//константы с инпутами
export const usernameInput = userDataForm.querySelector('.popup__item_input_username');
export const userOccupationInput = userDataForm.querySelector('.popup__item_input_occupation');

//константы с кнопками
export const profileEditButton = content.querySelector('.profile__edit-button');
export const addPictureButton = content.querySelector('.profile__add-button');
export const avatarEditButton = content.querySelector('.profile__avatar');

//константы с попапами
export const popupPicture = page.querySelector('.popup__picture-form');
export const popupAddCard = page.querySelector('.popup__add-picture');
export const popupEditUserdata = page.querySelector('.popup__user-data');
export const popupEditAvatar = page.querySelector('.popup__user-avatar');
export const popupDeleteCard = page.querySelector('.popup__delete-picture');

//константы элементов попапа с картинкой
export const popupPictureImage = popupPicture.querySelector('.popup__picture-element');
export const popupPictureCaption = popupPicture.querySelector('.popup__picture-caption');

//селектор темплейта попапа с картинкой
export const cardTemplateSelector = '#photo-card-template';

//селекторы элементов формы
export const formSelectors = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__input-error_active'
};

//селектор контейнера для карточек
export const photoGridSelector = '.photo-grid';

//селекторы с полями данных пользователя
export const userDataSelectors = {
  userNameSelector: '.profile__username',
  userOccupationSelector: '.profile__occupation',
  userAvatarSelector: '.profile__avatar'
};

//хранилище для ID пользователя и данных карточки для удаления
export const storage = {
  userID: '',
  cardToDelete: {}
};