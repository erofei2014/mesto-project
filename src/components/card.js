//блок функций по созданию карточек с фотографиями

//импортируем необходимые функции и переменные
import { openPopup } from "./modal.js";
import { deleteCard, addLike, removeLike } from "./api.js";
import {
  content,
  pictureTitle,
  pictureLink,
  pictureTemplate,
  popupPictureForm,
  popupPictureImage,
  popupPictureCaption,
  photoGrid
} from './index.js';

//экспортируем необходимые функции и переменные
export {
  addPictureToTop,
  addPictureToBottom,
  addDeleteButton,
  showLikes,
  content,
  pictureTitle,
  pictureLink
};

//функция добавления блока в DOM для новой фотографии и подключения к ней необходимых event и fetch
function createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
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
  addDeleteButton(cardId, personalId, pictureElement, pictureId);
  showLikes(usersList, pictureElement);
  checkMyLike(usersList, personalId, pictureElement);
  pictureElement.querySelector('.photo-grid__like-button').addEventListener('click', function(evt) {
    if (evt.target.classList.contains('photo-grid__like-button_active')) {
      addLike(pictureId, pictureElement);
    } else {
      removeLike(pictureId, pictureElement);
    }
  });
  //возвращаем готовую карточку
  return pictureElement;
}


// функция по добавлению карточки в начало Грида (для добавления карточки через форму, чтобы новая карточка была сверху)
function addPictureToTop(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
  //вызываем функцию создания фотокарточки
  const pictureElement = createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList);
  //добавляем фото в начало грид-блока
  photoGrid.prepend(pictureElement);
}

// функция по добавлению карточки в конец Грида (для предзагрузки карточек с сервера, чтобы свежие были вверху)
function addPictureToBottom(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList) {
  //вызываем функцию создания фотокарточки
  const pictureElement = createPicture(pictureTitle, pictureLink, cardId, personalId, pictureId, usersList);
  //добавляем фото в конец грид-блока
  photoGrid.append(pictureElement);
}

//функция добавления кнопки удаления на свою карточку
function addDeleteButton(cardId, personalId, pictureElement, pictureId) {
  if(cardId === personalId) {
    pictureElement.querySelector('.photo-grid__delete-button').classList.add('photo-grid__delete-button_active');
    pictureElement.querySelector('.photo-grid__delete-button').addEventListener('click', (evt) => {
      deleteCard(pictureId);
    })
  }
}

//функция отображения на карточке количества лайков
function showLikes(usersList, pictureElement) {
  const likesNumber = usersList.length;
  pictureElement.querySelector('.photo-grid__likes-count').textContent = likesNumber;
}

//функция проверки, есть ли собственный лайк на карточке
function checkMyLike(usersList, personalId, pictureElement) {
  const usersArray = Array.from(usersList);
  const hasMyLike = usersArray.some((user) => {
    return user._id === personalId;
  });
  if (hasMyLike) {
    pictureElement.querySelector('.photo-grid__like-button').classList.add('photo-grid__like-button_active');
  } else {
    pictureElement.querySelector('.photo-grid__like-button').classList.remove('photo-grid__like-button_active');
  }
}