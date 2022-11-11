// подгружаем необходимые элементы из DOM
const page = document.querySelector('.page');
const content = page.querySelector('.content');

const popupUserDataForm = page.querySelector('.popup__user-data-form');
const usernameInput = popupUserDataForm.querySelector('.popup__item_input_username');
const userOccupationInput = popupUserDataForm.querySelector('.popup__item_input_occupation');
const submitUserDataButton = popupUserDataForm.querySelector('.popup__submit-button-user-data');

const popupUserAddPictureForm = page.querySelector('.popup__add-picture-form');
const pictureTitle = popupUserAddPictureForm.querySelector('.popup__item_input_picture-title');
const pictureLink = popupUserAddPictureForm.querySelector('.popup__item_input_picture-link');
const savePictureButton = popupUserAddPictureForm.querySelector('.popup__submit-button-add-picture');

const popupToggles = page.querySelectorAll('.popup__toggle');

const profileInfo = content.querySelector('.profile__info');
const profileEditButton = content.querySelector('.profile__edit-button');
const addPictureButton = content.querySelector('.profile__add-button');

const likeButtons = content.querySelectorAll('.photo-grid__like-button');
const photoGrid = content.querySelector('.photo-grid');
const deleteButtons = content.querySelectorAll('.photo-grid__delete-button');

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
  let items = Object.keys(element);
  let name = element[items[0]];
  let link = element[items[1]];
  addPicture(name, link);
});

//Функция открытия модального окна
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//добавляем event открытия модального окна к кнопке редактирования данных пользователя
profileEditButton.addEventListener('click', function() {
  openPopup(popupUserDataForm);
});

//добавляем event открытия модального окна к кнопке добавления новой фотографии
addPictureButton.addEventListener('click', function() {
  openPopup(popupUserAddPictureForm);
});

//Прописываем event по клику на крестик - закрытие модального окна
popupToggles.forEach(function(element) {
  element.addEventListener('click', (evt) => evt.target.closest('.popup').classList.remove('popup_opened'));
});

//Форма отправки на сервер формы по изменению персональных данных пользователя
function formSubmitHandler (evt) {
  evt.preventDefault();
  let newName = usernameInput.value;
  let newOccupation = userOccupationInput.value;
  profileInfo.querySelector('.profile__username').textContent = newName;
  profileInfo.querySelector('.profile__occupation').textContent = newOccupation;
  closePopup(popupUserDataForm);
}

//event по клику на кнопку сохранения формы, вызывающий соответствующую функцию
popupUserDataForm.addEventListener('submit', formSubmitHandler);

//Форма отправки на сервер добавленной фотографии
function formAddPictureHandler (evt) {
  evt.preventDefault();
  addPicture(pictureTitle.value, pictureLink.value);
  closePopup(popupUserAddPictureForm);
  pictureTitle.value = "";
  pictureLink.value = "";
}

//event по клику на кнопку добавления фотографии, вызывающий соответствующую функцию
popupUserAddPictureForm.addEventListener('submit', formAddPictureHandler);

//функция добавления блока в DOM для новой фотографии и модального окна с большой фотографией
function addPicture(pictureTitle, pictureLink) {
  const pictureTemplate = page.querySelector('#photo-card-template').content;
  const pictureElement = pictureTemplate.querySelector('.photo-grid__photo-card').cloneNode(true);

  //подключаем фотографию по ссылке и название фотографии из формы
  pictureElement.querySelector('.photo-grid__photo').setAttribute('src', pictureLink);
  pictureElement.querySelector('.photo-grid__photo').setAttribute('alt', pictureTitle);
  pictureElement.querySelector('.photo-grid__caption-text').textContent = pictureTitle;
  //настройка функции открытия модального окна с большой фотографией по клику на фото
  pictureElement.querySelector('.photo-grid__photo').addEventListener('click', (evt) => evt.target.previousElementSibling.classList.add('photo-grid__popup_opened'));
  //настройка закрытия модального окна по клику на крестик
  pictureElement.querySelector('.photo-grid__popup-toggle').addEventListener('click', (evt) => evt.target.closest('.photo-grid__popup').classList.remove('photo-grid__popup_opened'));
  //подключаем фотографию по ссылке и название фотографии из формы
  pictureElement.querySelector('.photo-grid__big-photo').setAttribute('src', pictureLink);
  pictureElement.querySelector('.photo-grid__big-photo').setAttribute('alt', pictureTitle);
  pictureElement.querySelector('.photo-grid__big-photo-caption').textContent = pictureTitle;
  //настройка работы кнопки лайка фотографии
  pictureElement.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => evt.target.classList.toggle('photo-grid__like-button_active'));
  //настройка работы корзины для удаления фотографии
  pictureElement.querySelector('.photo-grid__delete-button').addEventListener('click', (evt) => evt.target.closest('.photo-grid__photo-card').remove());
  //добавляем фото в начало грид-блока
  photoGrid.prepend(pictureElement);
}



