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

const popupPictureForm = page.querySelector('.popup__picture-form');
const popupPictureImage = popupPictureForm.querySelector('.popup__picture-element');
const popupPictureCaption = popupPictureForm.querySelector('.popup__picture-caption');

const popupToggles = page.querySelectorAll('.popup__toggle');

const profileInfo = content.querySelector('.profile__info');
const profileUsername = profileInfo.querySelector('.profile__username');
const profileOccupation = profileInfo.querySelector('.profile__occupation');
const profileEditButton = content.querySelector('.profile__edit-button');
const addPictureButton = content.querySelector('.profile__add-button');

const pictureTemplate = page.querySelector('#photo-card-template').content;


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

//функция добавления блока в DOM для новой фотографии и подключения к ней необходимых event
function createPicture(pictureTitle, pictureLink) {
  const pictureElement = pictureTemplate.querySelector('.photo-grid__photo-card').cloneNode(true);
  //подключаем фотографию по ссылке и название фотографии из формы
  pictureElement.querySelector('.photo-grid__photo').setAttribute('src', pictureLink);
  pictureElement.querySelector('.photo-grid__photo').setAttribute('alt', pictureTitle);
  pictureElement.querySelector('.photo-grid__caption-text').textContent = pictureTitle;
  //настройка работы кнопки лайка фотографии
  pictureElement.querySelector('.photo-grid__like-button').addEventListener('click', (evt) => evt.target.classList.toggle('photo-grid__like-button_active'));
  //настройка работы корзины для удаления фотографии
  pictureElement.querySelector('.photo-grid__delete-button').addEventListener('click', (evt) => evt.target.closest('.photo-grid__photo-card').remove());
  //добавляем event по клику на фотокарточку, открывающий модальное окно с фотографией
  pictureElement.querySelector('.photo-grid__photo').addEventListener('click', function(evt) {
    popupPictureImage.setAttribute('src', evt.target.getAttribute('src'));
    popupPictureImage.setAttribute('alt', evt.target.getAttribute('alt'));
    popupPictureCaption.textContent = evt.target.getAttribute('alt');
    openPopup(popupPictureForm);
  });
  //возвращаем готовую карточку
  return pictureElement;
}

// функция по добавлению карточки в начало Грида
function addPictureToTop(pictureTitle, pictureLink) {
  //вызываем функцию создания фотокарточки
  const pictureElement = createPicture(pictureTitle, pictureLink);
  //добавляем фото в начало грид-блока
  photoGrid.prepend(pictureElement);
}

//Добавляем изображения из массива на страничку сайта
initialCards.forEach(function(element) {
  const items = Object.keys(element);
  const name = element[items[0]];
  const link = element[items[1]];
  addPictureToTop(name, link);
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

//добавляем event закрытия модального окна для крестиков
popupToggles.forEach(function(element) {
  element.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup')));
});

//Форма отправки на сервер формы по изменению персональных данных пользователя
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  const newName = usernameInput.value;
  const newOccupation = userOccupationInput.value;
  profileUsername.textContent = newName;
  profileOccupation.textContent = newOccupation;
  closePopup(popupUserDataForm);
}

//event по клику на кнопку сохранения формы, вызывающий соответствующую функцию
popupUserDataForm.addEventListener('submit', handleProfileFormSubmit);

//Форма отправки на сервер добавленной фотографии
function handlePictureAddingFormSubmit (evt) {
  evt.preventDefault();
  addPictureToTop(pictureTitle.value, pictureLink.value);
  closePopup(popupUserAddPictureForm);
  evt.target.reset();
}

//event по клику на кнопку добавления фотографии, вызывающий соответствующую функцию
popupUserAddPictureForm.addEventListener('submit', handlePictureAddingFormSubmit);