//блок функций по созданию карточек с фотографиями

//импортируем необходимые функции и переменные
import { openPopup } from "./modal.js";
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
export { createPicture, addPictureToTop, content, pictureTitle, pictureLink };

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